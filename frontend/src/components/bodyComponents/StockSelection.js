import React, { useState, Fragment } from "react";
import { useHistory } from "react-router";
import { Button } from 'react-bootstrap'
import "../../static/css/stockselection.css"

export default function StockSelection() {
  const history = useHistory();
  let helperImg = require("../../static/img/help.png")
  const [images, setImages] = useState([]);
  const [imageTexts, setImageTexts] = useState([]);

  function saveImages(e) {

    /*
    * Create a video session.
    * TODO: Added session type form previous page.
    * */
    let userId = localStorage.getItem("user-id")
    let videoSessionID = null
    let data = {
      'name': Math.random().toString(36).substring(7),
      'added_by': userId,
      'transforms': 'transforms',
      'session_type': 1
    }
    fetch('http://localhost:8000/functionality/create_video_session/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('video-token')}`,
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        videoSessionID = json.id
        for ( let i = 0; i < images.length; i++) {
          const formData = new FormData();
          formData.set("uploaded_file", images[i])
          formData.set("session", videoSessionID)
          fetch('http://localhost:8000/functionality/stock_upload/', {
            method: 'POST',
            body: formData,
            headers: {
              Authorization: `Bearer ${localStorage.getItem('video-token')}`,
            }
          })
            .then(res => res.json())
            .then(json => {
              let token = localStorage.getItem("video-token")
              if (token) {
                history.push('/video-library')
              }
              else {
                history.push('/login')
              }
            })
            .catch(err => {
              console.log('kdln')
              alert(err.message)
            }
        )
        }

      })
      .catch(err => alert(err.message));
  }

  function ImageUpload (e) {
    
    let files = e.target.files

    for (let i = 0, f; f = files[i]; i++) {
      let reader = new FileReader()

      let texts = imageTexts
      texts.push("")
      setImageTexts(texts)

      if (f.type.match('image.*')) {
        reader.onload = (function(theFile) {
          return function(e) {
            let span = document.createElement('span');
            span.innerHTML = 
            [
              '<img src="', 
              e.target.result,
              '" title="', escape(theFile.name), 
              '"/><input type="text" onChange={handleImageTextChange} value="',imageTexts[i],'" name="',i,'" /><br />'
            ].join('');
            document.getElementById("list").insertBefore(span, null);
          }
        })(f)
      }
      reader.readAsDataURL(f)
    }
    setImages(files)
  }
  // function handleImageTextChange (e) {
  //   let name = e.target.name;
  //   let imgTxts = imageTexts;
  //   imgTxts[name] = e.target.value
  //   setImageTexts(imgTxts)
  // }
  return (
    <Fragment>
      <div className="splitLeft left">
        <div className="centered">
          <h2>Upload the images as required:</h2>
          <input
            type="file"
            onChange={ImageUpload}
            className="fileUpload"
            id="group_image"
            accept="image/x-png, image/gif, image/jpeg"
            multiple
          />
          {/* {image ?
            <img src={image} id="target" /> : null  
        } */}
        {/* {images ? images.forEach((imgSrc, index) => (<img src={imgSrc} id={`target_${index}`} />)) : null} */}
        <output id="list"></output><br/>
        <br/>
        <Button variant="primary" onClick={saveImages}>Create video</Button>
        </div>
      </div>
      <div className="splitRight right">
        <div className="centered">
          <img alt="" src={helperImg} />
          <h2>Add Video Stocks</h2>
          <p>Select the stock video snippets and images, that you want to use for creating the video!</p>
        </div>
      </div>
    </Fragment>
  )
}
