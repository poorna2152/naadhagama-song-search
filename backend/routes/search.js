const express = require("express");
const router = express.Router();
const config = require("../config/config");
const { Client } = require("@elastic/elasticsearch");
const {
  getBasicMultiMatch,
  getMultiMatchWithNestedFilter,
  getNestedMetaphorQuery,
  updatedMultiMatch,
} = require("./query");

const client = new Client({ node: config.ELASTICS_SEARCH_CLIENT });

var keywords = require("../../dataset/keywords.json");
var named_entities = require("../../dataset/named_entities.json");

router.post("/", async function (req, res) {
  var query = req.body.query;
  var tokens = query.length > 0 ? query.trim().split(" ") : "";
  var size = 100;
  let stems = ["ගේ", "යන්ගේ", "යෙන්"];
  let tokens_to_remove = [];
  let fields = ["singers", "lyricists", "composers", "metaphors"];
  let boosted_fields = [1, 1, 1, 3];
  let n_named_entity_fields = 3;
  let n_named_keyword_fields = 4;
  let domains = [];
  let metaphor_part = [];
  let found = false;
  // Tokenizing and Boosting
  tokens.forEach((token) => {
    stems.forEach((stem) => {
      token = token.replace(stem, "");
    });
    for (let index = 0; index < n_named_entity_fields; index++) {
      if (named_entities[fields[index]].includes(token)) {
        boosted_fields[index] += 1;
        found = true;
      }
    }

    for (let index = 0; index < n_named_keyword_fields; index++) {
      if (keywords[fields[index]].includes(token)) {
        boosted_fields[index] += 1;
        tokens_to_remove.push(token);
        found = true;
      }
    }

    if (named_entities.domains.includes(token)) {
      domains.push(token);
      found = true;
    }

    if (
      keywords.songs.includes(token) ||
      keywords.connecting_words.includes(token)
    ) {
      tokens_to_remove.push(token);
      found = true;
    }
    if (!found) {
      metaphor_part.push(token);
    }
  });

  tokens_to_remove.forEach((token) => {
    query = query.replace(token, "");
  });
  let domains_removed = query;
  domains.forEach((token) => {
    domains_removed = domains_removed.replace(token, "");
  });
  query = query.trim();
  domains_removed = domains_removed.trim();
  let result;
  let formatted_b_fields = [
    `title^1`,
    `singer^${boosted_fields[0]}`,
    `lyricist^${boosted_fields[1]}`,
    `composer^${boosted_fields[2]}`,
    `metaphors.target^${boosted_fields[3]}`,
    `metaphors.domain^${boosted_fields[3]}`,
    `metaphors.interpretation^${boosted_fields[3]}`,
  ];
  if (domains.length && domains_removed.length) {
    let filter_arr = [];
    domains.forEach((domain) => {
      filter_arr.push({ match: { "metaphors.domain": domain } });
      filter_arr.push({ match: { "metaphors.target": domain } });
    });
    result = await client.search({
      index: "sinhala_song_metaphor",
      body: {
        size: size,
        _source: {
          includes: [
            "singer",
            "title",
            "lyricist",
            "composer",
            "lyrics",
            "metaphors",
          ],
        },
        query: getMultiMatchWithNestedFilter(
          query,
          formatted_b_fields,
          filter_arr
        ),
      },
    });
  } else if (domains.length && !domains_removed.length) {
    let filter_arr = [];
    domains.forEach((domain) => {
      filter_arr.push({ match: { "metaphors.domain": domain } });
      filter_arr.push({ match: { "metaphors.target": domain } });
    });
    result = await client.search({
      index: "sinhala_song_metaphor",
      body: {
        size: size,
        _source: {
          includes: [
            "singer",
            "title",
            "lyricist",
            "composer",
            "lyrics",
            "metaphors",
          ],
        },
        query: getNestedMetaphorQuery(filter_arr),
      },
    });
  } else if (!metaphor_part.length) {
    result = await client.search({
      index: "sinhala_song_metaphor",
      body: {
        size: size,
        _source: {
          includes: [
            "singer",
            "title",
            "lyricist",
            "composer",
            "lyrics",
            "metaphors",
          ],
        },
        query: getBasicMultiMatch(query, formatted_b_fields),
      },
    });
  } else {
    result = await client.search({
      index: "sinhala_song_metaphor",
      body: {
        size: size,
        _source: {
          includes: [
            "singer",
            "title",
            "lyricist",
            "composer",
            "lyrics",
            "metaphors",
          ],
        },
        query: updatedMultiMatch(query, formatted_b_fields),
      },
    });
  }
  res.send({
    hits: result.hits,
  });
});

module.exports = router;
