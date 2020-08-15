import React, { Fragment, useState, useEffect } from 'react'
import '../../static/css/videolibrary.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import axios from 'axios'


export default function VideoLibrary(props) {
  const history = useHistory();
  const [vids, setVids] = useState(null)
  const [filteredVids, setFilteredVids] = useState([])
  const [selectedConstant, setSelectedConstant] = useState(0)

  useEffect(() => {
    let mounted = true;
      console.log(mounted)
      if (localStorage.length !== 0) {
        let userId = localStorage.getItem("user-id")
        console.log(userId)
        const options = {
          headers: {Authorization: `Bearer ${localStorage.getItem('video-token')}`}
        };
        axios.get(`http://localhost:8000/functionality/video_session_list/${userId}/`, options)
          .then(json => {
            if (mounted) {
              console.log(json.data)
              setVids(json.data);
              setFilteredVids(json.data);
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        alert("Please login")
        history.push("/")
      }
    return () => { mounted = false };

  }, [history])



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
        <button className={`btn ${selectedConstant === 1 ? "active" : ""}`} onClick={() => filterVideos(1)}> Travel</button>
        <button className={`btn ${selectedConstant === 2 ? "active" : ""}`} onClick={() => filterVideos(2)}> Wedding</button>
        <button className={`btn ${selectedConstant === 3 ? "active" : ""}`} onClick={() => filterVideos(3)}> Business</button>
        <button className={`btn ${selectedConstant === 4 ? "active" : ""}`} onClick={() => filterVideos(4)}> Intro</button>

      </div>
      <div className="row">
        <Link to="/get-started"><Button variant="primary">Create Video</Button></Link>
        {filteredVids && filteredVids.forEach(item =>
          <div key={item.id} className="column nature">
            /
            <div className="content">
              <video control src={item.final_video}/>
              <h4>{item.name}</h4>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  )
}
