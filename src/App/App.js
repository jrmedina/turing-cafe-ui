import React, { useEffect, useState } from "react";
import ReservationCard from "../ReservationCard/ReservationCard";
import "./App.css";

const App = () => {
  const [reservations, setReservations] = useState();
  const [newResy, setNewResy] = useState();

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/reservations")
      .then((res) => res.json())
      .then((data) => setReservations(data));
  }, []);

  const handleChange = (e) => {
    let { id, value } = e.target;

    if (id === "number") {
      value = Number(value);
    }

    setNewResy({ ...newResy, [id]: value });
  };

  const handleSubmit = () => {
    fetch("http://localhost:3001/api/v1/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newResy),
    })
      .then((res) => res.json())
      .then((data) => setReservations([...reservations, data]))
      .finally(setNewResy());
  };

  const handleDelete = (id) => {
    const updatedReservations = reservations.filter(
      (res) => res.id !== Number(id)
    );

    fetch(`http://localhost:3001/api/v1/reservations/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => setReservations(updatedReservations));
  };

  const resos =
    reservations &&
    reservations.map((res) => (
      <ReservationCard key={res.id} resData={res} handleDelete={handleDelete} />
    ));

  return (
    <div className="App">
      <h1 className="app-title">Turing Cafe Reservations</h1>
      <form className="resy-form" onChange={handleChange}>
        <input type="text" id="name" placeholder="Name" />
        <input type="text" id="date" placeholder="Date (mm/dd)" />
        <input type="text" id="time" placeholder="Time" />
        <input type="number" id="number" placeholder="Number of Guests" />
        <button type="button" className="resy-button" onClick={handleSubmit}>
          Make Reservation
        </button>
      </form>
      <div className="resy-container">{resos}</div>
    </div>
  );
};

export default App;
