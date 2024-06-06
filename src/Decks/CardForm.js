export function CardForm({
  front,
  back,
  setFront,
  setBack,
  buttonOne,
  buttonTwo,
}) {
  return (
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
        {buttonOne}
        {buttonTwo}
      </div>
    </form>
  );
}
