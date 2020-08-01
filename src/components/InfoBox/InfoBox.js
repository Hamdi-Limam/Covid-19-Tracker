import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

import "./InfoBox.css";

function InfoBox({ active, isRed, isGreen, title, cases, total, ...props }) {
  return (
    <Card
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      } `}
      onClick={props.onClick}
    >
      <CardContent>
        <Typography color="textSecondary" className="infoBox__title">
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${isGreen && "infoBox__cases--green"}`}>
          {cases} Today
        </h2>
        <Typography color="textSecondary" className="infoBox__total">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
