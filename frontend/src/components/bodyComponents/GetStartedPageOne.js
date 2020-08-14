import React, {Fragment, useState} from "react"
import { Button } from 'react-bootstrap'
import "../../static/css/getstarted1.css"
import { useHistory } from "react-router"


export default function GetStartedPageOne() {
  const history = useHistory();
  let helperimg = require("../../static/img/help.png")
  const [selectedOption, setSelectedOption] = useState("1");
  function handleNext () {
    history.push(`/stock-selection/${selectedOption}`);
  }
  return (
    <Fragment>
    <div class="split left">
      <div class="centered">
        <img src={helperimg} alt="Avatar woman" />
        <h2>Video Type</h2>
        <p>Select the type of video you want to make</p>
      </div>
    </div>

    <div class="split right">
      <div class="centered">
        <h2>Step 1</h2>
        <p>
          Choose one of the video types:<br/>
          <input
            type="radio"
            id="travel"
            name="gender"
            value="1"
            checked={selectedOption === "1"}
            onChange={() => setSelectedOption("1")}
          />
          <label for="travel">Travel</label><br />
          <input
            type="radio"
            id="wedding"
            name="gender"
            value="2"
            checked={selectedOption === "2"}
            onChange={() => setSelectedOption("2")}
          />
          <label for="wedding">Wedding</label><br />
          <input
            type="radio"
            id="business"
            name="gender"
            value="3"
            checked={selectedOption === "3"}
            onChange={() => setSelectedOption("3")}
          />
          <label for="business">Business</label><br/>
          <input
            type="radio"
            id="intro"
            name="gender"
            value="4"
            checked={selectedOption === "4"}
            onChange={() => setSelectedOption("4")}
          />
          <label for="Intro">Intro</label><br/>

        </p>
        <Button variant="primary" onClick={handleNext}>Next</Button>
      </div>
    </div>
    </Fragment>

  )
}
