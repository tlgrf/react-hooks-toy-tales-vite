import React from "react";

function ToyCard({ toy, deleteToy, updateToy }) {
  const { id, name, image, likes } = toy;

  function handleLike() {
    // send PATCH request to increase likes
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: likes + 1 })
    })
      .then((r) => r.json())
      .then((updatedToy) => updateToy(updatedToy)); // update state in App
  }

  function handleDelete() {
    // send DELETE request to remove toy
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE"
    }).then(() => deleteToy(id)); // update state in App
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLike}>Like {"<3"}</button>
      <button className="del-btn" onClick={handleDelete}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;