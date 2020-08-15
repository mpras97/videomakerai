import React, { Fragment, useState, useEffect } from 'react'
import '../../static/css/videolibrary.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Button } from "react-bootstrap"
import { Link } from 'react-router-dom'


export default function VideoLibrary(props) {
  const history = useHistory();
  const vid1 = require("../../static/vid/vid1.mp4")
  const vid2 = require("../../static/vid/vid2.mp4")
  const img = require("../../static/vid/finalbg.jpg")
  const [userId, setUserId] = useState(null)
  const [vids, setVids] = useState(null)
  const [filteredVids, setFilteredVids] = useState([])
  const [selectedConstant, setSelectedConstant] = useState(0)

  useEffect(() => {
    if (localStorage.length !== 0) {
      let userId = localStorage.getItem("user-id")
      setUserId(userId)
      console.log(userId)
      fetch(`http://localhost:8000/functionality/video_session_list/${userId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          console.log(res.data)
          setVids(res.data);
          setFilteredVids(res.data);
        })
        .catch(err => {
          console.log(err)
        })
    }
    else {
      alert("Please login")
      history.push("/")
    }
  }, [])
  function filterVideos (vidType) {
    if (vidType === 0) {
      setFilteredVids(vids)
    }
    else {
      setFilteredVids(vids.filter(vid => vid.session_type === vidType))
    }
    setSelectedConstant(vidType)
    console.log(selectedConstant)
  }
  return (
    <Fragment>
      <div id="myBtnContainer">
        <button className={`btn ${selectedConstant === 0 ? "active" : ""}`} onClick={() => filterVideos(0)}> Show all</button>
        <button className={`btn ${selectedConstant === 1 ? "active" : ""}`} onclick={() => filterVideos(1)}> Travel</button>
        <button className={`btn ${selectedConstant === 2 ? "active" : ""}`} onclick={() => filterVideos(2)}> Wedding</button>
        <button className={`btn ${selectedConstant === 3 ? "active" : ""}`} onclick={() => filterVideos(3)}> Business</button>
        <button className={`btn ${selectedConstant === 4 ? "active" : ""}`} onclick={() => filterVideos(4)}> Intro</button>

      </div>
      <div className="row">
        <Link to="/get-started"><Button variant="primary">Create Video</Button></Link>
        {filteredVids && filteredVids.forEach((filterVid, index) => (
          <div key={filterVid.id} className="column nature">
            <div className="content">
              <video src={filterVid.final_video} />
              <h4>{filterVid.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  )
}
