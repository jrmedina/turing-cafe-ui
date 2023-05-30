import React from "react";
import "./ReservationCard.css";

const ReservationCard = ({ resData, handleDelete }) => {
    
  const { name, date, time, number, id } = resData;

  return (
    <div className="reservation-card" id={id}>
      <p className="reservation-details">
        <strong>{name}</strong>
        <br />
        {date}
        <br />
        <br />
        {time} pm
        <br />
        <br />
        Number of guests: {number}
        <br />
      </p>
      <button type="button" id={id} onClick={(e) => handleDelete(e.target.id)}>
        Cancel
      </button>
    </div>
  );
};

export default ReservationCard;
