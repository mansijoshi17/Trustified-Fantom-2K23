import { Divider, Typography } from "@mui/material";
import React from "react";
import "./custom.css";

function Template1() {
  return (
    <div id="divToPrint1" className="cert-border">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <img
              className="my-3"
              style={{ width: "150px" }}
              src="/images/logo.png"
            />

            <Typography
              sx={{ fontFamily: "cursive", m: 3 }}
              component="h2"
              variant="h2"
            >
              Certificate Of Completion
            </Typography>
            <Typography className="my-2" component="body2" variant="body2">
              This is to certify that
            </Typography>

            <Typography
              sx={{ fontFamily: "cursive", m: 3 }}
              id="namePlace"
              className="my-2"
              component="h4"
              variant="h4"
            >
              Name
            </Typography>
            <Divider />
            <Typography component="body2" variant="body2">
              has successfully completed the course
            </Typography>
            <Typography className="my-2" component="h4" variant="h4">
              Learnweb3
            </Typography>
            <div className="d-flex justify-content-around align-items-center">
              <Typography component="body2" variant="body2">
                Signature
              </Typography>
              <img
                className="my-2"
                style={{ width: "100px" }}
                src="/images/cert-logo.png"
              />
              <Typography component="body2" variant="body2">
                20 Jan 2023
              </Typography>
            </div>
            <Typography component="body2" variant="body2">
              Validity: <span id="validity"></span>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Template1;
