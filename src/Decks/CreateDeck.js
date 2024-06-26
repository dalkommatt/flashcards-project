import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeck } from "../utils/api";
export default function CreateDeck() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Create a new deck object and save it
    const res = await createDeck({ name, description }, null);
    // Navigate to the Deck screen
    navigate(`/decks/${res.id}`);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h1 className="text-5xl font-semibold">Create Deck</h1>
      <form onSubmit={handleSubmit} className="flex flex-col my-4">
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            className="h-10 w-full border border-1 rounded p-2 my-2"
            placeholder="Deck Name"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="h-40 w-full border border-1 rounded p-2 my-2"
            placeholder="Brief description of the deck"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="inline-flex space-x-2">
          <button
            type="button"
            className="btn btn-secondary bg-[#6c757d]"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary bg-[#007bff]">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
