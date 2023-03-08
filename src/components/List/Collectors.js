import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Typography } from "@mui/material";
import { collection, db, doc, getDocs, query, where } from "../../firebase";
import { getDoc } from "firebase/firestore";
import { firebaseDataContext } from "../../context/FirebaseDataContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import TableRowComponent from "./TableRow";

const columns = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "tokenContract",
    label: "Token Contract",
  },
  {
    id: "ipfsurl",
    label: "Certificate",
  },
  {
    id: "claimed",
    label: "Claimed",
  },
  { id: "tokenId", label: "TokenId" },
  { id: "type", label: "Type" },
];

function Collectors() {
  const params = useParams();
  const fireDataContext = React.useContext(firebaseDataContext);
  const { claim, getClaimers } = fireDataContext;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [collectors, setCollectors] = React.useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getClaimers(params.token);
  }, [params.token]);

  useEffect(() => {
    setCollectors(claim);
  }, [claim]);

  const getUserSMetadata = async (url) => {
    let d = await axios.get(url);
    console.log(d, "d");
  };

  return (
    <div className="footer-position">
      {/* <div className="container">
        <div className="row"> */}
      <div className="col-6 mt-4 mb-5">
        <h2 className="block-title__title">
          <span>Claimers</span>
        </h2>
      </div>
      <div className="col-lg-12 mb-5">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {collectors
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableRowComponent
                              event={params.token}
                              id={column.id}
                              value={value}
                              url={row.ipfsurl}
                              index={index}
                            />
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 50]}
            component="div"
            count={claim.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
      {/* </div>
      </div> */}
    </div>
  );
}

export default Collectors;
