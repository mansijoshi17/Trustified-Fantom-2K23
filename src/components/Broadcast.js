import React from "react";
// material
import { styled } from "@mui/material/styles";
// layouts
// components

import * as yup from "yup";
import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Stack,
  Container,
  Grid,
  TextField,
  Button,
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";

import DialogTitle from "@mui/material/DialogTitle";

import { Web3Context } from "../context/Web3Context";
import { firebaseDataContext } from "../context/FirebaseDataContext";

function Broadcast() {
  const web3Context = React.useContext(Web3Context);
  const { userId, notifyHolders, loadingMsg } = web3Context;

  const firebaseContext = React.useContext(firebaseDataContext);
  const { collections, getCollections } = firebaseContext;

  useEffect(() => {
    getCollections(userId);
  }, [userId]);

  const validationSchema = yup.object({
    nftContract: yup.string().required("nftContract is required!"),
    message: yup.string().required("Message is required!"),
  });

  const formik = useFormik({
    initialValues: {
      nftContract: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await notifyHolders(values.nftContract, values.message);
    },
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ padding: "24px" }}>
        <DialogTitle
          style={{
            textAlign: "center",
          }}
        >
          Broadcast
        </DialogTitle>
        <form
          onSubmit={formik.handleSubmit}
          style={{
            justifyContent: "center",
            marginLeft: "auto",
            marginRight: "auto",
            // marginTop: "100px",
          }}
        >
          <Stack spacing={3}>
            {/* <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select NFT</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="nftContract"
                label="Select NFT"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
                {...formik.getFieldProps("nftContract")}
                error={
                  formik.touched.nftContract &&
                  Boolean(formik.errors.nftContract)
                }
                helperText={
                  formik.touched.nftContract && formik.errors.nftContract
                }
              >
                {collections &&
                  collections.map((a) => {
                    return (
                      <MenuItem value={a.collectionContract}>
                        {a.tokenName}({a.tokenSymbol})
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl> */}
            <TextField
              fullWidth
              label="Message"
              name="message"
              id="message"
              type="text"
              multiline
              rows={2}
              maxRows={10}
              {...formik.getFieldProps("message")}
              error={formik.touched.message && Boolean(formik.errors.message)}
              helperText={formik.touched.message && formik.errors.message}
            />

            <Button
              //   color="primary"
              size="large"
              type="submit"
              variant="contained"
              onSubmit={formik.handleSubmit}
              disabled={loadingMsg}
            >
                {loadingMsg ? "Sending..." : "Send"}
              
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}

export default Broadcast;
