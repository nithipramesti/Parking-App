import Axios from "axios";
import { useEffect, useState } from "react";
import "../assets/styles/Status.css";

function Status() {
  const [parkingSpace, setParkingSpace] = useState([]);

  const fetchParkingSpace = () => {
    Axios.get("http://localhost:2000/parkingSpace")
      .then((res) => {
        setParkingSpace(res.data);
      })
      .catch((err) => console.log(err));
  };

  const renderTable = () => {
    return parkingSpace.map((val) => {
      return (
        <tr className={val.id % 2 ? "odd-row" : ""}>
          <td>P0{val.id}</td>
          <td>{val.filled ? "Filled" : "Empty"}</td>
          <td>{val.dateFilled ? val.dateFilled : "-"}</td>
          <td>{val.timeFilled ? val.timeFilled : "-"}</td>
        </tr>
      );
    });
  };

  useEffect(() => {
    fetchParkingSpace();
  }, []);

  return (
    <div className="status">
      <h1>Parking Status</h1>
      <table>
        <thead>
          <tr>
            <td className="table-no">Parking No.</td>
            <td className="table-status">Status</td>
            <td>Date arrived</td>
            <td>Time arrived</td>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </div>
  );
}

export default Status;
