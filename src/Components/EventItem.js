import { useState } from "react";
import StarRating from "./StarRating";
 

    function EventItem({ spice, onUpdateSpice, onDeleteSpice  }) {
        const { id, image, title, description, location, date, rating } = spice;
        const [isRead,setIsRead] =useState("true")

        function handleUpdateRating(pct) {
            const newRating = pct * 5;
            fetch(`/events/${id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ rating: newRating }),
            })
              .then((r) => r.json())
              .then(onUpdateSpice);
          }
        
          function handleBook() {
            setIsRead(!isRead)
            fetch(`/tickets`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({event_id:id}),
            }).then((r)=>r.json())
            .then(console.log)
          }

          function handleDeleteEvent() {
            fetch(`/events/${id}`, {
              method: "DELETE",
            }).then((r) => {
              if (r.ok) {
                onDeleteSpice(spice);
              }
            });
          }
        
        

    return (
        <div className="spice-item card">
        <img src={image} alt={title} />
        <div className="details">
          <h2>{title}</h2>
          <p>{description}</p>
          <p>
            Location: <em>{location}</em>
          </p>
          <p>
            Date: <em>{date}</em>
          </p>
          <div>
            Reviews:{" "}
            <StarRating percentage={rating / 5} onClick={handleUpdateRating} />
          </div>
          <p>
          <button className="btn" onClick={handleBook}>{isRead ? "BOOKED":"BOOK"}</button>
            <button className="btn" onClick={handleDeleteEvent}>Delete Event</button>
          </p>
        </div>
      </div>
    );
}

export default EventItem;