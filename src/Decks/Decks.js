import { Routes, Route } from "react-router-dom";
import { listDecks } from "../utils/api";
import { useState, useEffect } from "react";
import CreateDeck from "./CreateDeck";
import EditDeck from "./EditDeck";
import Deck from "./Deck";
import Study from "./Study";
import CreateCard from "./CreateCard";
import EditCard from "./EditCard";

export default function Decks() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal).then(setDecks);
    return () => abortController.abort();
  }, []);

  return (
    <Routes>
      <Route path="/new" element={<CreateDeck />} />
      <Route path="/:deckId" element={<Deck decks={decks} />} />
      <Route path="/:deckId/study" element={<Study decks={decks} />} />
      <Route path="/:deckId/edit" element={<EditDeck />} />
      <Route path="/:deckId/cards/new" element={<CreateCard decks={decks} />} />
      <Route
        path="/:deckId/cards/:cardId/edit"
        element={<EditCard decks={decks} />}
      />
    </Routes>
  );
}
