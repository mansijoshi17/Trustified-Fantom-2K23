import { Box, CircularProgress, Divider, Paper, StepLabel } from '@mui/material';
import React from 'react';
import { NFTStorageContext } from '../../context/NFTStorageContext';
import GetNFTDetails from '../forms/stepform/GetNFTDetails';
import GetChain from '../forms/stepform/GetChain';
import GetTemplate from '../forms/stepform/GetTemplate';


import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = [
    {
        label: 'Step 1',
        description: `Basic Certificate Details`,
    },
    {
        label: 'Step 2',
        description:
            'Upload collectors list',
    },
    {
        label: 'Step 3',
        description: `Select template  `,
    },
];


const NewTemplates = () => {
    const formdatavalue = React.useContext(NFTStorageContext);
    const formdata = formdatavalue.labelInfo.formData;
    const btnDisbaled =
        formdata.title.length > 0 &&
        formdata.chain.length > 0 &&
        formdata.description.length > 0

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };



    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12 col-sm-12 col-md-10 col-lg-10 mx-auto'>
                    <Box >
                        <Paper elevation={0} sx={{ borderRadius: '12px', p: 3 }} className="top-ba nner-cert" >
                            <div className='text-center '>
                                <h4 className=' text-dark'>Create certificate</h4>
                                <p className=''>Please fill out the form with as much information as possible.</p>
                            </div>
                            <Box sx={{ marginTop: '30px' }}>
                                <Stepper activeStep={activeStep} orientation="vertical">
                                    {steps.map((step, index) => (
                                        <Step key={step.label}>
                                            <StepLabel
                                                optional={ <Typography variant="caption">{step.description}</Typography> }
                                            >
                                                {step.label}
                                            </StepLabel>
                                            <StepContent>
                                                {activeStep === 0 && <GetNFTDetails />}
                                                {activeStep === 1 && <GetChain />}
                                                { activeStep === 2 && <GetTemplate /> }
                                                <Box sx={{ mb: 2,mt:3 }}>
                                                    <div>

                                                        {index === steps.length - 1 ?
                                                            <a onClick={formdatavalue.createCertificateNFT}
                                                                className="thm-btn header__cta-btn"
                                                            >
                                                                {formdatavalue.uploading ? (
                                                                    <CircularProgress />
                                                                ) : (
                                                                    <span>Create NFT</span>
                                                                )}
                                                            </a>
                                                            : <Button
                                                                variant="contained"
                                                                style={{color:'white'}}
                                                                onClick={handleNext}
                                                                sx={{ mt: 1, mr: 1 }}
                                                            >Continue</Button>
                                                            
                                                            }
                                                        <Button
                                                            disabled={index === 0}
                                                            onClick={handleBack}
                                                            sx={{ mt: 1, mr: 1 }}
                                                        >
                                                            Back
                                                        </Button>
                                                    </div>
                                                </Box>
                                            </StepContent>
                                        </Step>
                                    ))}
                                </Stepper>
                                
                            </Box> 
                        </Paper>
                    </Box>
                </div>

            </div>
        </div>
    );
};

export default NewTemplates;