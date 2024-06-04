import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCard } from "../utils/api";
import { useParams } from "react-router-dom";

export default function CreateCard({ decks }) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const navigate = useNavigate();
  const { deckId } = useParams();
  const deck = decks.find((deck) => deck.id === parseInt(deckId));

  const handleSave = async (event) => {
    event.preventDefault();
    // Create a new card object and save it
    const res = await createCard(deckId, { front, back }, null);
    if (res) {
      setFront("");
      setBack("");
    }
  };

  const handleDone = () => {
    navigate(`/decks/${deckId}`);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href={`/decks/${deckId}`}>{deck?.name}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h1 className="h2">{deck?.name}: Add Card</h1>
      <form className="flex flex-col my-4">
        <div className="flex flex-col">
          <label htmlFor="front">Front</label>
          <textarea
            className="h-20 w-full border border-1 rounded p-2 my-2"
            placeholder="Front side of card"
            type="text"
            id="front"
            value={front}
            onChange={(e) => setFront(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="h-20 w-full border border-1 rounded p-2 my-2"
            placeholder="Back side of card"
            id="back"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            required
          />
        </div>
        <div className="inline-flex space-x-2">
          <button
            type="button"
            className="btn btn-secondary bg-[#6c757d]"
            onClick={handleDone}
          >
            Done
          </button>
          <button
            type="submit"
            className="btn btn-primary bg-[#007bff]"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
