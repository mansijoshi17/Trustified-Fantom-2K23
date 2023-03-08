import { Divider, Typography } from "@mui/material";
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { data } from "../components/utils/BadgeTemplates";
import "./badge.css";
import { Button, Paper, Chip } from "@mui/material";
import { firebaseDataContext } from "../context/FirebaseDataContext";
import Iconify from "../components/utils/Iconify";

const Badges = () => {
  const navigate = useNavigate();
  const firebaseContext = React.useContext(firebaseDataContext);
  const { getNFTCollections, badgesData, generateClaimersExcellSheet } =
    firebaseContext;

  const [badges, setBadges] = React.useState([]);

  const navigateTo = (id) => {
    navigate(`/dashboard/collectors/${id}`);
  };

  useEffect(() => {
    getNFTCollections();
  }, []);

  useEffect(() => {
    setBadges(badgesData);
  }, [badgesData]);

  return (
    <>
      {badges.map((item, i) => {
        return (
          <div
            key={i}
            className="col-lg-3 col-md-4 col-sm-6 col-12"
            onClick={() => navigateTo(item.eventId)}
          >
            <Paper className="badgeCard" sx={{ borderRadius: "2em" }}>
              <img
                className="badgeItem m-auto m-2"
                src={item?.ipfsUrl?.replace(
                  "ipfs://",
                  "https://nftstorage.link/ipfs/"
                )}
                alt={item.name}
              />

              <span className="badgeDescription"> {item.name}</span>
              <span className="optionspan">
                <Chip
                  label={item.issueDate}
                  color="primary"
                  variant="outlined"
                />
                <Iconify
                  icon="mdi:download-circle-outline"
                  width={30}
                  height={30}
                  onClick={(e) => {
                    e.stopPropagation();
                    generateClaimersExcellSheet(item.eventId, item.name);
                  }}
                />
              </span>
            </Paper>
          </div>
        );
      })}
    </>
  );
};

export default Badges;
