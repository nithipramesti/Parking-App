import Axios from "axios";
import { useEffect, useState } from "react";
import "../assets/styles/CarIn.css";

function CarIn() {
  const [parkingSpace, setParkingSpace] = useState([]);
  const [ticketDisplay, setTicketDisplay] = useState(false);

  const fetchParkingSpace = () => {
    Axios.get("http://localhost:2000/parkingSpace")
      .then((res) => {
        setParkingSpace(res.data);
      })
      .catch((err) => console.log(err));
  };

  const renderParkingSpace = () => {
    return parkingSpace.map((val) => {
      return (
        <div className={`parkingUnit filled-${val.filled}`}>
          <p>{val.id}</p>
        </div>
      );
    });
  };

  const findNearestSpace = () => {
    return parkingSpace.findIndex((val) => val.filled === false) + 1;
  };

  const generateTicket = (id) => {
    const timeCome = document.querySelector("#time-come");
    const dateCome = document.querySelector("#date-come");
    const parkingNo = document.querySelector("#parking-no span");

    // Time come
    const hourNow = new Date().getHours();
    const minuteNow = new Date().getMinutes();
    const secondNow = new Date().getSeconds();
    const timeComplete = `${hourNow}:${minuteNow}:${secondNow}`;
    timeCome.innerHTML = timeComplete;

    //Date come
    const dateNow = new Date().getDate();
    const monthNow = new Date().getMonth();
    const yearNow = new Date().getFullYear();
    const dateComplete = `${dateNow}/${monthNow + 1}/${yearNow}`;
    dateCome.innerHTML = dateComplete;

    //Parking slot no
    parkingNo.innerHTML = findNearestSpace();

    //fill the space
    Axios.patch(`http://localhost:2000/parkingSpace/${id}`, {
      filled: true,
      timeFilled: timeComplete,
      dateFilled: dateComplete,
    })
      .then(() => {
        fetchParkingSpace();
      })
      .catch((err) => console.log(err));

    //Displaying ticket
    setTicketDisplay(true);
  };

  useEffect(() => {
    fetchParkingSpace();
  }, []);

  return (
    <div className="carIn">
      <div className="parkingSpace">{renderParkingSpace()}</div>
      <button
        className="btn-ticket"
        onClick={() => generateTicket(findNearestSpace())}
      >
        Generate Ticket
      </button>
      <div className={`ticket display-${ticketDisplay}`}>
        <header>
          <p>------------------------------</p>
          <p className="ticket-title">PARKING TICKET</p>
          <p>------------------------------</p>
        </header>
        <p id="time-come">12:25:00</p>
        <p id="date-come">24//07/2021</p>
        <p id="parking-no">
          Parking no: P<span>6</span>
        </p>
        <button onClick={() => setTicketDisplay(false)}>Close</button>
      </div>
    </div>
  );
}

export default CarIn;
