import React, { useEffect, useRef, useState } from "react";
import "../css/Payments.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";
import api from "../api";
import { FaStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
function Payments() {
  const [userAddress, setUserAddress] = useState([]);
  const [product, setProduct] = useState({});
  const [quantity, setquantity] = useState(1);
  const [PaymentId, setPaymentId] = useState("");
  const [displayQR, setDisplayQR] = useState(false);
  const [Success, setSuccess] = useState(false);
  const [totel, setTotel] = useState(0);
  const params = useParams();
  const CODbtnRef = useRef();
  const UPIbtnRef = useRef();
  const navigate = useNavigate();

  async function getDefault() {
    try {
      const res = await api.get("/api/getdefaultaddress/");

      setUserAddress(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function setOrderUPI(e) {
    e.preventDefault();
    try {
      const res = await api.post("/api/setorder/", {
        payment_id: PaymentId,
        payment_type: "UPI",
        product_id: product.id,
        quantity: quantity,
        totel_amount: totel,
      });
      console.log(res);
      if (res.status === 201) {
        setDisplayQR(false);
        setSuccess(true);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function setOrderCOD() {
    try {
      const res = await api.post("/api/setorder/", {
        payment_id: PaymentId,
        payment_type: "Cash On Delivery",
        product_id: product.id,
        quantity: quantity,
        totel_amount: totel,
      });
      console.log(res);

      if (res.status === 201) {
        setSuccess(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function setAmount() {
    if (!product.price) return;
    const a =
      Math.floor(product.price - (product.descount / 100) * product.price) *
      quantity;
    setTotel(a);
  }
  async function getProduct() {
    try {
      const res = await api.get(`/products/getProduct/${params.id}/`);
      setProduct(res.data);
    } catch (err) {
      navigate("/notfound");
    }
  }
  useEffect(() => {
    getDefault();
    getProduct();
  }, []);

  useEffect(() => {
    setAmount();
    if (quantity <= 0 || userAddress.length <= 0) {
      CODbtnRef.current.disabled = true;
      UPIbtnRef.current.disabled = true;
    } else {
      UPIbtnRef.current.disabled = false;
      CODbtnRef.current.disabled = false;
    }
  }, [product, quantity, userAddress]);

  return (
    <div className="payment-wrapper">
      {displayQR ? (
        <div className="upi-order">
          <div className="payment-card">
            <div className="instrections">
              <IoClose className="close" onClick={() => setDisplayQR(false)} />
              <h3>confirm your Payment </h3>
              <p>
                <span>Step 1:</span> Open your UPI app and scan the QR code.
              </p>
              <p>
                <span>Step 2:</span> Enter the exact amount shown and complete
                the payment.
              </p>
              <p>
                <span>Step 3:</span> CAfter successful payment, copy the
                Transaction ID (UTR number).
              </p>
              <p>
                <span>Step 4:</span> Paste the Transaction ID below and click
                Proceed to confirm your order.
              </p>
              <p className="alert">
                <span>Note : </span>Make sure the payment is successful before
                submitting the Transaction ID. Orders will not be processed
                without a valid UTR number / Transaction ID.
              </p>
              <form className="payment-input" onSubmit={(e) => setOrderUPI(e)}>
                <h2>Totel : {totel} inr</h2>
                <input
                  type="text"
                  required
                  className="text-input"
                  placeholder="Enter UTR / Transaction ID"
                  value={PaymentId}
                  onChange={(e) => setPaymentId(e.target.value)}
                />
                <input type="submit" className="payment-btn" value="Proceed" />
              </form>
            </div>
            <div className="qr-code">
              <img src="/qr.jpeg" alt="qr" width={"100px"} />
            </div>
          </div>
        </div>
      ) : null}

      {Success ? (
        <div className="success-note">
          <div className="note">
            <Link to={"/"}>
              <IoClose className="close" />
            </Link>
            <div className="success-img">
              <img src="/delivery_boy.png" alt="success" width={"100px"} />
              <h1>Order successful</h1>
              <p>your package is on the way</p>
            </div>
            <div className="ordered-product">
              <img src={product.image} alt="" width={"50px"} />
              <div className="ordered-product-details">
                <h5>{product.title}</h5>
                <p>{product.color}</p>
                <p>Quantity : {quantity}</p>
              </div>
            </div>
            <button>Track Your order</button>
          </div>
        </div>
      ) : null}
      <Navbar></Navbar>
      <div className="payment-container">
        <div className="left-slide">
          <div className="delivery-to">
            <p style={{ textTransform: "uppercase", fontWeight: "bold" }}>
              delivery To :
            </p>
            {userAddress.length <= 0 ? (
              <div className="address-card">
                <h4>You don't have any default address</h4>
                <Link to={"/myaddress"}>
                  <button className="set-address">set Address</button>
                </Link>
              </div>
            ) : (
              userAddress.map((item) => (
                <div key={item.id} className="address-card">
                  <Link to={"/myaddress"} className="active">
                    Change
                  </Link>

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
              ))
            )}
          </div>
          <>
            <p
              style={{
                textTransform: "uppercase",
                fontWeight: "bold",
                width: "100%",
              }}
            >
              Product :
            </p>
            <div className="selected-product">
              <img src={product.image} alt="" width={"50px"} />
              <div className="details">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p className="payment-product-color">{product.color}</p>
                <p className="payment-product-ratting">
                  {[...Array(5)].map((item, i) => (
                    <FaStar
                      className={product.ratting > i ? "span" : ""}
                      key={i}
                    />
                  ))}
                </p>
                <h5>
                  <span>{Math.floor(product.price) * quantity}</span>/
                  {Math.floor(
                    product.price - (product.descount / 100) * product.price,
                  ) * quantity}
                </h5>
                <div className="payment-product-quantity quntity">
                  <p onClick={() => setquantity((pre) => pre + 1)}>
                    <FaPlus></FaPlus>
                  </p>
                  <h3>{quantity}</h3>
                  <p
                    onClick={() =>
                      quantity > 0 ? setquantity((pre) => pre - 1) : null
                    }
                  >
                    <FaMinus></FaMinus>
                  </p>
                </div>
              </div>
            </div>
          </>
        </div>
        <div className="right-slide">
          <div className="payment-bill">
            <div className="mrp">
              <p>MRP</p>
              <p>{Math.floor(product.price) * quantity}</p>
            </div>
            <div className="platform-fee">
              <p>Platform fee</p>
              <p>10</p>
            </div>
            <div className="descount">
              <p>Descount</p>
              <p>
                -
                {Math.floor((product.descount / 100) * product.price) *
                  quantity}
              </p>
            </div>
            <div className="totel-amount">
              <p>Totel amount</p>
              <p>{totel + 10}</p>
            </div>
            <p className="bill-footer">
              You'll save
              <span>
                <FaRupeeSign />
                {Math.floor((product.descount / 100) * product.price) *
                  quantity}
              </span>
              on this order !
            </p>
          </div>
          <div className="payment-options">
            <div>
              <p>UPI</p>
              <button ref={UPIbtnRef} onClick={() => setDisplayQR(true)}>
                Palce Order
              </button>
            </div>
            <div>
              <p>cash on delivery</p>
              <button
                ref={CODbtnRef}
                onClick={() => {
                  setOrderCOD();
                }}
              >
                Palce Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payments;
