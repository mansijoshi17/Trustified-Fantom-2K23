import React from "react";
import { Button, Typography, Box } from "@mui/material";

import NftList from "./NftList";
import CreateNftModal from "../modals/CreateNftModal";
import HorizontalLinearStepper from "../forms/stepform/Index";
import Certificates from "./Certificates";
import { useNavigate } from "react-router-dom";

function Collections() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  const handleClickNavigate=()=>{
    navigate("/dashboard/temp");
  }
  return (
    <div className="container">
      <div className="row gy-5">
        <div className="col-12">
          <Box sx={{ width: "100%" }}>
            <div className="d-flex justify-content-between  mb-3">
              <h2 className="block-title__title">
                <span>Certificates</span>
              </h2>
              <a className="thm-btn header__cta-btn" onClick={handleClickNavigate} >
             <span>Create NFT</span>
           </a>
            </div>
          </Box>
        </div>
        <Certificates />
      </div>
    </div>
  );
}

export default Collections;
