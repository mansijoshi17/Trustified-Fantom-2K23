import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  IconButton,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
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

function Profile() {
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
  },[])

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
    <div className="footer-position">
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-6 mx-auto">
            <h3>User Profile</h3>
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
                  <Typography color="textPrimary" gutterBottom variant="h5">
                    @{data ? data.UserName : "username"}
                  </Typography>
                  <Typography color="textSecondary" variant="h6">
                    {data && shortAddress(data.Address)}
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    {data ? data.Bio : "Bio"}
                  </Typography>
                </Box>
              </CardContent>
              <Divider />
              <CardActions>
                <Button
                  color="primary"
                  fullWidth
                  variant="text"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </Button>
              </CardActions>
            </Card>
            {open && (
              <div className="mt-5">
                <h3>Edit Profile</h3>
                <Card sx={{ border: "1px solid #eee" }}>
                  <CardContent>
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
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={updateProfile}
                    >
                      Update Profile
                    </Button>
                  </CardActions>
                </Card>
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <MyCollection show={true}></MyCollection>
        </div>
      </div>
    </div>
  );
}

export default Profile;
