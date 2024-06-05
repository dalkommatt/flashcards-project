import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

export default function Study({ decks }) {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const deck = decks.find((deck) => deck.id === parseInt(deckId));
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [card, setCard] = useState();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal) // fetch the entire deck
      .then((deck) => {
        if (deck.cards) {
          setCard(deck.cards[cardIndex]);
        }
      }); // select the card by its index
    return () => abortController.abort();
  }, [cardIndex, deckId]);

  if (deck) {
    //console.log(deck[cardIndex]);
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Create Deck
            </li>
          </ol>
        </nav>
        <h1 className="text-5xl font-semibold">Study: {deck.name}</h1>
        <div className="border border-1 rounded p-6 min-h-60 shadow flex flex-col justify-between px-3 mt-4">
          <div>
            <div className="flex flex-row justify-between w-full px-3">
              <h3 className="text-2xl">
                Card {cardIndex + 1} of {deck.cards.length}
              </h3>
              {/*  <p>{deck[cardIndex].length} cards</p> */}
            </div>
            <div className="flex text-lg pt-2 px-3">
              {flipped ? card?.back : card?.front}
            </div>
          </div>
          <div className="flex flex-row w-full px-3 justify-between">
            <div className="space-x-2">
              <button
                onClick={() => {
                  setFlipped((current) => !current);
                }}
                className="btn btn-secondary"
              >
                Flip
              </button>
              {flipped && (
                <button
                  onClick={() => {
                    if (cardIndex === deck.cards.length - 1) {
                      if (window.confirm("Restart cards?")) {
                        setCardIndex(0);
                      } else {
                        // push to home screen
                        navigate("/");
                      }
                    } else {
                      setCardIndex((current) => current + 1);
                      setFlipped(false);
                    }
                  }}
                  className="btn btn-primary"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
