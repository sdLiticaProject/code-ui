import React, { useState, useEffect, useCallback, FunctionComponent } from "react";
import { useActions } from "../../hooks/useActions";
import {
  TIME_SERIES_LOADING_FAIL,
  TIME_SERIES_LOADING_SUCCESS,
  getTimeSeriesList,
  createTimeSeries,
  TIME_SERIES_CREATION_FAIL,
  TIME_SERIES_CREATION_SUCCESS,
} from "../../actions/timeSeries";

const TimeSeriesCollection: FunctionComponent = () => {
  const [listTimeSeries, createNewTimeSeries] = useActions([getTimeSeriesList, createTimeSeries]);
  const [timeSeriesList, setTimeSeriesList] = useState([]);
  const [newSeriesName, setNewSeriesName] = useState("");
  const [newSeriesDescription, setNewSeriesDescription] = useState("");

  const refreshTimeSeriesList = useCallback(() => {
    listTimeSeries().then((action: any) => {
      if (action?.type === TIME_SERIES_LOADING_FAIL) {
        // setSnackMessage(e.message);
        // setSnackbarOpen(true);
        console.error(`Time Series was NOT loaded: ${action.message}`);
      } else if (action?.type === TIME_SERIES_LOADING_SUCCESS) {
        // console.log("Time Series was loaded");
        setTimeSeriesList(action.data);
      }
    });
  }, [listTimeSeries]);

  const handleNewSeriesNameChange = (event: any) => {
    setNewSeriesName(event.target.value);
  };

  const handleNewSeriesDescriptionChange = (event: any) => {
    setNewSeriesDescription(event.target.value);
  };

  useEffect(() => {
    refreshTimeSeriesList();
  }, [refreshTimeSeriesList]);

  const onClickCreateNewTimeSeries = () => {
    createNewTimeSeries(newSeriesName, newSeriesDescription).then((action: any) => {
      if (action?.type === TIME_SERIES_CREATION_FAIL) {
        // setSnackMessage(e.message);
        // setSnackbarOpen(true);
        console.error(`Time Series was NOT created: ${action.message}`);
      } else if (action?.type === TIME_SERIES_CREATION_SUCCESS) {
        // console.log("Time Series was created");
        refreshTimeSeriesList();
      }
    });
  };

  const tableHeader = (
    <div style={{ width: "100%", height: "50px", display: "table-row", textAlign: "center" }}>
      <div style={{ display: "table-cell", textAlign: "center" }}>#</div>
      <div style={{ display: "table-cell", textAlign: "center" }}>Name</div>
      <div style={{ display: "table-cell", textAlign: "center" }}>Description</div>
      <div style={{ display: "table-cell", textAlign: "center" }}>Created</div>
      <div style={{ display: "table-cell", textAlign: "center" }}>Last modified</div>
      <div style={{ display: "table-cell", textAlign: "center" }}>Has content?</div>
    </div>
  );

  const timeSeriesRows = timeSeriesList.map((timeSeries: any) => {
    return (
      <div style={{ width: "100%", height: "50px", display: "table-row", textAlign: "center" }}>
        <div style={{ display: "table-cell", textAlign: "center" }}>{timeSeries.id}</div>
        <div style={{ display: "table-cell", textAlign: "center" }}>{timeSeries.name}</div>
        <div style={{ display: "table-cell", textAlign: "center" }}>{timeSeries.description}</div>
        <div style={{ display: "table-cell", textAlign: "center" }}>{timeSeries.dateCreated}</div>
        <div style={{ display: "table-cell", textAlign: "center" }}>{timeSeries.dateModified}</div>
        <div style={{ display: "table-cell", textAlign: "center" }}>Yes|No</div>
      </div>
    );
  });

  return (
    <div style={{ width: "100%", border: "1px solid magenta;", textAlign: "center" }}>
      <h3>Available Time Series Data</h3>

      <div style={{ width: "100%", display: "table" }}>
        {tableHeader}
        {timeSeriesRows}
      </div>

      <h3>Create new item</h3>
      <div style={{ width: "100%", marginTop: "50px", display: "table" }}>
        <div style={{ width: "100%", height: "50px", display: "table-row", textAlign: "center" }}>
          <div style={{ display: "table-cell", textAlign: "center" }}>Name</div>
          <div style={{ display: "table-cell", textAlign: "center" }}>
            <input
              id="newTimeSeriesDescription"
              style={{ width: "100%" }}
              type="text"
              onChange={handleNewSeriesNameChange}
            />
          </div>
          <div style={{ display: "table-cell", textAlign: "center" }}>Description</div>
          <div style={{ display: "table-cell", textAlign: "center" }}>
            <input
              id="newTimeSeriesDescription"
              style={{ width: "100%" }}
              type="text"
              onChange={handleNewSeriesDescriptionChange}
            />
          </div>
          <div style={{ display: "table-cell", textAlign: "center" }}>
            <button
              type="button"
              id="newTimeSeriesCreateButton"
              onClick={onClickCreateNewTimeSeries}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSeriesCollection;
