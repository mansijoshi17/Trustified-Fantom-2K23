import React, { useEffect, useState } from "react";


import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextareaAutosize,
  TextField,
} from "@mui/material";

const LoginwithTrustifiedWidget = () => {
  const [network, setNetwork] = useState("fevm");

  useEffect(() => {
    function generateCode() {
      var generatedJScode = document.getElementById("generatedJScode");

      generatedJScode.innerText =
        "<link rel='stylesheet' type='text/css' href=//downloaded css file path> \n" +
        "<script type ='text/javascript' src=//downloaded js file path></script> \n" +
        "<script type ='text/javascript'> \n" +
        "const verify_btn = document.getElementById('verify_btn'); \n" +
        'verify_btn.addEventListener("click", (event) => { \n' +
        "event.preventDefault(); \n" +
        "TrustifiedLogin('" +
        network +
        "').then((res) => { \n" +
        "if(res) { \n" +
        "   //  USER OWNS TRUSTIFIED NFT CERTIFICTE OR BADGE  \n" +
        "   //  DEFINE YOUR ACTIONS FOR NFT HOLDERS --> \n" +
        "} else { \n" +
        "   //  USER DOES NOT OWN TRUSTIFIED NFT CERTIFICTE OR BADGE  \n" +
        "   //  DEFINE YOUR ACTIONS FOR NON HOLDERS  \n" +
        "} \n" +
        "}).catch((err) => { \n" +
        '   alert("Failed to connect to MetaMask, Try to reload the page"); \n' +
        "}); \n" +
        "}); \n" +
        "</script> \n";

      const brPlugin = {
        "before:highlightBlock": ({ block }) => {
          block.innerHTML = block.innerHTML
            .replaceAll(/\n/g, "")
            .replaceAll(/<br[ /]*>/g, "\n");
        },
        "after:highlightBlock": ({ result }) => {
          result.value = result.value.replaceAll(/\n/g, "<br>");
        },
      };
    }
    generateCode();
  }, [network]);

  const CopyToClipboardButton = () => {
    console.log(document.getElementById("loginBtn").innerHTML);
    const el = document.createElement(`textarea`);
    el.value = document.getElementById("loginBtn").innerHTML;
    el.setAttribute(`readonly`, ``);

    document.body.appendChild(el);
    el.select();
    document.execCommand(`copy`);
    document.body.removeChild(el);
  };

  const CopyToClipboardWidget = () => {
    const selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = document.getElementById("generatedJScode").innerHTML;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);

    // console.log(document.getElementById("generatedJScode").innerHTML);
    // const el = document.createElement(`textarea`);
    // el.value = document.getElementById("generatedJScode").innerHTML;
    // el.setAttribute(`readonly`, ``);

    // document.body.appendChild(el);
    // el.select();
    // document.execCommand(`copy`);
    // document.body.removeChild(el);
  };

  return (
    <section className="pricing-one" id="pricing">
      <div className="container">
        <div className="block-title text-center">
          <h2 className="block-title__title">
            <span>Get Started</span>
          </h2>
          {/* <div className="cta-one__text"> */}
          <p className="banner-one__text">
            Create your own Login with Trustified widget.
          </p>
          {/* </div> */}
        </div>

        <div className="tabed-content">
          <FormControl sx={{ m: 1 }} fullWidth>
            <InputLabel id="demo-simple-select-helper-label">
              Select Template
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Select Template"
              name="template"
              onChange={(e) => setNetwork(e.target.value)}
            >
              <MenuItem value="fevm">fevm</MenuItem>
              <MenuItem value="polygon">polygon</MenuItem>
            </Select>
          </FormControl>

          <h3>Preview</h3>
          <div className="row">
            <div className="col" id="loginBtn">
              <a className="thm-btn header__cta-btn" id="verify_btn">
                <span>Login with Trustified</span>
              </a>
            </div>
            <div className="col">
              <a
                className="thm-btn header__cta-btn"
                onClick={() => CopyToClipboardButton()}
              >
                <span>Copy</span>
              </a>
            </div>
          </div>

          <h3>Code</h3>
          <div className="row">
            <div className="col" id="generatedJScode"></div>
            <div className="col">
              <a
                className="thm-btn header__cta-btn"
                onClick={() => CopyToClipboardWidget()}
              >
                <span>Copy</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginwithTrustifiedWidget;
