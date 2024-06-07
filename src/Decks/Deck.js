import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index.js";
import { Plus, BookOpen, Trash, Pencil } from "lucide-react";
import { deleteDeck, deleteCard } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Deck() {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDeck();
  }, [deckId]);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <h1 className="h3">{deck.name}</h1>
      <p className="my-2">{deck.description}</p>
      <div className="inline-flex justify-between w-full">
        <div className="space-x-2">
          <Link
            to={`/decks/${deckId}/edit`}
            className="btn btn-secondary inline-flex"
          >
            <Pencil className="size-5 mr-2 my-auto" />
            Edit
          </Link>
          <Link
            to={`/decks/${deckId}/study`}
            className="btn btn-primary inline-flex"
          >
            <BookOpen className="size-5 mr-2 my-auto" />
            Study
          </Link>
          <Link
            to={`/decks/${deckId}/cards/new`}
            className="btn btn-primary inline-flex"
          >
            <Plus className="size-5 mr-2 my-auto" />
            Add Cards
          </Link>
        </div>
        <button
          onClick={() => {
            window.confirm("Delete this deck?") &&
              deleteDeck(deck.id) &&
              navigate("/");
          }}
          className="border border-1 rounded p-2 hover:bg-red-600 bg-red-500 inline-flex"
        >
          <Trash className="size-5 mx-2 my-auto" />
        </button>
      </div>
      <h2 className="h2 my-4">Cards</h2>
      <div className="border rounded-md divide-y">
        {deck.cards &&
          deck.cards.map((card) => (
            <div
              key={card.id}
              className="min-h-24 flex flex-col justify-between"
            >
              <div className="flex flex-row justify-between w-full px-3">
                <p>{card.front}</p>
                <p>{card.back}</p>
              </div>
              <div className="inline-flex space-x-2 justify-end mb-2">
                <Link
                  to={`/decks/${deckId}/cards/${card.id}/edit`}
                  className="btn btn-secondary inline-flex"
                >
                  <Pencil className="size-5 mr-2 my-auto" />
                  Edit
                </Link>
                <button
                  onClick={() => {
                    window.confirm("Delete this card?") &&
                      deleteCard(card.id) &&
                      window.location.reload();
                  }}
                  className="btn btn-danger"
                >
                  <Trash className="size-5 mx-2 my-auto" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
