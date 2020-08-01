import React from "react";
import numeral from "numeral";

import "./Table.css";
function Table({ countries }) {
  return (
    <div className="table">
      {countries.map(({ country, cases, countryInfo }) => (
        <tr>
          <td
            className="table-flag"
            style={{ backgroundImage: `url(${countryInfo.flag})` }}
          />
          <td>{country}</td>
          <td style={{ marginLeft: "auto" }}>
            <strong>{numeral(cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
