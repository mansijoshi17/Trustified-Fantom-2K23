import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { NFTStorageContext } from "../../../context/NFTStorageContext";
import { Templates } from "../../../Templates";
import Template1 from "../../../Templates/Template1";
import Template2 from "../../../Templates/Template2";
import Template3 from "../../../Templates/Template3";
import Template4 from "../../../Templates/Template4";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slider from "react-slick";

import CSVReader from "react-csv-reader";
import Draggable from 'react-draggable';
import Temp1 from "../../../Templates/Temp1";
import Temp2 from "../../../Templates/Temp2";
import Temp3 from "../../../Templates/Temp3";
import Temp4 from "../../../Templates/Temp4";

function GetTemplate() {
  const value = useContext(NFTStorageContext);
  const formdata = value.labelInfo.formData;
  const setCsvData = value.setCsvData;
  const [username, setUsername] = useState('Your username');

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    value.setPreviewUrl(URL.createObjectURL(image));
  }

  const onClose = () => {
    value.setPreviewUrl("");
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const tempData = [
    {
      name: "divTotemp1",
      img: "temp1.png"
    },
    {
      name: "divTotemp2",
      img: "temp2.png"
    },
    {
      name: "divTotemp3",
      img: "temp3.png"
    },
    {
      name: "divTotemp4",
      img: "temp4.png"
    }
  ];

  const handleSelectTemp = (name) => { 
    value.setTemplate(name) 
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Stack spacing={3} sx={{ margin: "20px" }}>

            {
              value.template === "" && <Box sx={{ m: 1 }}>
                <Button sx={{ m: 1, color: '#fff' }} variant="contained" component="label" >
                  Upload Your Certificate
                  <input onChange={(e) => handleImageChange(e)} hidden accept="image/*" multiple type="file" />
                </Button>
              </Box>
            }


            {value.previewUrl !== "" && <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
            }



            {value.previewUrl && (
              <div id="certificateX" >
                <img width="100%" height="auto" src={value.previewUrl} />
                <Draggable
                  position={value.usernamePos}
                  onStop={(e, data) => value.setUsernamePos({ x: data.x, y: data.y })}
                >
                  <div id="certText" style={{ position: 'absolute', color: 'red' }}>{username}</div>
                </Draggable>
              </div>
            )}

            {
              value.previewUrl === "" &&  value.template === "" && <Divider>
                <Chip label="OR" />
              </Divider>
            }


            <Slider {...settings}>
              {
                tempData.map((e, i) => {
                  return (
                    <div key={i} className="" onClick={() => handleSelectTemp(e.name)}>
                      <img src={`/images/${e.img}`} width="200" height="200" />
                    </div>
                  )
                })
              }

            </Slider> 
          </Stack>
        </div>
      </div>
      <div className="row">
        <div className="col-12">

          {value.template && value.template == "divTotemp1" && (
            <Temp1 />
          )}
          {value.template && value.template == "divTotemp2" && (
            <Temp2 />
          )}
            {value.template && value.template == "divTotemp3" && (
            <Temp3 />
          )}
          {value.template && value.template == "divTotemp4" && (
            <Temp4 />
          )}
        </div>
      </div>
    </div>
  );
}

export default GetTemplate;
