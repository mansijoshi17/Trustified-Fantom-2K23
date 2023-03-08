import { CircularProgress, TableCell } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const TableRowComponent = ({ id, value, event }) => {
  const [pdf, setPdf] = useState("");

  useEffect(() => {
    if (id == "ipfsurl") {
      getUserSMetadata(value);
    }
  }, [event, value]);

  const getUserSMetadata = async (url) => {
    let d = await axios.get(url);
    // console.log(d.data, event);
    const rep = d.data.image.replace(
      "ipfs://",
      "https://nftstorage.link/ipfs/"
    );

    setPdf(rep);
  };
  return (
    <TableCell key={id}>
      {id == "ipfsurl" ? (
        <a target="_blank" href={pdf}>
          Preview
        </a>
      ) : (
        value
      )}
    </TableCell>
  );
};

export default TableRowComponent;
