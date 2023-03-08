import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

import { NFTStorageContext } from "../../context/NFTStorageContext";
import { Web3Context } from "../../context/Web3Context";
import { Templates } from "../../Templates/index";

import CSVReader from "react-csv-reader";

import Template1 from "../../Templates/Template1";
import Template2 from "../../Templates/Template2";
import Template3 from "../../Templates/Template3";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
export default function CreateNftModal({ open, handleClose }) {
  const nftStorageContext = React.useContext(NFTStorageContext);
  const { storeCertificate, uploading } = nftStorageContext;

  const web3Context = React.useContext(Web3Context);
  const { createNFTCollecion } = web3Context;

  const [loading, setLoading] = React.useState(false);

  const [csvData, setCsvData] = React.useState([]);
  const [selectedTemplate, SetSelectedTemplate] = React.useState();

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
      issueDate: "",
      expireDate: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        let uris = await storeCertificate(csvData, selectedTemplate, {
          name: values.name,
          description: values.description,
        });

        if (uris.length > 0) {
          await createNFTCollecion(
            {
              tName: values.name,
              tSymbol: values.symbol,
              tokenUris: uris,
            },
            values
          );
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    },
  });

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <form onSubmit={formik.handleSubmit}>
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Create NFT
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1 },
              }}
              autoComplete="off"
            >
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
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Token Name"
                name="name"
                type="text"
                fullWidth
                {...formik.getFieldProps("name")}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Symbol"
                name="symbol"
                type="text"
                fullWidth
                {...formik.getFieldProps("symbol")}
                error={formik.touched.symbol && Boolean(formik.errors.symbol)}
                helperText={formik.touched.symbol && formik.errors.symbol}
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
                  onChange={(e) => { 
                    SetSelectedTemplate(e.target.value);
                  }}
                  value={selectedTemplate}
                  // error={formik.touched.template && Boolean(formik.errors.template)}
                  // helperText={formik.touched.template && formik.errors.template}
                >
                  {Templates.map((template) => (
                    <MenuItem value={template.div}>{template.title}</MenuItem>
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
                  <FormControlLabel
                    value="fevm"
                    control={<Radio />}
                    label="FEVM"
                  />
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
                  error={
                    formik.touched.issueDate && Boolean(formik.errors.issueDate)
                  }
                  helperText={
                    formik.touched.issueDate && formik.errors.issueDate
                  }
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
                    formik.touched.expireDate &&
                    Boolean(formik.errors.expireDate)
                  }
                  helperText={
                    formik.touched.expireDate && formik.errors.expireDate
                  }
                />
              </Box>
              <Button sx={{ m: 1 }} variant="contained" component="label">
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
              <div className="row">
                <div className="col">
                  <span>Preview</span>
                </div>
                <div className="col">
                  <div className="template">
                    {selectedTemplate && selectedTemplate == "divToPrint1" && (
                      <Template1></Template1>
                    )}
                    {selectedTemplate && selectedTemplate == "divToPrint2" && (
                      <Template2></Template2>
                    )}
                    {selectedTemplate && selectedTemplate == "divToPrint3" && (
                      <Template3></Template3>
                    )}
                  </div>
                </div>
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={loading}
              variant="contained"
              autoFocus
              type="submit"
            >
              {loading ? "Creating..." : "Create"}
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </div>
  );
}
