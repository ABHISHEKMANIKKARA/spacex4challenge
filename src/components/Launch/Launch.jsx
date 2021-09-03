import React,{ useState } from 'react'
import { Modal,Button} from 'react-bootstrap'

function Launch({ launch, currPage }) {
    const [show, setShow] = useState(false);
    const [modaldata,setModalData]=useState([])



    const handleClose = () => setShow(false);

    //function to implement detail modal logic
    
    const handleShow = (item) => {
        //localStorage.setItem("name",item.mission_name)
        //localStorage.setItem("sample",JSON.stringify(item))
        //console.log(JSON.parse(localStorage.getItem("sample")).mission_name)
        setModalData([item])
        setShow(true);

    }
    return (
        <div>
            <table class="table">
                <thead class="thead-light">
                    <tr>
                        <th scope="col">No:</th>
                        <th scope="col">Launched(UTC)</th>
                        <th scope="col">Location</th>
                        <th scope="col">Mission</th>
                        <th scope="col">Orbit</th>
                        <th scope="col">Launch Status</th>
                        <th scope="col">Rocket</th>
                    </tr>
                </thead>
                {launch.length != 0 ? <tbody>
                    {launch.map(function (item, no) {
                        return (<tr key ={item } class="table-row">
                            <th scope="row">{currPage + no}</th>
                            <td><a onClick={()=>{handleShow(item)}}>{item.launch_date_utc}</a></td>
                            <td><a data-toggle="modal" data-target="#exampleModalCenter">{item.launch_site.site_name}</a></td>
                            <td><a data-toggle="modal" data-target="#exampleModalCenter">{item.mission_name}</a></td>
                            <td><a data-toggle="modal" data-target="#exampleModalCenter">{item.rocket.second_stage.payloads[0].orbit}</a></td>
                            <td><a data-toggle="modal" data-target="#exampleModalCenter" >{item.launch_success ? <div className="success">Success</div> : item.launch_success == false ? <div className="failed">Failed</div> : item.upcoming ? <div className="upcoming">Upcoming</div> : ""}</a></td>
                            <td><a data-toggle="modal" data-target="#exampleModalCenter">{item.rocket.rocket_name}</a></td>

                        </tr>)
                    })}


                </tbody>:""}
            </table>
            {show?<Modal aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <div className="detail-heading">
                            <img className="detail-logo" src={modaldata[0].links.mission_patch_small} alt="no image"/>
                            <div style={{display:"flex",flexDirection:"column"}}>
                                <div><h6>{modaldata[0].mission_name}</h6></div>
                                <div>{modaldata[0].rocket.rocket_name}</div>
                                <div style={{display:"flex"}}>
                                    <img style={{width:"20px",height:"20px"}} src="https://img.icons8.com/ios/50/000000/wikipedia.png"/>
                                    <img style={{width:"20px",height:"20px"}} src="https://img.icons8.com/ios-glyphs/30/000000/youtube-squared.png"/>
                                </div>
                            </div>
                            <div>{modaldata[0].launch_success?<div className="success">Success</div> : modaldata[0].launch_success == false ? <div className="failed">Failed</div> : modaldata[0].upcoming ? <div className="upcoming">Upcoming</div> : ""}</div>
                     </div>
                    
                </Modal.Header>
                <Modal.Body>
                    <div>{modaldata[0].details}<a style={{color:"blue"}} href={modaldata[0].links.wikipedia}>Wikipedia</a></div>
                    <div style={{marginTop:"10px"}} className="info">
                        <div class="row" >
                            <div class="col-4">Flight Number</div>
                            <div class="col-6">{modaldata[0].flight_number}</div>
                        </div>
                        <div class="row" >
                            <div class="col-4">Mission Name</div>
                            <div class="col-6">{modaldata[0].mission_name}</div>
                        </div>
                        <div class="row" >
                            <div class="col-4">Rocket Type</div>
                            <div class="col-6">{modaldata[0].rocket.rocket_type}</div>
                        </div>
                        <div class="row" >
                            <div class="col-4">Rocket Name</div>
                            <div class="col-6">{modaldata[0].rocket.rocket_name}</div>
                        </div>
                        <div class="row" >
                            <div class="col-4">Manfacturer</div>
                            <div class="col-6">{modaldata[0].rocket.second_stage.payloads[0].manufacturer}</div>
                        </div>
                        <div class="row" >
                            <div class="col-4">Nationality</div>
                            <div class="col-6">{modaldata[0].rocket.second_stage.payloads[0].nationality}</div>
                        </div>
                        <div class="row" >
                            <div class="col-4">Launch Date</div>
                            <div class="col-6">{modaldata[0].launch_date_utc  }</div>
                        </div>
                        <div class="row" >
                            <div class="col-4">Payload Type</div>
                            <div class="col-6">{modaldata[0].rocket.second_stage.payloads[0].payload_type}</div>
                        </div>
                        <div class="row" >
                            <div class="col-4">Orbit</div>
                            <div class="col-6">{modaldata[0].rocket.second_stage.payloads[0].orbit}</div>
                        </div>
                        <div class="row">
                            <div class="col-4">Launch Site</div>
                            <div class="col-6">{modaldata[0].launch_site.site_name}</div>
                        </div>
                    </div>
                </Modal.Body>
                </Modal>:""}
{/*<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
      <div className="detail-heading">
                            <img className="detail-logo" src={JSON.parse(localStorage.getItem("sample")).links.mission_patch_small} alt="no image"/>
                            <div style={{display:"flex",flexDirection:"column"}}>
                                <div><h6>{JSON.parse(localStorage.getItem("sample")).mission_name}</h6></div>
                                <div>{JSON.parse(localStorage.getItem("sample")).rocket.rocket_name}</div>
                                <div style={{display:"flex"}}>
                                    <img style={{width:"20px",height:"20px"}} src="https://img.icons8.com/ios/50/000000/wikipedia.png"/>
                                    <img style={{width:"20px",height:"20px"}} src="https://img.icons8.com/ios-glyphs/30/000000/youtube-squared.png"/>
                                </div>
                            </div>
                            <div>{JSON.parse(localStorage.getItem("sample")).launch_success?<div className="success">Success</div> : JSON.parse(localStorage.getItem("sample")).launch_success == false ? <div className="failed">Failed</div> : JSON.parse(localStorage.getItem("sample")).upcoming ? <div className="upcoming">Upcoming</div> : ""}</div>
                     </div>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div>{JSON.parse(localStorage.getItem("sample")).details}<a style={{color:"blue"}} href={JSON.parse(localStorage.getItem("sample")).links.wikipedia}>Wikipedia</a></div>
                    <div style={{marginTop:"10px"}} className="info">
                        <div class="row" >
                            <div class="col-4">Flight Number</div>
                            <div class="col-6">{JSON.parse(localStorage.getItem("sample")).flight_number}</div>
                        </div>
                        <div class="row" >
                            <div class="col-4">Mission Name</div>
                            <div class="col-6">{JSON.parse(localStorage.getItem("sample")).mission_name}</div>
                        </div>
                        <div class="row" >
                            <div class="col-4">Rocket Type</div>
                            <div class="col-6">{JSON.parse(localStorage.getItem("sample")).rocket.rocket_type}</div>
                        </div>
                        <div class="row" >
                            <div class="col-4">Rocket Name</div>
                            <div class="col-6">{JSON.parse(localStorage.getItem("sample")).rocket.rocket_name}</div>
                        </div>
                        <div class="row" >
                            <div class="col-4">Manfacturer</div>
                            <div class="col-6">{JSON.parse(localStorage.getItem("sample")).rocket.second_stage.payloads[0].manufacturer}</div>
                        </div>
                        <div class="row" >
                            <div class="col-4">Nationality</div>
                            <div class="col-6">{JSON.parse(localStorage.getItem("sample")).rocket.second_stage.payloads[0].nationality}</div>
                        </div>
                        <div class="row" >
                            <div class="col-4">Launch Date</div>
                            <div class="col-6">{JSON.parse(localStorage.getItem("sample")).launch_date_utc  }</div>
                        </div>
                        <div class="row" >
                            <div class="col-4">Payload Type</div>
                            <div class="col-6">{JSON.parse(localStorage.getItem("sample")).rocket.second_stage.payloads[0].payload_type}</div>
                        </div>
                        <div class="row" >
                            <div class="col-4">Orbit</div>
                            <div class="col-6">{JSON.parse(localStorage.getItem("sample")).rocket.second_stage.payloads[0].orbit}</div>
                        </div>
                        <div class="row">
                            <div class="col-4">Launch Site</div>
                            <div class="col-6">{JSON.parse(localStorage.getItem("sample")).launch_site.site_name}</div>
                        </div>
                    </div>
      </div>
      <div class="modal-footer">
      </div>
    </div>
  </div>
</div>*/}
        </div>
    )
}

export default Launch
