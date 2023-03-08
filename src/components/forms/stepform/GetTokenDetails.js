import { Stack, TextareaAutosize, TextField } from "@mui/material";
import React, { useContext } from "react";
import { NFTStorageContext } from "../../../context/NFTStorageContext";

function GetTokenDetails() {
  const value = useContext(NFTStorageContext);
  const formdata = value.labelInfo.formData;

  return <div></div>;
}

export default GetTokenDetails;
