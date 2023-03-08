import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Button,
  TextField,
  Switch,
  FormHelperText,
  Divider,
} from "@mui/material";

import React, { useContext, useState } from "react";
import CSVReader from "react-csv-reader";

import { NFTStorageContext } from "../../../context/NFTStorageContext";

function GetChain() {
  const value = useContext(NFTStorageContext);
  const formdata = value.labelInfo.formData;
  const setCsvData = value.setCsvData;
  const [validity, setValidity] = useState("lifetime"); 

  return (
    <div>
      <Stack spacing={3} sx={{ margin: "20px" }}>
        {validity == "limited" ? (
          <Box sx={{ display: "flex", justifyContent: "start", m: 2 }}>
            <TextField
              id="date"
              label="Expire Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              name="expireDate"
              onChange={value.setFormdata("expireDate")}
              value={formdata.expireDate}
            />
          </Box>
        ) : (
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Validity
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={validity}
              >
                <Stack
                  direction="row"
                  justifyContent="start"
                  alignItems="center"
                  spacing={2}
                >
                  <FormControlLabel
                    value="limited"
                    control={<Radio />}
                    label="Limited"
                    onChange={(e) => setValidity(e.target.value)}
                  />
                  <FormControlLabel
                    value="lifetime"
                    control={<Radio />}
                    label="Lifetime"
                    onChange={(e) => setValidity(e.target.value)}
                  />
                </Stack>
              </RadioGroup>
            </FormControl>
          </Box>
        )}
     <Divider/>



     <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <FormLabel id="demo-controlled-radio-buttons-group">
                NFT Type
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={formdata.transferable}
              >
                <Stack
                  direction="row"
                  justifyContent="start"
                  alignItems="center"
                  spacing={2}
                >
                  <FormControlLabel
                    value="off" 
                    control={<Radio />}
                    label="Transferable"
                    onChange={value.setFormdata("transferable")}
                  />
                  <FormControlLabel
                    value="on" 
                    control={<Radio />}
                    label="Non-transferable(Soulbound NFT)"
                    onChange={value.setFormdata("transferable")}
                  />
                </Stack>
              </RadioGroup>
              <FormHelperText>Make your NFT non-transferable</FormHelperText>
            </FormControl>
          </Box>  
      <Divider/>
        <Stack spacing={3} sx={{ margin: "20px" }}>
          <span>Upload excel sheet of collectors data</span>
          <Box sx={{ m: 1 }}>
            <Button sx={{ m: 1,color:'white' }} variant="contained" component="label">
              Upload File
              <CSVReader
                inputStyle={{ display: "none" }}
                onFileLoaded={(data) => {
                  data.shift();
                  var result = data.map(function (row) {
                    return {
                      name: row[0],
                    };
                  });
                  setCsvData(result);
                }}
              />
            </Button>
          </Box>
        </Stack>
      </Stack>
    </div>
  );
}

export default GetChain;
