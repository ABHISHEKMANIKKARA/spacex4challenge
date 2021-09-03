import React from 'react'
import './filter.css'
import { useState} from 'react'
import { useHistory } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Filter({filter,secondfilter}) {
    var date=new Date()
    date.setDate(date.getDate()+30)
    const [valueFirst, onChangeFirst] = useState(new Date());
    const [valueSecond, onChangeSecond] = useState(date);
    var history=useHistory()

    //function for updating date filter to url

    let dateFilter=()=>{
        if(window.location.search){
            console.log(valueFirst)
            var queryParams = new URLSearchParams(window.location.search);
            queryParams.delete("day")
            queryParams.set("startdate", Math.round(valueFirst.getTime()/1000));
            queryParams.set("enddate", Math.round(valueSecond.getTime()/1000));
            history.push("?"+queryParams.toString())
            window.location.reload();
            console.log("testing")
        }
        else{
            let sdate=Math.round(valueFirst.getTime()/1000);
            let edate=Math.round(valueSecond.getTime()/1000);
            history.push(`/filter?startdate=${sdate}&enddate=${edate}`)
        }
    }
 
    //function for updating specific time period filter to url

    let dayFilter=(condition)=>{
        if(window.location.search){
            var queryParams = new URLSearchParams(window.location.search);
            queryParams.delete("enddate")
            queryParams.delete("startdate")
            queryParams.set("day", condition);
            history.push("?"+queryParams.toString())
        }
        else{
            history.push(`/filter?day=${condition}`)
        }
    }

    ////function for updating launch filter to url based on success,failed and upcoming

    let launchFilter=(condition)=>{
        if(window.location.search){
            var queryParams = new URLSearchParams(window.location.search);
            queryParams.set("launch", condition);
            history.push("?"+queryParams.toString())
        }
        else{
            history.push(`/filter?launch=${condition}`)
        }
    }
    return (
        <div>
        <div className="filter">
           
                <div>
                    <button data-toggle="modal" class="btn" data-target=".bd-example-modal-lg" style={{border:"none",background: "none"}}><p className="font"><img src="https://img.icons8.com/material-outlined/24/000000/calendar--v1.png"/>{secondfilter}</p></button>
                </div>

                <div>
                    
                    <div class="dropdown">
                        
                        <button type="button" class="btn dropdown-toggle" data-toggle="dropdown"><img src="https://img.icons8.com/material-outlined/24/000000/filter--v1.png"/>{filter}</button>
                        <div class="dropdown-menu">

                           <a class="dropdown-item" onClick={()=>{ history.push('/')}} href="">All Launches</a>
                            <a class="dropdown-item" onClick={()=>{ launchFilter("success")}} href="">Successfull Launches</a>
                             <a class="dropdown-item" onClick={()=>{launchFilter("failed")}} href="">Failed Launches</a>
                            <a class="dropdown-item" onClick={()=>{launchFilter("upcoming")}} href="">Upcoming Launches</a>
                        </div>
                    </div>
                </div> 
        </div>
<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
    <div class="row" style={{margin:"10px"}}>
                <div class="col-2 past day">
                    <div class="row"><a onClick={()=>{dayFilter("pastweek")} } href="">Past Week</a></div>
                    <div class="row"><a onClick={()=>{dayFilter("pastmonth")} } href="">Past Month</a></div>
                    <div class="row"><a onClick={()=>{dayFilter("past3month")} } href="">Past 3 Month</a></div>
                    <div class="row"><a onClick={()=>{dayFilter("past6month")} } href="">Past 6 Month</a></div>
                    <div class="row"><a onClick={()=>{dayFilter("pastyear")} } href="">Past Year</a></div>
                    <div class="row"><a onClick={()=>{dayFilter("past2year")} } href="">Past 2 Year</a></div>
                </div>
                <div class="col-10">
                    <div class="row">
                        <div class="col-6"><Calendar onChange={onChangeFirst} value={valueFirst} /></div>
                        <div class="col-6"><Calendar onChange={onChangeSecond} value={valueSecond} /></div>
                    </div>
                </div>
          </div>
          <div class="modal-footer">
        <a onClick ={dateFilter} href=""><button type="button" class="btn btn-primary"  data-dismiss="modal">Save</button></a>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</div>
    )
}

export default Filter
