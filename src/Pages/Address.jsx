import React, { useEffect, useRef, useState } from "react";
import "../css/Address.css";
import api from "../api";
import axios from "axios";
import Message from "../Components/Message";
function Address() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [primaryNumber, setPrimaryNumber] = useState("");
  const [alterNumber, setAlterNumber] = useState();
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pinCodeData, setPinCodeData] = useState([]);
  const [pinCodeStatus, setPinCodeStatus] = useState(null);
  const [loading, setloading] = useState(false);
  const [UserAddrss, setUserAddrss] = useState([]);
  const [message, setMessage] = useState("");

  const pinCodeRef = useRef(null);

  async function getAddress() {
    try {
      const res = await api.get("/api/getaddress/");
      if (res.status === 200) {
        setUserAddrss(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function setDefault(a, v) {
    try {
      const res = await api.patch(`/api/setdefaultaddress/${a}/`, {
        default: v,
      });
      getAddress();
    } catch (err) {
      console.log(err);
    }
  }

  async function postAddress(e) {
    e.preventDefault();
    try {
      setloading(true);
      pinCodeRef.current.disabled = true;
      const res = await axios.get(
        `https://api.postalpincode.in/pincode/${pinCode}`,
      );
      if (res.data[0].Status === "Success") {
        setPinCodeData(res.data[0].PostOffice);
        setPinCodeStatus(true);
        setState(res.data[0].PostOffice[0].State);
        setCountry(res.data[0].PostOffice[0].Country);
      } else {
        setPinCodeStatus(false);
        setPinCodeData([]);
      }
      pinCodeRef.current.disabled = false;
      setloading(false);
    } catch (err) {
      console.log(err);
      pinCodeRef.current.disabled = false;
      setloading(false);
    }
  }
  async function setAddress() {
    try {
      const res = await api.post("/api/setaddress/", {
        first_name: firstName,
        last_name: lastName,
        primary_nummber: primaryNumber,
        alter_nummber: alterNumber,
        address_line_one: addressOne,
        address_line_two: addressTwo,
        city: city,
        state: state,
        Country: country,
        pin_code: pinCode,
        default: false,
      });
      if (res.status === 201) {
        setfirstName("");
        setLastName("");
        setPrimaryNumber("");
        setAlterNumber();
        setCity("");
        setCountry("");
        setAddressOne("");
        setAddressTwo("");
        setState("");
        setPinCode("");
        getAddress();
        setMessage("Address saved !");
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getAddress();
  }, []);
  return (
    <div className="address-container">
      {message != "" ? <Message msg={message} /> : null}
      <div className="header">
        <h1>My address</h1>
        <p>Home / Profile / My address</p>
      </div>
      <div className="saved-address-container">
        <h1> Saved Addresses</h1>
        <div className="address-card-wrapper">
          {UserAddrss.map((item) => (
            <div className="address-card" key={item.id}>
              {/* {item.default ? (
                <div className="address-default">Default</div>
              ) : null} */}

              <button
                onClick={() => {
                  setDefault(item.id, !item.default);
                }}
                className={item.default ? "active" : "inactive"}
              >
                {item.default ? "default" : "set as default"}
              </button>

              <h3>{item.city}</h3>
              <p>
                <span>
                  {item.first_name} {item.last_name},
                </span>
                <br />
                {item.address_line_one},<br />
                {item.city}, {item.state}, {item.Country} - {item.pin_code}
              </p>
              <p>
                <span>Primary : </span>
                {item.primary_nummber}
              </p>
              <p>{item.alter_nummber}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="address-form">
        <h1>Add Address</h1>
        <div className="form">
          <form className="form-inputs">
            <div className="add-input">
              <label htmlFor="first-name">
                First Name<span>*</span> :{" "}
              </label>
              <input
                type="text"
                id="first-name"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
                required
              />
            </div>
            <div className="add-input">
              <label htmlFor="last-name">
                Last Name<span>*</span> :{" "}
              </label>
              <input
                type="text"
                id="last-name"
                placeholder="Last Name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="add-input">
              <label htmlFor="primary-number">
                Primary Number<span>*</span> :{" "}
              </label>
              <input
                type="number"
                id="primary-number"
                placeholder="Phone"
                required
                value={primaryNumber}
                onChange={(e) => setPrimaryNumber(e.target.value)}
              />
            </div>
            <div className="add-input">
              <label htmlFor="alter-number">Alternative Number : </label>
              <input
                type="number"
                id="alter-number"
                placeholder="Phone"
                value={alterNumber}
                onChange={(e) => setAlterNumber(e.target.value)}
              />
            </div>
            <div className="add-input">
              <label htmlFor="address-one">
                Address line 1<span>*</span> :{" "}
              </label>
              <input
                type="text"
                id="address-one"
                placeholder="House No. / Door No. / ...."
                required
                value={addressOne}
                onChange={(e) => setAddressOne(e.target.value)}
              />
            </div>
            <div className="add-input">
              <label htmlFor="address-two">Address line 2 : </label>
              <input
                type="text"
                id="address-two"
                placeholder="Land Marks."
                value={addressTwo}
                onChange={(e) => setAddressTwo(e.target.value)}
              />
            </div>
            <div className="add-input">
              <label htmlFor="pin-code">
                Pin code<span>*</span> :{" "}
              </label>
              <div>
                <input
                  ref={pinCodeRef}
                  type="number"
                  id="pin-code"
                  placeholder="Eg : 534199"
                  onChange={(e) => setPinCode(e.target.value)}
                  value={pinCode}
                  className={
                    pinCodeStatus === null
                      ? ""
                      : pinCodeStatus
                        ? "success"
                        : "error"
                  }
                  required
                />
                <button
                  className="login-btn"
                  onClick={(e) => postAddress(e)}
                  ref={pinCodeRef}
                >
                  {loading ? "verifying" : "Verify"}
                </button>
              </div>
            </div>
            <div className="add-input">
              <label htmlFor="city">
                City<span>*</span> :{" "}
              </label>
              <select
                name="city"
                id="city"
                required
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">
                  {pinCodeStatus == null || false
                    ? "--Pleace enter valid pin code--"
                    : "--select--"}
                </option>
                {pinCodeData.map((item, i) => (
                  <option value={item.Name} key={i}>
                    {item.Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="add-input">
              <label htmlFor="state">
                State<span>*</span> :{" "}
              </label>
              <input
                type="text"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
            <div className="add-input">
              <label htmlFor="country">
                Country<span>*</span> :{" "}
              </label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
          </form>
          <input
            type="submit"
            value="add"
            className="add-address-btn"
            onClick={setAddress}
          />
        </div>
      </div>
    </div>
  );
}

export default Address;
