const express = require('express');
const router = express.Router();
const config = require('../config/config');
const { Client } = require('@elastic/elasticsearch');

const client = new Client({ node:  config.ELASTICS_SEARCH_CLIENT });

var keywords = require("../../dataset/keywords.json");
var named_entities = require("../../dataset/named_entities.json");

router.post('/', async function (req, res) {
    var query = req.body.query;
    var tokens = query.length > 0 ? query.trim().split(" ") : "";
    var size = 100;
    let stems = ['ගේ', 'යන්ගේ']
    let tokens_to_remove = []
    let fields = ["singers", "lyricists", "composers", "metaphors"]
    let boosted_fields = [1, 1, 1, 1]
    let n_named_entity_fields = 3
    let n_named_keyword_fields = 4
    let domains = []
    tokens.forEach(token => {
        stems.forEach(stem => {
            token = token.replace(stem, '')
        })
        for (let index = 0; index < n_named_entity_fields; index++) {
            if (named_entities[fields[index]].includes(token)) {
                boosted_fields[index] += 1;
            }
        }

        for (let index = 0; index < n_named_keyword_fields; index++) {
            if (keywords[fields[index]].includes(token)) {
                boosted_fields[index] += 1;
                tokens_to_remove.push(token);
            }
        }

        if (named_entities.domains.includes(token)) {
            domains.push(token)
        }

        if (keywords.songs.includes(token) || keywords.connecting_words.includes(token)) {
            tokens_to_remove.push(token);
        }
    });

    tokens_to_remove.forEach(token => {
        query = query.replace(token, '');
    });
    let domains_removed = query;
    domains.forEach(token => {
        domains_removed = domains_removed.replace(token, '');
    });
    query = query.trim()
    domains_removed = domains_removed.trim()
    console.log(query)
    console.log(domains_removed.length)
    let result;
    if (domains.length && domains_removed.length) {
        console.log("here")
        let filter_arr = []
        domains.forEach(domain => filter_arr.push({ term: { "metaphors.domain": domain }}))
        result = await client.search({
            index: 'test-lyrics',
            body: {
                size: size,
                _source: {
                    includes: ["singer", "title", "lyricist", "composer", "lyrics", "metaphors"]
                },
                query: {
                    bool: {
                      must: {
                        multi_match: {
                          query: domains_removed,
                          fields: [`title^1`, `singer^${boosted_fields[0]}`, `lyricist^${boosted_fields[1]}`, `composer^${boosted_fields[2]}`, `metaphors.target^${boosted_fields[3]}`, `metaphors.domain^${boosted_fields[3]}`, `metaphors.domain^${boosted_fields[3]}`],
                        }
                      },
                      filter: filter_arr
                    }
                }
            }
        })
    }
    else {
        console.log("else")
        result = await client.search({
            index: 'test-lyrics',
            body: {
                size: size,
                _source: {
                    includes: ["singer", "title", "lyricist", "composer", "lyrics", "metaphors"]
                },
                query: {
                    multi_match: {
                        query: query,
                        fields: [`title^1`, `singer^${boosted_fields[0]}`, `lyricist^${boosted_fields[1]}`, `composer^${boosted_fields[2]}`, `metaphors.target^${boosted_fields[3]}`, `metaphors.domain^${boosted_fields[3]}`],
                        operator: "or",
                        type: 'best_fields'
                    }
                }
            }
        });
    }
    res.send({
        hits: result.hits
    });
});

module.exports = router;