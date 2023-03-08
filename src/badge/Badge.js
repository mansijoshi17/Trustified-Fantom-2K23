import { Divider, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { data } from '../components/utils/BadgeTemplates';
import { BadgeContext } from '../context/BadgeContext';
import "./badge.css";

 
const Badge1 = ({idd}) => {
    const value = useContext(BadgeContext);
    const formdata = value.labelInfo.formData;   
    return (
        <>
            {
                data.map((e,i) => { 
                    if(idd === e.id){
                        return (
                            <div key={e.id} className='col-12 text-center mt-5 mx-auto'>
                                  <h1  className='title'>{e.title}</h1>
                                <div id={`badgeToprint${e.id}`} className={`token2 m-2 bg${i} m-auto`} style={{ backgroundColor: `${e.color}` }}>
                                    <h1 id={`title${e.id}`} className={e.id > 5 ? "text-white" : ""} >{formdata.badgeName ? formdata.badgeName : e.title}</h1>
                                    <img id={`logo${e.id}`} src={value.uploadLogo ? value.uploadLogo : `/images/${e.img}`} alt="Etherenal 2021 Token" />
                                    <p id={`sub${e.id}`}  className={e.id > 5 ? "text-white sub" : "sub"}  >{formdata.name ? formdata.name : e.sub}</p>
                                </div>
                            </div>
                        )
                    }  
                })
            }
        </>
    );
};

export default Badge1;