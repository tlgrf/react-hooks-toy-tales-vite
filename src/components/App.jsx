import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]); // state to hold toys

  useEffect(() => {
    // fetch toys when the component mounts
    fetch("http://localhost:3001/toys")
      .then((r) => r.json())
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // function to add a new toy to state
  function addToy(newToy) {
    setToys([...toys, newToy]);
  }

  // function to delete a toy from state
  function deleteToy(id) {
    setToys(toys.filter((toy) => toy.id !== id));
  }

  // function to update toy's likes in state
  function updateToy(updatedToy) {
    setToys(toys.map((toy) =>
      toy.id === updatedToy.id ? updatedToy : toy
    ));
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} deleteToy={deleteToy} updateToy={updateToy} />
    </>
  );
}

export default App;