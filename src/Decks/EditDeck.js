import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import { useParams } from "react-router-dom";

export default function EditDeck() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState({
    name: "",
    description: "",
    cards: [],
  });

  useEffect(() => {
    if (deckId === undefined) return;
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDeck();
  }, [deckId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await updateDeck(deck);
    navigate(`/decks/${res.id}`);
  };

  const handleCancel = () => {
    navigate(`/decks/${deckId}`);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1 className="text-5xl font-semibold">Edit Deck</h1>
      <form onSubmit={handleSubmit} className="flex flex-col my-4">
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            className="h-10 w-full border border-1 rounded p-2 my-2"
            placeholder="Deck Name"
            type="text"
            id="name"
            value={deck.name}
            onChange={(e) =>
              setDeck((currentDeck) => ({
                ...currentDeck,
                name: e.target.value,
              }))
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="h-40 w-full border border-1 rounded p-2 my-2"
            placeholder="Brief description of the deck"
            id="description"
            value={deck.description}
            onChange={(e) =>
              setDeck((currentDeck) => ({
                ...currentDeck,
                description: e.target.value,
              }))
            }
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
