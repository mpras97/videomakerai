import React, { useState, Fragment } from "react";
import { useHistory } from "react-router";
import { Button } from 'react-bootstrap'
import "../../static/css/stockselection.css"

export default function StockSelection() {
  const history = useHistory();
  let helperImg = require("../../static/img/help.png")
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [imageTexts, setImageTexts] = useState([]);
  function ImageUpload (e) {
    
    var files = e.target.files

    for (let i = 0, f; f = files[i]; i++) {
      console.log(f.type)
      // if ((!f.type.match('image.*')) || (!f.type.match('video.*'))) {
      //   continue
      // }
      var reader = new FileReader()

      var texts = imageTexts
      texts.push("")
      setImageTexts(texts)

      if (f.type.match('image.*')) {
        reader.onload = (function(theFile) {
          return function(e) {
            var span = document.createElement('span');
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
      else if (f.type.match('video.*')) {
        reader.onload = (function(theFile) {
          var span = document.createElement('span')
          span.innerHTML = [
            '<video controls class="video"><source src=',e.target.result,
            '" title="', escape(theFile.name),
            '"/></video><input type="text" onChange={handleImageTextChange} value="',imageTexts[i],
            '" name="',i,'" /><br />'
          ].join('')
          document.getElementById("list").insertBefore(span, null)
        })(f)
      }

      reader.readAsDataURL(f)
    }
  }
  function handleImageTextChange (e) {
    var name = e.target.name;
    var imgTxts = imageTexts;
    imgTxts[name] = e.target.value
    setImageTexts(imgTxts)
  }
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
            accept="image/x-png, image/gif, image/jpeg, video/mp4"
            multiple
          />
          {/* {image ?
            <img src={image} id="target" /> : null  
        } */}
        {/* {images ? images.forEach((imgSrc, index) => (<img src={imgSrc} id={`target_${index}`} />)) : null} */}
        <output id="list"></output><br/>
        <br/>
        <Button variant="primary">Create video</Button>
        </div>
      </div>
      <div className="splitRight right">
        <div className="centered">
          <img src={helperImg} />
          <h2>Add Video Stocks</h2>
          <p>Select the stock video snippets and images, that you want to use for creating the video!</p>
        </div>
      </div>
    </Fragment>
  )
}
