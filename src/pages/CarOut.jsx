import Axios from "axios";
import { useEffect, useState } from "react";
import "../assets/styles/CarOut.css";

function CarOut() {
  const [parkingSpace, setParkingSpace] = useState([]);
  const [willCheckOut, setWillCheckOut] = useState({});
  const [checkOutHour, setCheckOutHour] = useState(0);

  const fetchParkingSpace = () => {
    Axios.get("http://localhost:2000/parkingSpace")
      .then((res) => {
        setParkingSpace(res.data);
      })
      .catch((err) => console.log(err));
  };

  const renderParkingSpace = () => {
    return parkingSpace.map((val) => {
      return val.id === willCheckOut.id ? (
        <>
          <div
            className={`parkingUnit filled-${val.filled} willCheckout`}
            id={`park-${val.id}`}
            onClick={() => (val.filled ? setWillCheckOut(val) : null)}
          >
            <p>{val.id}</p>
          </div>
        </>
      ) : (
        <>
          <div
            className={`parkingUnit filled-${val.filled}`}
            id={`park-${val.id}`}
            onClick={() => (val.filled ? setWillCheckOut(val) : null)}
          >
            <p>{val.id}</p>
          </div>
        </>
      );
    });
  };

  const displayPayment = () => {
    document.querySelector(".payment-details").classList.toggle("hide-display");
    console.log(willCheckOut);
  };

  const cancelCheckOut = () => {
    document.querySelector("#hour").value = "";
    document.querySelector(".fee").innerHTML = "";
    setWillCheckOut({});
    document.querySelector(".payment-details").classList.toggle("hide-display");
    document.querySelector(".btn-checkout").classList.toggle("hide-display");
    document
      .querySelector(".btn-generate-payment")
      .classList.toggle("hide-display");
  };

  const generatePayment = (hour) => {
    let fee = 5000;
    if (hour > 2) {
      //max 24 hours?
      fee += (hour - 2) * 7000;
      if (fee > 75000) {
        fee = 75000;
      }
    }

    document.querySelector(".fee").innerHTML = `Rp ${fee}`;
    document.querySelector(".btn-checkout").classList.toggle("hide-display");
    document
      .querySelector(".btn-generate-payment")
      .classList.toggle("hide-display");
  };

  const checkOut = (id) => {
    Axios.patch(`http://localhost:2000/parkingSpace/${id}`, {
      filled: false,
      timeFilled: "",
      dateFilled: "",
      hour: 0,
    }).then(() => {
      Axios.post("http://localhost:2000/history", {
        ...willCheckOut,
      }).then(() => {
        setWillCheckOut({});
        fetchParkingSpace();
        cancelCheckOut();
      });
    });
  };

  useEffect(() => {
    fetchParkingSpace();
  }, []);

  return (
    <div className="carOut">
      <div className="parkingSpace">{renderParkingSpace()}</div>
      <button className="btn-out" onClick={displayPayment}>
        Check Out Car
      </button>
      <div className="payment-details hide-display">
        <header>
          <p>------------------------------</p>
          <p className="ticket-title">CHECKOUT</p>
          <p>------------------------------</p>
        </header>
        <p id="parking-no">
          Parking no: P<span>{willCheckOut.id}</span>
        </p>
        <p id="time-come">{willCheckOut.timeFilled}</p>
        <p id="date-come">{willCheckOut.dateFilled}</p>
        <p>
          <label htmlFor="hour">Hour: </label>
          <input
            type="text"
            id="hour"
            onChange={(e) => setCheckOutHour(e.target.value)}
          />
        </p>
        <p className="fee"></p>
        <button onClick={cancelCheckOut}>Cancel</button>
        <button
          className="btn-generate-payment"
          onClick={() => (checkOutHour ? generatePayment(checkOutHour) : null)}
        >
          Generate Payment
        </button>
        <button
          className="btn-checkout hide-display"
          onClick={() => checkOut(willCheckOut.id)}
        >
          Check Out Car
        </button>
      </div>
    </div>
  );
}

export default CarOut;
