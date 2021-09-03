import React from "react";
import { useState, useEffect } from "react";
import "./Table.css";
import Launch from "../Launch/Launch";
import Pagination from "../Pagination/Pagination";
import Filter from "../Filters/Filter";
const axios = require("axios");

function Table() {
  var result = [];
  var filteredLaunch = [];
  var onFilter = "All Launches";
  const [launch, setLaunch] = useState([]);
  const [clicked, setClickedLaunch] = useState("All Launches");
  const [clickedDay, setClickedDay] = useState("All Launches");
  const [filterLaunch, setFilterLaunch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [launchPerPage, setlaunchPerPage] = useState(12);
  const [currentPage, setcurrentPage] = useState(1);
  let currentLaunch = [];

  useEffect(() => {
    console.log("useEffect");
    async function fetchLaunch() {
      var params = new URLSearchParams(window.location.search);
      setLoading(true);
      result = await axios.get("https://api.spacexdata.com/v3/launches");
      if (
        (params.get("day") ||
          params.get("startdate") ||
          params.get("enddate")) &&
        params.get("launch")
      ) {
        let finalResult = filterLaunchFromURLLaunch(
          params.get("launch"),
          params.get("day")
            ? filterLaunchFromURLDay(params.get("day"), result.data)
            : filterLaunchFromURLDate(
                params.get("startdate"),
                params.get("enddate"),
                result.data
              )
        );
        setFilterLaunch([...finalResult]);
      } else if (params.get("day")) {
        let filterValue = filterLaunchFromURLDay(
          params.get("day"),
          result.data
        );
        setFilterLaunch([...filterValue]);
      } else if (params.get("launch")) {
        let filterValue = filterLaunchFromURLLaunch(
          params.get("launch"),
          result.data
        );
        setFilterLaunch([...filterValue]);
      } else if (params.get("startdate") && params.get("enddate")) {
        let filterValue = filterLaunchFromURLDate(
          params.get("startdate"),
          params.get("enddate"),
          result.data
        );
        setFilterLaunch([...filterValue]);
      } else {
        setLaunch(result.data);
      }
      setLoading(false);
    }

    fetchLaunch();
  }, []);

  //get current post

  const indexOfLastLaunch = currentPage * launchPerPage;
  const indexOfFirstLaunch = indexOfLastLaunch - launchPerPage;
  currentLaunch =
    filterLaunch.length != 0
      ? filterLaunch.slice(indexOfFirstLaunch, indexOfLastLaunch)
      : launch.slice(indexOfFirstLaunch, indexOfLastLaunch);
 
   // function to setxurrent page state

  let nextPage = (page) => {
    setcurrentPage(page);
  }

  //function to filter launch based on filter

  let filterLaunchFromURLLaunch = (launchfromurl, data) => {
    setClickedLaunch(launchfromurl.toUpperCase());
    filteredLaunch = data.filter((item) => {
      if (launchfromurl == "failed") {
        if (item.launch_success == false) {
          return true;
        }
      } else if (launchfromurl == "upcoming") {
        return item.upcoming;
      } else {
        return item.launch_success;
      }
    });
    return filteredLaunch;
  };
//function to filter launch based on filter for specific time period

  let filterLaunchFromURLDay = (day, data) => {
    setClickedDay(day.toUpperCase());
    let reference = {
      pastweek: 7,
      pastmonth: 31,
      past3month: 90,
      past6month: 180,
      pastyear: 365,
      past2year: 730,
    };
    var d = new Date();
    d.setDate(d.getDate() - reference[day]);
    let filterLaunchByDay = data.filter((item) => {
      return item.launch_date_unix > Math.round(d.getTime() / 1000);
    });
    return filterLaunchByDay;
  };

//function to filter launch based on filter for specific date range

  let filterLaunchFromURLDate = (sdate, edate, data) => {
    console.log(new Date(parseInt(sdate)));
    setClickedDay("Filtered By Date");
    let filterLaunchByDate = data.filter((item) => {
      return (
        item.launch_date_unix >= parseInt(sdate) &&
        item.launch_date_unix <= parseInt(edate)
      );
    });
    return filterLaunchByDate;
  };

  return (
    <div>
      <Filter filter={clicked} secondfilter={clickedDay} />
      <Launch launch={currentLaunch} currPage={indexOfFirstLaunch + 1} />
      {loading ? (
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : launch.length != 0 || filterLaunch.length != 0 ? (
        ""
      ) : (
        <div className="nodata">No results found for the specified filter</div>
      )}
      <Pagination
        currentPage={currentPage}
        totalLaunch={
          filterLaunch.length != 0 ? filterLaunch.length : launch.length
        }
        launchperPage={launchPerPage}
        nextPage={nextPage}
      />
    </div>
  );
}

export default Table;
