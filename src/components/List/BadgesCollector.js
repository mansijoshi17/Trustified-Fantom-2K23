import { Divider, Typography } from "@mui/material";
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Paper, Chip } from "@mui/material";
import Iconify from "../../components/utils/Iconify";
import { firebaseDataContext } from "../../context/FirebaseDataContext";

const Badges = ({ data }) => {
  const [badges, setBadges] = React.useState([]);

  useEffect(() => {
    setBadges(data);
  }, [data]);

  return (
    <>
      {badges.map((item, i) => {
        return (
          <div key={i} className="col-lg-3 col-md-4 col-sm-6 col-12">
            <Paper className="badgeCard" sx={{ borderRadius: "2em" }}>
              <img
                className="badgeItem m-auto m-2"
                src={item?.ipfsurl?.replace(
                  "ipfs://",
                  "https://nftstorage.link/ipfs/"
                )}
                alt={item.name}
              />

              <span className="badgeDescription"> {item.name}</span>
              <span className="optionspan">
                <a
                  target="_blank"
                  href={item?.ipfsurl?.replace(
                    "ipfs://",
                    "https://nftstorage.link/ipfs/"
                  )}
                >
                  Preview
                </a>
              </span>
            </Paper>
          </div>
        );
      })}
    </>
  );
};

export default Badges;
