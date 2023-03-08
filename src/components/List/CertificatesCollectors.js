import * as React from "react";
import Paper from "@mui/material/Paper";
import { firebaseDataContext } from "../../context/FirebaseDataContext";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import Chip from "@mui/material/Chip";
import Iconify from "../../components/utils/Iconify";
import Tooltip from "@mui/material/Tooltip";

export default function Certificates({data}) {
  const [certificates, setCertificates] = React.useState([]);

  React.useEffect(() =>{
    setCertificates(data)
  },[data])

  console.log(certificates);

  return (
    <>
      {certificates.map((item, i) => {
        return (
          <div key={i} className="col-lg-3 col-md-4 col-sm-6 col-12">
            <Paper className="certificatesCard">
              <img
                className="certificate"
                src={item?.ipfsurl?.replace(
                  "ipfs://",
                  "https://nftstorage.link/ipfs/"
                )}
                alt={item.name}
              />

              <span className="certificateDescription"> {item.name}</span>
            </Paper>
          </div>
        );
      })}
    </>
  );
}
