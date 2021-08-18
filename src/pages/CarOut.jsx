import Axios from "axios";
import { useEffect, useState } from "react";
import "../assets/styles/CarOut.css";

function CarOut() {
  const [parkingSpace, setParkingSpace] = useState([]);
  const [willCheckOutId, setWillCheckOutId] = useState(0);

  const fetchParkingSpace = () => {
    Axios.get("http://localhost:2000/parkingSpace")
      .then((res) => {
        setParkingSpace(res.data);
      })
      .catch((err) => console.log(err));
  };

  // const markingCheckOut = (val) => {
  //   if (willCheckOut != 0) {
  //     document
  //       .querySelector(`#park-${willCheckOut}`)
  //       .classList.toggle("willCheckout");
  //   }

  //   if (val.filled) {
  //     Axios.patch(`http://localhost:2000/parkingSpace/${val.id}`, {
  //       willCheckOut: true,
  //     })
  //       .then(() => {
  //         setWillCheckOut(val.id);
  //         fetchParkingSpace();
  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //     alert("nor");
  //   }
  // };

  const checkOut = (id) => {
    Axios.patch(`http://localhost:2000/parkingSpace/${id}`, {
      filled: false,
      hour: 0,
      willCheckOut: false,
    }).then(() => {
      setWillCheckOutId(0);
      fetchParkingSpace();
    });
  };

  const renderParkingSpace = () => {
    return parkingSpace.map((val) => {
      return val.id === willCheckOutId ? (
        <>
          <div
            className={`parkingUnit filled-${val.filled} willCheckout`}
            id={`park-${val.id}`}
            onClick={() => (val.filled ? setWillCheckOutId(val.id) : null)}
          >
            <p>{val.id}</p>
          </div>
        </>
      ) : (
        <>
          <div
            className={`parkingUnit filled-${val.filled}`}
            id={`park-${val.id}`}
            onClick={() => (val.filled ? setWillCheckOutId(val.id) : null)}
          >
            <p>{val.id}</p>
          </div>
        </>
      );
    });
  };

  useEffect(() => {
    fetchParkingSpace();
  }, []);

  return (
    <div className="carOut">
      <div className="parkingSpace">{renderParkingSpace()}</div>
      <button className="btn-out" onClick={() => checkOut(willCheckOutId)}>
        Check Out Car
      </button>
    </div>
  );
}

export default CarOut;
