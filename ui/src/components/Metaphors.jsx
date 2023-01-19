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

export default function MetaphorTable({ rows }) {
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
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{row.domain}</TableCell>
              <TableCell align="right">{row.source}</TableCell>
              <TableCell align="right">{row.target}</TableCell>
              <TableCell align="right">{row.interpretation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
