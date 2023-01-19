import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function MetaphorTable({ rows, metaphors }) {
  let data = [];
  if (metaphors === undefined) {
    data = rows;
  }
  else {
    data = metaphors.metaphors.hits.hits
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Domain</TableCell>
            <TableCell align="right">Source</TableCell>
            <TableCell align="right">Target</TableCell>
            <TableCell align="right">Interpretation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{row.hasOwnProperty("_source") ? row._source.domain : row.domain}</TableCell>
              <TableCell align="right">{row.hasOwnProperty("_source") ? row._source.source : row.source}</TableCell>
              <TableCell align="right">{row.hasOwnProperty("_source") ? row._source.target : row.target}</TableCell>
              <TableCell align="right">{row.hasOwnProperty("_source") ? row._source.interpretation : row.interpretation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
