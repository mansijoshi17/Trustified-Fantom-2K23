import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

import { NFTStorageContext } from "../../context/NFTStorageContext";

export default function CreateNftForm({ handleClose }) {
  const validationSchema = yup.object({
    title: yup.string().required("Title is required!"),
    description: yup.string().required("Description is required!"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      template: "",
      chain: "",
      expireDate: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => { 
      handleClose();
    },
  });

  return (
    <Box
      // component="form"
      sx={{
        "& .MuiTextField-root": { m: 1 },
      }}
      autoComplete="off"
    >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="outlined-multiline-flexible"
          label="Title"
          name="title"
          type="text"
          fullWidth
          {...formik.getFieldProps("title")}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          fullWidth
          rows={3}
          name="description"
          type="text"
          {...formik.getFieldProps("description")}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />

        <FormControl sx={{ m: 1 }} fullWidth>
          <InputLabel id="demo-simple-select-helper-label">
            Select Template
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            // value={template}
            label="Select Template"
            // onChange={handleChange}
            name="template"
            {...formik.getFieldProps("template")}
            // error={formik.touched.template && Boolean(formik.errors.template)}
            // helperText={formik.touched.template && formik.errors.template}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {Templates.map((template) => (
              <MenuItem value={template.component}>{template.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1 }}>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Select chain
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            defaultValue="fevm"
            name="chain"
            type="radio"
            {...formik.getFieldProps("chain")}
            error={formik.touched.chain && Boolean(formik.errors.chain)}
            helperText={formik.touched.chain && formik.errors.chain}
          >
            <FormControlLabel value="fevm" control={<Radio />} label="FEVM" />
            <FormControlLabel
              value="polygon"
              control={<Radio />}
              label="Polygon"
            />
          </RadioGroup>
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "start", m: 1 }}>
          <TextField
            id="date"
            label="Issue Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            name="issueDate"
            {...formik.getFieldProps("issueDate")}
            error={formik.touched.issueDate && Boolean(formik.errors.issueDate)}
            helperText={formik.touched.issueDate && formik.errors.issueDate}
          />
          <TextField
            id="date"
            label="Expire Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            name="expireDate"
            {...formik.getFieldProps("expireDate")}
            error={
              formik.touched.expireDate && Boolean(formik.errors.expireDate)
            }
            helperText={formik.touched.expireDate && formik.errors.expireDate}
          />
        </Box>
        <Button sx={{ m: 1 }} variant="contained" component="label">
          Upload File
          <input hidden accept="image/*" multiple type="file" />
        </Button>
      </form>
    </Box>
  );
}
