import Axios from "axios";
import { useEffect, useState } from "react";
import "../assets/styles/CarOut.css";

function CarOut() {
  const [parkingSpace, setParkingSpace] = useState([]);
  const [willCheckOut, setWillCheckOut] = useState(0);

  const fetchParkingSpace = () => {
    Axios.get("http://localhost:2000/parkingSpace")
      .then((res) => {
        setParkingSpace(res.data);
      })
      .catch((err) => console.log(err));
  };

  const markingCheckOut = (val) => {
    if (val.filled) {
      alert(val.id);
      Axios.patch(`http://localhost:2000/parkingSpace/${val.id}`, {
        willCheckOut: true,
      })
        .then(() => {
          fetchParkingSpace();
        })
        .catch((err) => console.log(err));
      setWillCheckOut(val.id);
    } else {
      alert("nor");
    }
  };

  const checkOut = (id) => {
    Axios.patch(`http://localhost:2000/parkingSpace/${id}`, {
      filled: false,
      hour: 0,
      willCheckOut: false,
    }).then(() => {
      fetchParkingSpace();
    });
  };

  const renderParkingSpace = () => {
    return parkingSpace.map((val) => {
      return (
        <div
          className={`parkingUnit filled-${val.filled} checkout-${val.willCheckOut}`}
          onClick={() => markingCheckOut(val)}
        >
          <p>{val.id}</p>
        </div>
      );
    });
  };

  useEffect(() => {
    fetchParkingSpace();
  }, []);

  return (
    <div className="carOut">
      <div className="parkingSpace">{renderParkingSpace()}</div>
      <button className="btn-out" onClick={() => checkOut(willCheckOut)}>
        Check Out Car
      </button>
    </div>
  );
}

export default CarOut;
