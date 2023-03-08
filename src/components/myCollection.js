import {
  Button,
  CircularProgress,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Web3Context } from "../context/Web3Context";
import { firebaseDataContext } from "../context/FirebaseDataContext";
import axios from "axios";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MyCollection({ show }) {
  const firebaseContext = React.useContext(firebaseDataContext);
  const { myCollection } = firebaseContext;

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [badgesData, setbadgesData] = useState([]);
  const [certificatesData, setcertificatesData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let badges =
      myCollection.length > 0 && myCollection.filter((c) => c.type == "badge");
    badges.length > 0 && setbadgesData(badges);

    let certificates =
      myCollection.length > 0 &&
      myCollection.filter((c) => c.type == "certificate");
    certificates.length > 0 && setcertificatesData(certificates);
  }, [myCollection]);

  return (
    <div className="container collections">
      <div className="row">
        <div className="col">
          {myCollection.length > 0 && (
            <>
              <Typography
                variant="h5"
                component="h6"
                sx={{
                  fontWeight: 600,
                  margin: "10px",
                  textAlign: "center",
                }}
              >
                Your Collection
              </Typography>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="My Badges" {...a11yProps(0)} />
                <Tab label="My Certificates" {...a11yProps(1)} />
              </Tabs>
            </>
          )}

          <TabPanel value={value} index={0}>
            <div className="container collections">
              <div className="row">
                {badgesData.length != 0 &&
                  badgesData.map((e, i) => {
                    return (
                      <div
                        key={i}
                        className="col-12 col-lg-4 col-sm-6 col-md-4"
                      >
                        <div className="mt-4 template-card mb-4" style={{ display: "grid" }}>
                          <Typography
                            variant="h5"
                            component="a"
                            href={e.pdf.replace(
                              "ipfs://",
                              "https://nftstorage.link/ipfs/"
                            )}
                            target="_blank"
                            sx={{
                              textTransform: "uppercase",
                              fontWeight: 600,
                              color: "#84a8fb",
                              margin: "10px",
                              textDecoration: "none",
                            }}
                          >
                            {e.name}
                          </Typography>
                          <img
                            height="240"
                            width="100%"
                            className="claimBadge"
                            src={e.image.replace(
                              "ipfs://",
                              "https://nftstorage.link/ipfs/"
                            )}
                            alt={e.name}
                          />
                        </div>
                      </div>
                    );
                  })}
                {loading && <CircularProgress />}
                {badgesData.length === 0 && show == true && (
                  <div className="col">
                    <h4>No Collection!</h4>
                  </div>
                )}
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="row">
              {certificatesData.length != 0 &&
                certificatesData.map((e, i) => {
                  return (
                    <div key={i} className="col-12 col-lg-4 col-sm-6 col-md-4">
                      <div className="mt-4 template-card mb-4" style={{ display: "grid" }}>
                        <Typography
                          variant="body"
                          component="a"
                          href={e.pdf.replace(
                            "ipfs://",
                            "https://nftstorage.link/ipfs/"
                          )}
                          target="_blank"
                          sx={{
                            textTransform: "uppercase",
                            fontWeight: 600,
                            color: "#84a8fb",
                            margin: "20px",
                            textDecoration: "none",
                          }}
                        >
                          {e.name}
                        </Typography>
                        <img
                          height="240"
                          width="100%"
                          className="claimCertificate"
                          src={e.image.replace(
                            "ipfs://",
                            "https://nftstorage.link/ipfs/"
                          )}
                          alt={e.name}
                        />
                      </div>
                    </div>
                  );
                })}
              {loading && <CircularProgress />}
              {certificatesData.length === 0 && show == true && (
                <h4>No Collection!</h4>
              )}
            </div>
          </TabPanel>
        </div>
      </div>
    </div>
  );
}
