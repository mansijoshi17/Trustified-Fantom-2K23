import { Box, Button, Chip, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { data } from '../../components/utils/BadgeTemplates';
import { BadgeContext } from '../../context/BadgeContext';
import Badge1 from '../Badge';
import CloseIcon from '@mui/icons-material/Close';

const GetBadgeTemlate = () => {
    const value = useContext(BadgeContext);
    const formdata = value.labelInfo.formData;

    const handleImageChange = (e) => {
        const image = e.target.files[0];
       value.setPreviewUrl(URL.createObjectURL(image));
    };

    const onClose = () => {
        value.setPreviewUrl("");
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Stack spacing={3} sx={{ margin: "20px" }}>

                        {
                            formdata.template === "" && <Box sx={{ m: 1 }}>
                                <Button sx={{ m: 1, color: '#fff' }} variant="contained" component="label" >
                                    Upload Your Badge
                                    <input onChange={(e) => handleImageChange(e)} hidden accept="image/*" multiple type="file" />
                                </Button>
                            </Box>
                        }

                        {value.previewUrl !== "" && <IconButton
                            aria-label="close"
                            onClick={onClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        }



                        {value.previewUrl && (
                            <div id="badgeId">
                                <img width="100%" height="auto" src={value.previewUrl} />
                            </div>
                        )}

                        <Divider>
                            <Chip label="OR" />
                        </Divider>
                        {
                            value.previewUrl === "" && <Box sx={{ minWidth: 120 }}>
                                <FormControl sx={{ m: 1 }} fullWidth>
                                    <InputLabel id="demo-simple-select-helper-label">
                                        Select Template
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        label="Select Template"
                                        name="template"
                                        onChange={value.setFormdata("template")}
                                        value={formdata.template}
                                    >
                                        <MenuItem  value="">None</MenuItem>
                                        {data.map((template) => {
                                            return (<MenuItem value={template.id}>{template.title}</MenuItem>)
                                        })}
                                    </Select>
                                </FormControl>
                            </Box>
                        }

                    </Stack>
                </div>
            </div>
            <div className="row">
                {formdata.template && (
                    <Badge1 idd={formdata.template} /> 
                )}


                {
                    formdata.template && <div className='col-12'>
                        <Stack spacing={3} sx={{ margin: "10px" }}>
                            <Box sx={{ m: 1 }}>
                                <Button sx={{ m: 1 }} variant="contained" component="label">
                                    Upload Logo
                                    <input onChange={(e) => value.handleChangeLogo(e)} hidden accept="image/*" multiple type="file" />
                                </Button>
                            </Box>

                            <TextField
                                fullWidth
                                label="Title"
                                name="name"
                                id="name"
                                type="name"
                                onChange={value.setFormdata("name")}
                                value={formdata.name}
                            />
                            <TextField
                                fullWidth
                                label="badgeName"
                                name="badgeName"
                                id="badgeName"
                                type="badgeName"
                                onChange={value.setFormdata("badgeName")}
                                value={formdata.badgeName}
                            />

                        </Stack>
                    </div>
                }

            </div>
        </div>
    );
};

export default GetBadgeTemlate;