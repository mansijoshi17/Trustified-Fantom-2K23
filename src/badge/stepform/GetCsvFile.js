import {
  Button,
  FormControlLabel,
  FormHelperText,
  Switch,
  TextField
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useContext } from "react";
import CSVReader from "react-csv-reader";
import { BadgeContext } from "../../context/BadgeContext";

const GetCsvFile = () => {
  const value = useContext(BadgeContext);
  const formdata = value.labelInfo.formData;
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Stack spacing={3} sx={{ margin: "20px" }}>
            <span>Quantity of Badges</span>
            <Box sx={{ m: 1 }}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                id="quantity"
                type="number"
                onChange={value.setFormdata("quantity")}
                value={formdata.quantity}
              />
            </Box>
            <FormControlLabel
              sx={{ m: 2 }}
              control={
                <Switch
                  name="transferable"
                  onChange={value.setFormdata("transferable")}
                />
              }
              label="Soulbound NFT"
            />
            <FormHelperText>Make your NFT non-transferable</FormHelperText>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default GetCsvFile;
