import React, { useState, useEffect } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import InfoBox from "./components/InfoBox/InfoBox";
import Map from "./components/Map/Map";
import LineGraph from "./components/LineGraph";
import Table from "./components/Table/Table";
import "./App.css";
import { sortTable } from "./util";
import "leaflet/dist/leaflet.css";
import { prettyPrintStat, prettyPrintTotalStat } from "./util";
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34, lng: 9 });
  const [mapZoom, setMapZoom] = useState(3);
  const [casesType, setCasesType] = useState("cases");

  //Fetch all Countries
  useEffect(() => {
    //async => send a req, wait for it, do something with info
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data;
          const sortedData = sortTable(countries);
          const tableData = sortedData;
          setTableData(sortedData);
          const mapCountries = countries;
          setMapCountries(countries);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  //Fetch Worldwide cases,deathes and recovers
  const getWorldCases = async () => {
    await fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  };
  useEffect(() => {
    getWorldCases();
  }, []);

  //Selecting a different country from drop down
  const onCountryChange = (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
    //All of the data from the country response
    const country = countries.find(
      (country) => country.countryInfo.iso2 === countryCode
    );
    if (country === undefined) {
      const info = getWorldCases();
      setCountryInfo(info);
      setMapCenter({
        lat: 34,
        lng: 9,
      });
      setMapZoom(3);
    } else {
      setCountryInfo(country);
      setMapCenter({
        lat: country.countryInfo.lat,
        lng: country.countryInfo.long,
      });
      setMapZoom(6);
    }
  };

  return (
    <>
      <div className="app">
        <div className="app__left">
          <div className="app__header">
            <h1>Covid-19 Tracker</h1>
            <FormControl className="app__dropdown">
              <Select
                variant="outlined"
                value={country}
                onChange={onCountryChange}
                className="app__dropdown--select"
              >
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map((country) => (
                  <MenuItem value={country.countryInfo.iso2}>
                    {country.country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="app__stats">
            <InfoBox
              isRed
              active={casesType === "cases"}
              onClick={(e) => setCasesType("cases")}
              title="Coronavirus cases"
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={prettyPrintTotalStat(countryInfo.cases)}
            />
            <InfoBox
              isRed
              active={casesType === "deaths"}
              onClick={(e) => setCasesType("deaths")}
              title="Deaths"
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={prettyPrintTotalStat(countryInfo.deaths)}
            />
            <InfoBox
              isGreen
              active={casesType === "recovered"}
              onClick={(e) => setCasesType("recovered")}
              title="Recovered"
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={prettyPrintTotalStat(countryInfo.recovered)}
            />
          </div>
          <Map
            countries={mapCountries}
            center={mapCenter}
            zoom={mapZoom}
            casesType={casesType}
          />
        </div>
        <Card className="app__right">
          <CardContent>
            <h3 className="app__rightTableTitle">Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3 className="app__rightGraphTitle">Worldwide New {casesType}</h3>
            <LineGraph casesType={casesType} className="app__graph" />
          </CardContent>
        </Card>
      </div>
      <h5 className="app__footer">
        © 2020 Hamdi Nait Limam All Rights Reserved
      </h5>
    </>
  );
}

export default App;
