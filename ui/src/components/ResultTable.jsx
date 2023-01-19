import * as React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import MetaphorCard from "./Card";

export default function ResultTable({ rows }) {
  return (
    <TableContainer sx={{ m: 4 }} component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <MetaphorCard key={row.id} state={row._source} />{" "}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
