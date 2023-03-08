import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CircularProgress, Dialog, DialogContent, Divider } from '@mui/material';
import { BadgeContext } from '../../context/BadgeContext';
import GetTitle from './GetTitle';
import GetBadgeTemlate from './GetBadgeTemlate';
import GetCsvFile from './GetCsvFile';

const steps = ['Badge Details','NFT Details', 'Create Your Badge'];

export default function BadgeStepperForm() {

    const formdatavalue = React.useContext(BadgeContext);
    const formdata = formdatavalue.labelInfo.formData;
    const btnDisbaled =
        formdata.title.length > 0 &&
        formdata.name.length > 0  

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

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
            <a className="thm-btn header__cta-btn" onClick={formdatavalue.handleClickOpen}>
                <span>Create Badges</span>
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
                        {activeStep === 0 && <GetTitle />}
                        {activeStep === 1 && <GetCsvFile />}
                        {activeStep === 2 && <GetBadgeTemlate />}
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

                                    <a style={{ display: activeStep === 0 ? "none" : "block" }} className="thm-btn header__cta-btn" onClick={handleBack}>
                                        <span>Back</span>
                                    </a>
                                    <Box sx={{ flex: "1 1 auto" }} />
                                    {isStepOptional(activeStep) && (
                                        <a className="thm-btn header__cta-btn" onClick={handleSkip}>
                                            <span>Skip</span>
                                        </a>
                                    )}
                                    {activeStep === steps.length - 1 ? (
                                        <a
                                            // style={{ display: !btnDisbaled ? "none" : 'block' }}
                                            onClick={formdatavalue.createBadge}
                                            className="thm-btn header__cta-btn"
                                        >
                                            {formdatavalue.loading ? (
                                                <CircularProgress />
                                            ) : (
                                                <span>Create Badge NFT</span>
                                            )}
                                        </a>
                                    ) : (
                                        <a className="thm-btn header__cta-btn" onClick={handleNext}>
                                            <span>Next</span>
                                        </a>

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