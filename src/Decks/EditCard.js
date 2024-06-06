import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { readDeck, updateCard } from "../utils/api"; // Replace with appropriate update function
import { useParams } from "react-router-dom";
import { CardForm } from "./CardForm";

export default function EditCard() {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const navigate = useNavigate();
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({
    name: "",
    description: "",
    cards: [],
  });

  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);
      console.log(loadedDeck);
      console.log(cardId);
      const card = loadedDeck.cards?.find(
        (card) => card.id === parseInt(cardId)
      );
      console.log(card);
      setDeck(loadedDeck);
      setFront(card?.front);
      setBack(card?.back);
    }
    loadDeck();
  }, [cardId, deckId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedCard = {
      id: parseInt(cardId),
      front,
      back,
      deckId: parseInt(deckId),
    };
    await updateCard(updatedCard);
    navigate(`/decks/${deckId}`);
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
          <li className="breadcrumb-item">
            <a href={`/decks/${deckId}`}>{deck?.name}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h1 className="h2">Edit Card</h1>
      <CardForm
        front={front}
        back={back}
        setFront={setFront}
        setBack={setBack}
        buttonOne={
          <button
            type="button"
            className="btn btn-secondary bg-[#6c757d]"
            onClick={handleCancel}
          >
            Cancel
          </button>
        }
        buttonTwo={
          <button
            type="submit"
            className="btn btn-primary bg-[#007bff]"
            onClick={handleSubmit}
          >
            Submit
          </button>
        }
      />
    </div>
  );
}
