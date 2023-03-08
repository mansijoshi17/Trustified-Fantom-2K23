import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
} from "@mui/material";
import GetChain from "./GetChain";
import { NFTStorageContext } from "../../../context/NFTStorageContext";
import GetNFTDetails from "./GetNFTDetails";
import GetTemplate from "./GetTemplate"; 

const steps = ["Course Details", "NFT Details", "Select Template"];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const formdatavalue = React.useContext(NFTStorageContext);
  const formdata = formdatavalue.labelInfo.formData;
  const btnDisbaled =
    formdata.title.length > 0 &&
    formdata.chain.length > 0 &&
    formdata.description.length > 0 

  const isStepOptional = (step) => {
    return step === 1;
  };
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <React.Fragment>
      {/* <Button variant="contained" onClick={formdatavalue.handleClickOpen}>
        Create NFT
      </Button> */}

      <a className="thm-btn header__cta-btn" onClick={formdatavalue.handleClickOpen} >
        <span>Create NFT</span>
       </a>

      <Dialog
        open={formdatavalue.open}
        onClose={formdatavalue.handleClose}
        fullWidth
      >
        <DialogContent style={{ overflowX: "hidden" }}>
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                  labelProps.optional = true;
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === 0 && <GetNFTDetails />}
            {activeStep === 1 && <GetChain />}{" "}
            {activeStep === 2 && <GetTemplate />} 
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Divider />
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  
                  <a style={{ display: activeStep === 0 ? 'none' : 'block' }}  className="thm-btn header__cta-btn"  onClick={handleBack}>
                    <span>Back</span>
                  </a> 
                  
                  <Box sx={{ flex: "1 1 auto" }} />
                  {isStepOptional(activeStep) && (
                    
                     <a className="thm-btn header__cta-btn"  onClick={handleSkip}>
                     <span>Skip</span>
                   </a>
 
                  )}
                  {activeStep === steps.length - 1 ? (
                    <a
                      style={{ display: !btnDisbaled ? "none" :'block'}}
                      onClick={formdatavalue.createCertificateNFT} 
                      className="thm-btn header__cta-btn"
                    >
                      {formdatavalue.uploading ? (
                        <CircularProgress />
                      ) : (
                        <span>Create NFT</span> 
                      )}
                    </a>
                  ) : (
                    <a  className="thm-btn header__cta-btn"  onClick={handleNext}>
                    <span>Next</span> 
                    </a>
                    // <Button onClick={handleNext}>Next</Button>
                    //   <CSVLink data={data} filename={"claim-certificates.csv"}>
                    //   Download me
                    // </CSVLink>
                  )}
                </Box>
              </React.Fragment>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
