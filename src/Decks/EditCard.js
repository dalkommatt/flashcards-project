import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { readDeck, updateCard } from "../utils/api"; // Replace with appropriate update function
import { useParams } from "react-router-dom";

export default function EditCard() {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const navigate = useNavigate();
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);
      console.log(loadedDeck);
      console.log(cardId);
      const card = deck.cards?.find((card) => card.id == cardId);
      console.log(card);
      setDeck(loadedDeck);
      setFront(card?.front);
      setBack(card?.back);
    }
    loadDeck();
  }, [deckId]);

  const handleEdit = async (event) => {
    event.preventDefault();
    // Update the card object
    const res = await updateCard(deckId, { front, back }, null); // Replace with appropriate update function
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
            Edit Card
          </li>
        </ol>
      </nav>
      <h1 className="h2">Edit Card</h1>
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
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}
