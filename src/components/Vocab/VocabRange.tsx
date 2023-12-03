import React, { useRef } from "react";
import { useStore } from "../../store";

const VocabRange: React.FC = () => {
  const setCurrentPosition = useStore((store) => store.setCurrentPosition);
  const ref = useRef<HTMLInputElement | null>(null);

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

  function mouseEnterHandler() {
    const selection: any = window.getSelection();
    selection.removeAllRanges();
  }

  return (
    <div
      className="vocabs__range"
      style={{ display: vocabs[currentZone].length <= 1 ? "none" : "block" }}
    >
      <input
        type="range"
        ref={ref}
        max={vocabs[currentZone].length - 1}
        onChange={changeHandler}
        value={currentPosition}
        onMouseEnter={mouseEnterHandler}
      />
    </div>
  );
};

export default VocabRange;
