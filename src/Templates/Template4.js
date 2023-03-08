import React from "react";

const Template4 = () => {
  return (
    <div className="outer-border" id="divToPrint4">
      <div className="inner-dotted-border">
        <span className="certification">Certificate of Completion</span>
        <br />
        <br />
        <span className="certify">
          <i>This is to certify that</i>
        </span>
        <br />
        <br />
        <span id="namePlace" className="name">
          <b>Name</b>
        </span>
        <br />
        <br />
        <span className="certify">
          <i>has successfully completed the certification</i>
        </span>{" "}
        <br />
        <br />
        <span className="fs-30">Solidity Developer</span> <br />
        <br />
        <span className="fs-20">
          with score of <b>A+</b>
        </span>{" "}
        <br />
        <br />
        <span className="certify">
          <i>dated</i>
        </span>
        <br />
        <span className="fs-30">20 Jan 2023</span>
      </div>
      <span component="body2" variant="body2">
        Validity: <span id="validity"></span>
      </span>
    </div>
  );
};

export default Template4;
