import { PhotoCamera } from "@mui/icons-material";
import { Avatar, Badge, Box, Button, CardActions, CardContent, CircularProgress, Divider, IconButton, Input, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    query,
    where,
    getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { Web3Context } from "../../context/Web3Context";
import MyCollection from "../myCollection";

import { firebaseDataContext } from "../../context/FirebaseDataContext";
 
import {
    Card, 
    Container,
    Row,
    Col
} from "react-bootstrap"; 

function User() {

    const web3Context = React.useContext(Web3Context);
    const { shortAddress, data, setUpdate, update } = web3Context;
    const [open, setOpen] = useState(false);
    const [avatar, setAvatar] = useState(data ? data.Photo : "");
    const [loading, setLoading] = useState(false);
    const storage = getStorage();
    const [name, setName] = useState(data ? data.Name : "");
    const [userName, setUsername] = useState(data ? data.UserName : "");
    const [bio, setBio] = useState(data ? data.Bio : "");

    const firebaseContext = React.useContext(firebaseDataContext);
    const { getMyCollection } = firebaseContext;

    useEffect(() => {
        getMyCollection();
    }, [])

    const handleEditProfile = () => {
        setOpen(!open);
    };

    async function onChangeAvatar(e) {
        setLoading(true);
        const file = e.target.files[0];
        const storageRef = ref(storage, `Photo/${file.name}`);
        uploadBytes(storageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setAvatar(url);
            });
        });
        setLoading(false);
    }

    const updateProfile = async () => {
        const add = window.localStorage.getItem("address");
        const data = {
            Name: name,
            UserName: userName,
            Bio: bio,
            Photo: avatar,
            Address: add,
            CreatedAt: new Date(),
        };
        const q = query(collection(db, "UserProfile"), where("Address", "==", add));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            addDoc(collection(db, "UserProfile"), data);
            setUpdate(!update);
            toast.success("Profile successfully Added!!");
        } else {
            querySnapshot.forEach((fire) => { 
                const data = {
                    Name: name !== "" ? name : fire.data().Name,
                    UserName: userName !== "" ? userName : fire.data().UserName,
                    Bio: bio !== "" ? bio : fire.data().Bio,
                    Photo: avatar !== "" ? avatar : fire.data().Photo,
                    Address: add,
                    UpdatedAt: new Date(),
                };
                const dataref = doc(db, "UserProfile", fire.id);
                updateDoc(dataref, data);
                setUpdate(!update);
                toast.success("Profile successfully updated!!");
            });
        }
    };
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="8">
                        <Card >
                            <Card.Header>
                                <Card.Title as="h4">Edit Profile</Card.Title>
                            </Card.Header>
                            <Card.Body style={{ padding: '20px' }} >
                                <Box
                                    sx={{
                                        alignItems: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        spacing={3}
                                        style={{ justifyContent: "center", display: "flex" }}
                                    >
                                        <Badge
                                            overlap="circular"
                                            anchorOrigin={{
                                                vertical: "bottom",
                                                horizontal: "right",
                                            }}
                                            badgeContent={
                                                <label htmlFor="icon-button-file">
                                                    <Input
                                                        onChange={(e) => onChangeAvatar(e)}
                                                        className="d-none"
                                                        accept="image/*"
                                                        id="icon-button-file"
                                                        type="file"
                                                    />
                                                    <IconButton
                                                        color="primary"
                                                        aria-label="upload picture"
                                                        component="span"
                                                    >
                                                        <PhotoCamera />
                                                    </IconButton>
                                                </label>
                                            }
                                        >
                                            <Avatar
                                                sx={{ width: 100, height: 100 }}
                                                src={
                                                    loading ? (
                                                        <CircularProgress />
                                                    ) : avatar ? (
                                                        avatar
                                                    ) : (
                                                        "/images/log.png"
                                                    )
                                                }
                                            />
                                        </Badge>
                                    </Stack>

                                    <Typography
                                        color="textSecondary"
                                        variant="body"
                                        style={{
                                            border: "1px solid #eee",
                                            padding: "3px 15px",
                                            borderRadius: "20px",
                                            fontWeight: "bolder",
                                            color: "black",
                                            width: "fit-content",
                                            marginTop: "20px",
                                        }}
                                    >
                                        {data && shortAddress(data.Address)}
                                    </Typography>

                                    <TextField
                                        sx={{ m: 2 }}
                                        id="outlined-multiline-flexible"
                                        label="Name"
                                        name="name"
                                        type="text"
                                        defaultValue={data?.Name ? data?.Name : "Name"}
                                        onChange={(e) => setName(e.target.value)}
                                        fullWidth
                                    />
                                    <TextField
                                        sx={{ m: 2 }}
                                        id="outlined-multiline-flexible"
                                        label="Username"
                                        name="username"
                                        type="text"
                                        onChange={(e) => setUsername(e.target.value)}
                                        defaultValue={
                                            data?.UserName ? data?.UserName : "@username"
                                        }
                                        fullWidth
                                    />
                                    <TextField
                                        sx={{ m: 2 }}
                                        id="outlined-multiline-flexible"
                                        label="Bio"
                                        name="bio"
                                        type="text"
                                        onChange={(e) => setBio(e.target.value)}
                                        defaultValue={data?.Bio ? data?.Bio : "Bio"}
                                        fullWidth
                                    />
                                </Box>
                            </Card.Body>
                            <Card.Footer>

                                <a className="thm-btn header__cta-btn" onClick={updateProfile}>
                                    <span> Save Profile</span>
                                </a>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card sx={{ border: "1px solid #eee" }}>
                            <CardContent>
                                <Box
                                    sx={{
                                        alignItems: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Avatar
                                        src={data && data.Photo}
                                        sx={{
                                            height: 100,
                                            mb: 2,
                                            width: 100,
                                        }}
                                    />
                                    <Typography
                                        color="textSecondary"
                                        variant="body"
                                        style={{
                                            border: "1px solid #eee",
                                            padding: "3px 15px",
                                            borderRadius: "20px",
                                            fontWeight: "bolder",
                                            color: "black",
                                            width: "fit-content",
                                            marginTop: "20px",
                                        }}
                                    >
                                        {data && shortAddress(data.Address)}
                                    </Typography>


                                    <div style={{
                                        margin: '20px',
                                        textAlign: 'center'
                                    }}>
                                        <h3>
                                            <a href="#none">
                                                {data ? data.UserName : "username"}
                                            </a>
                                        </h3>
                                        <p>
                                            {data ? data.Bio : "Bio"}
                                        </p>
                                    </div>
                                </Box>
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <MyCollection show={true}></MyCollection>
                </Row>
            </Container>
        </>
    );
}

export default User;