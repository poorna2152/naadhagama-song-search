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
