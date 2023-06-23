import React from "react";
import { useStore } from "../../store";

export default function VocabRange() {
  const setCurrentPosition = useStore((store) => store.setCurrentPosition);

  const vocabs = useStore((store) => [
    store.first,
    store.second,
    store.third,
    store.completed,
  ]);
  const currentZone: number = useStore((store) => store.currentZone);
  const currentPosition = useStore((store) => store.currentPosition);

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setCurrentPosition(Number(value));
  }

  return (
    <div
      className="vocabs__range"
      style={{ display: vocabs[currentZone].length <= 1 ? "none" : "block" }}
    >
      <input
        type="range"
        max={vocabs[currentZone].length - 1}
        onChange={changeHandler}
        value={currentPosition}
      />
    </div>
  );
}
