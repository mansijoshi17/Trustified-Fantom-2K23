import { Button, Divider, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import Draggable from "react-draggable";
import "./custom.css";
import { EditText, EditTextarea } from 'react-edit-text';
import { NFTStorageContext } from "../context/NFTStorageContext";


function Temp3() {
    const value = useContext(NFTStorageContext);
    const formdata = value.labelInfo.formData;
    const [logo, setLogo] = useState("");
    const [signature, setSignature] = useState("");

    const handleImageChange = (e) => {
        const image = e.target.files[0];
        setLogo(URL.createObjectURL(image)) 
    }
    const handleSignature = (e) => {
        const image = e.target.files[0];
        setSignature(URL.createObjectURL(image)) 
    }

    return (
        <> 
            <div id="divTotemp3" className="temp-bg3-cert mt-3 mb-3 pb-3">
                <div className="container">
                    <div className="row">
                        <div className="col text-center">

                            <EditText
                                name="textbox1"
                                defaultValue="certificate"
                                className="temp3-top-text"
                            />
                            <EditText
                                name="textbox1"
                                defaultValue="of appreciation"
                                className="temp3-top-sub"
                            />
                            <EditText
                                name="textbox1"
                                defaultValue=" this awarded to certify that"
                                className="temp-middle-text"
                            />
                            <EditText
                                id="certName"
                                name="textbox1"
                                defaultValue="Jaydip Patel"
                                className="temp3-middle-name"
                            />
                           <div style={{width:'80%', margin:'10px auto'}}>
                           <EditTextarea
                                name='description'
                                rows={2}
                                defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in massa imperdiet. pellentesque id nisi. Nulla posuere rutrum nulla non vulputate. "
                                className="temp3-description mt-2"
                            />
                           </div>
                            <div className="d-flex " style={{justifyContent:'space-evenly',alignItems:'center'}}>
                            <p id="validity" className="temp1-description">10 Feb 2023</p>
                                <input
                                    id="upload-button"
                                    style={{ display: "none" }}
                                    onChange={(e) => handleImageChange(e)}
                                    hidden accept="image/*" multiple type="file" />
                                <label htmlFor="upload-button" style={{cursor:'pointer'}}>
                                    <img src={logo ? logo : '/images/cert2.png'} width="100" height="100" />
                                </label> 
                                <input id="upload-sign"
                                    style={{ display: "none" }}
                                    onChange={(e) => handleSignature(e)}
                                    hidden accept="image/*" multiple
                                    type="file" />
                                <label htmlFor="upload-sign" style={{cursor:'pointer'}}>
                                    <img src={signature ? signature : '/templates/signature.png'} width="100" height="30" />
                                </label>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
             
        </>
    );
}

export default Temp3;
