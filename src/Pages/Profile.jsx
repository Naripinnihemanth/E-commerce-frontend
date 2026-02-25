import React, { useEffect, useState } from "react";
import api from "../api";
import { ACCESS_TOKEN } from "../constents";
import { jwtDecode } from "jwt-decode";
import "../css/Profile.css";
import Footer from "../Components/Footer";
function Profile() {
  const [img, setImg] = useState();
  const [bio, setBio] = useState();

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
    <div className="Profile-container">
      <div className="headder">
        <h1>my account</h1>
      </div>
      <div className="profile-wrapper">
        <div className="profile-content">
          {userImg.map((item, i) => (
            <img
              src={item.profile}
              alt="error"
              width={"100px"}
              height={"100px"}
              key={i}
            />
          ))}
          <h1>{userData.first_name}</h1>
        </div>
      </div>
      <Footer></Footer>
      <div>
        {/* <form
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
        </form> */}
      </div>
    </div>
  );
}

export default Profile;
