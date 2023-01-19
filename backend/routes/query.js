// Multi match query and filter the result to remove the unwanted results obtained from query.
// eg: Search for metaphors in a particular domain and in the result the result since we are
// retrieving songs and there metaphors remove unwanted domains from a song
const getMultiMatchWithNestedFilter = (query, b_fields, filter_arr) => {
  return {
    bool: {
      must: {
        multi_match: {
          query: query,
          fields: b_fields,
        },
      },
      filter: {
        nested: {
          path: "metaphors",
          query: {
            bool: {
              should: filter_arr,
            },
          },
          inner_hits: {
            highlight: {
              fields: [{ "metaphors.domain": {} }, { "metaphors.target": {} }],
            },
          },
        },
      },
    },
  };
};

// Similar filtering for above but here search query is only done for a metaphor domain
const getNestedMetaphorQuery = (filter_arr) => {
  return {
    nested: {
      path: "metaphors",
      query: {
        bool: {
          should: filter_arr,
        },
      },
      inner_hits: {
        highlight: {
          fields: [{ "metaphors.domain": {} }, { "metaphors.target": {} }],
        },
      },
    },
  };
};

// search query without metaphor domain with singer, lyricist, composer names
const getBasicMultiMatch = (query, b_fields ) => {
    return {
        multi_match: {
            query: query,
            fields: b_fields,
            operator: "or",
            type: 'best_fields'
        }
    }
}

module.exports = { getBasicMultiMatch, getMultiMatchWithNestedFilter, getNestedMetaphorQuery }
