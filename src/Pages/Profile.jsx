import React, { useEffect, useState } from "react";
import api from "../api";
import { ACCESS_TOKEN } from "../constents";
import { jwtDecode } from "jwt-decode";
function Profile() {
  const [img, setImg] = useState();
  const [bio, setBio] = useState();
  const [userData, setUserData] = useState([]);

  async function getData() {
    try {
      setUserData([]);
      const res_data = await api.get(`/api/getProfile/`);
      console.log(res_data.data);
      setUserData(res_data.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function postData(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profile", img);
    formData.append("bio", bio);

    try {
      const res = await api.post("/api/setProfile/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <form
        onSubmit={(e) => {
          postData(e);
        }}
      >
        <label htmlFor="profile">select profile pic:</label>
        <input
          type="file"
          name="profile"
          id="profile"
          onChange={(e) => {
            setImg(e.target.files[0]);
          }}
        />
        <br />
        <label htmlFor="bio">bio</label>
        <input
          type="text"
          id="bio"
          name="bio"
          onChange={(e) => {
            setBio(e.target.value);
          }}
        />
        <br />
        <input type="submit" value="submit" />
      </form>
      {userData.map((item) => (
        <img src={item.profile} alt="error" width={"100px"} height={"100px"} />
      ))}
    </div>
  );
}

export default Profile;
