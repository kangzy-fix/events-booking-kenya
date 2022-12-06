import { useState } from "react";

const initialState = {
  title: "",
  image: "",
  location: "",
  description: "",
  date: "",
  rating: ""
};

function NewSpiceForm({ onAddSpice }) {
  const [formData, setFormData] = useState(initialState);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      
    })
      .then((r) => r.json())
      .then((newEvent) => {
        setFormData(initialState);
        onAddSpice(newEvent);
      });
  }

  return (
    <div className="card ">
      <h2>Add Event/Activity</h2>
      <form className="new_event" onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={handleChange}
        />
          <label htmlFor="description">Description: </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
          />
      <label htmlFor="notes">Location: </label>
      <input
        type="text"
        id="location"
        value={formData.location}
        onChange={handleChange}
      />
        <label htmlFor="image">Image URL: </label>
        <input
          type="text"
          id="image"
          value={formData.image}
          onChange={handleChange}
        />

        <label htmlFor="date">date: </label>
        <input
          type="date"
          id="date"
          value={formData.date}
          onChange={handleChange}
        />

        <label htmlFor="rating">Rating: </label>
        <input
          type="number"
          id="rating"
          max="5"
          value={formData.rating}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewSpiceForm;