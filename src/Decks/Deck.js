import { useParams } from "react-router-dom";

export default function Deck() {
  const { deckId } = useParams();

  return (
    <div>
      <h1>Deck</h1>
    </div>
  );
}
