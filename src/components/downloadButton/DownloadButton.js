import React, { Component } from "react";
import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { jsonToCSV } from "react-papaparse";
import { CSVLink, CSVDownload } from "react-csv";
import style from "./Download.module.css";

export default class DownloadButton extends Component {
  render() {
    const fields = [
      "projectname",
      "description",
      "organization",
      "theme",
      "sector",
      "sdg",
      "website",
      "activitytype",
    ];
    const csvData = jsonToCSV({ fields: fields, data: this.props.projects });
    return (
      <div>
        <OverlayTrigger
          overlay={<Tooltip>Download a CSV file of your search</Tooltip>}
        >
          <Button color="info" className={style.button}>
            <CSVLink
              style={{ color: "white" }}
              data={csvData}
              filename={"Activities_Index_Data.csv"}
            >
              Download Data <i class="fas fa-download"></i>
            </CSVLink>
          </Button>
        </OverlayTrigger>
      </div>
    );
  }
}
