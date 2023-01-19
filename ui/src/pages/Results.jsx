import React from "react";
import { useState, useEffect } from "react";
import Input from "../components/Input";
import { useLocation } from "react-router-dom";
import { postRequest } from "../api/post";
import Box from "@mui/material/Box";
import ResultTable from "components/ResultTable";

const Results = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const query = location.state.query;
  useEffect(() => {
    async function fetchData() {
      const response = await postRequest("/search/", { query: query });
      setResults(response.data.hits);
    }
    fetchData();
  }, [query]);

  return (
    <div>
      <Input />
      <Box sx={{ p: 4 }}>
        <p>
          <b>Search results for</b>{" "}
          {query.slice(0, 1).toUpperCase() + query.slice(1)}
        </p>
      </Box>
      {results && <ResultTable rows={results}/>}
    </div>
  );
};

export default Results;
