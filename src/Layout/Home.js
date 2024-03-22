import { useNavigate, Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";
import { useState, useEffect } from "react";
import { Plus, Eye, BookOpen, Trash } from "lucide-react";

const DeckCard = ({ deck }) => (
  <div className="border border-1 rounded p-6 min-h-60 shadow flex flex-col justify-between px-3">
    <div>
      <div className="flex flex-row justify-between w-full px-3">
        <h3 className="text-2xl">{deck.name}</h3>
        <p>{deck.cards.length} cards</p>
      </div>
      <div className="flex text-lg pt-2 px-3">
        <p>{deck.description}</p>
      </div>
    </div>
    <div className="flex flex-row w-full px-3 justify-between">
      <div>
        <Link
          to={`/decks/${deck.id}`}
          className="border border-1 rounded py-2 px-4 m-2 hover:bg-slate-300 bg-zinc-200 inline-flex"
        >
          <Eye className="size-5 mr-2 my-auto" />
          View
        </Link>
        <Link
          to={`/decks/${deck.id}/study`}
          className="border border-1 rounded py-2 px-4 m-2 hover:bg-blue-300 bg-blue-200 inline-flex"
        >
          <BookOpen className="size-5 mr-2 my-auto" />
          Study
        </Link>
      </div>
      <button
        onClick={() => {
          window.confirm("Delete this deck?") &&
            deleteDeck(deck.id) &&
            window.location.reload();
        }}
        className="border border-1 rounded p-2 my-2 hover:bg-red-600 bg-red-500 inline-flex"
      >
        <Trash className="size-5 mx-2 my-auto" />
      </button>
    </div>
  </div>
);

export default function Home() {
  const navigate = useNavigate();
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal).then(setDecks);
    return () => abortController.abort();
  }, []);

  return (
    <div className="space-y-8">
      <button
        onClick={() => navigate("/decks/new")}
        className="border border-1 rounded p-2 hover:bg-slate-100 shadow inline-flex"
      >
        <Plus className="size-5 mr-2 my-auto" /> Create Deck
      </button>
      <div className="flex flex-col space-y-8">
        {decks.map((deck) => (
          <DeckCard key={deck.id} deck={deck} navigate={navigate} />
        ))}
      </div>
    </div>
  );
}
