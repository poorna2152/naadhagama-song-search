import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import MetaphorTable from "./Metaphors";

export default function MetaphorCard({ state, metaphors }) {
  return (
    <div>
      <Accordion>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Card sx={{ width: 1 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                ගායක: {state.singer.join(", ")}
              </Typography>
              <Typography variant="h5" component="div" sx={{ my: 0.5 }}>
                {state.title}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 10 }}>
                රචක: {state.lyricist.join(", ")}
              </Typography>
              <MetaphorTable rows={state.metaphors} metaphors={metaphors} />
            </CardContent>
          </Card>
        </AccordionSummary>
        <AccordionDetails sx={{ m: 2 }}>
          <Typography>{state.lyrics}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
