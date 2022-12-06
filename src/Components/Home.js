import { useState, useEffect } from "react";
import NewEventForm from "./NewEventForm";
import EventItem from "./EventItem";
import ImageSlider from "./ImageSlider";

function Home({ user }){
 //slides
 const slides = [
    { url: "https://media.istockphoto.com/photos/young-man-arms-outstretched-by-the-sea-at-sunrise-enjoying-freedom-picture-id1285301614?k=20&m=1285301614&s=612x612&w=0&h=WbwgiM4M_JWWC9ew3Mhxq1XPyfZ-Sko_RgKf7toPe7A=", title: "beach" },
    { url: "https://www.strong4life.com/-/media/Strong4Life/Pages/Activity/Articles/6-Fun-and-Easy-Outdoor-Activities-for-Kids/SLP17_MIX_4y_Family_riding_bikes_0444.jpg", title: "boat" },
    { url: "https://www.elitehavens.com/magazine/wp-content/uploads/2016/09/rafting-resize-1.jpg", title: "forest" },
    { url: "https://busycontinent.com/wp-content/uploads/2022/08/image4-10.png", title: "city" },
    { url: "https://yachtsmen.eu/wp-content/uploads/2021/07/2021_Ultra-LX_BK1_ACT-4_male.jpg", title: "italy" },
  ];
  const containerStyles = {
    width: "500px",
    height: "280px",
    margin: "0 auto",
  };

  const [events, setEvents] = useState([]);
  const[isTrue,setIsTrue]=useState(true);

  useEffect(() => {
    fetch("/events")
      .then((r) => r.json())
      .then(setEvents);
  }, []);

  useEffect(() => {
    fetch(`/tickets/`)
      .then((r) => r.json())
      .then(setBook);
  }, []);

  function handleAddSpice(addedSpice) {
    setEvents((events) => [...events, addedSpice]);
  }

  function handleUpdateSpice(updatedSpice) {
    setEvents((events) =>
      events.map((spice) => {
        return spice.id === updatedSpice.id ? updatedSpice : spice;
      })
    );
  }

  function handleDeleteSpice(deletedSpice) {
    setEvents((events) =>
      events.filter((spice) => spice.id !== deletedSpice.id)
    );
  }

  function handleClick(){
    setIsTrue(!isTrue)
  }
  if (user) {
    return <>
    <h1>Welcome, Grace <element className="live_events">{user.username}</element>!</h1>
    <h3>Booked tickets:{book}</h3>
    {/* body content */}

    <h1>live: <element className="live_events">{events.length}</element></h1>
      <main>

      <button className="btn add_btn" onClick={handleClick}> Add Event +</button>

      {isTrue ? <div className="sidebar"><NewEventForm onAddSpice={handleAddSpice} /></div> : null} 
      <div><h1>Available events</h1></div>  
        <section className="spice-list">
          {events.map((spice) => (
            <EventItem
              key={spice.id}
              spice={spice}
              onUpdateSpice={handleUpdateSpice}
              onDeleteSpice={handleDeleteSpice}
              // onAddTicket={handleAddTicket}
            />
          ))}
        </section>
      </main>
    </>;
   } else {
    return <div class="body_msg">
      <div className="text-msg">
        <h1>Please Login or Sign Up</h1>
      </div>
      {/* //image slider */}
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
    </div>;
  }
}

export default Home;