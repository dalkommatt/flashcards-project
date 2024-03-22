import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { readCard } from "../utils/api";

export default function Study({ decks }) {
  const { deckId } = useParams();
  const deck = decks.find((deck) => deck.id === parseInt(deckId));
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [card, setCard] = useState({});
  
  useEffect(() => {
    const abortController = new AbortController();
    readCard(cardIndex, abortController.signal).then(setCard);
    return () => abortController.abort();
  }, [cardIndex]);

  if (deck) {
    console.log(deck[cardIndex]);
    return (
      <div>
        <h1>Study: {deck.name}</h1>
        <div className="border border-1 rounded p-6 min-h-60 shadow flex flex-col justify-between px-3">
          <div>
            <div className="flex flex-row justify-between w-full px-3">
              <h3 className="text-2xl">{deck[cardIndex]?.front}</h3>
              {/*  <p>{deck[cardIndex].length} cards</p> */}
            </div>
            <div className="flex text-lg pt-2 px-3">
              {/* <p>{deck[cardIndex].description}</p> */}
            </div>
          </div>
          <div className="flex flex-row w-full px-3 justify-between">
            <div>
              <button
                /* onClick={() => {
            window.confirm("Delete this deck?") &&
              deleteDeck(deck.id) &&
              window.location.reload();
          }} */
                className="border border-1 rounded p-2 my-2 hover:bg-red-600 bg-red-500 inline-flex"
              >
                Flip
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
