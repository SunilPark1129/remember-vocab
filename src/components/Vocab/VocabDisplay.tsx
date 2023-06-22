import { useState } from "react";
import { useStore } from "../../store";

interface TriggerProperty {
  trigger: boolean;
  isUp?: boolean;
  isLeft?: boolean;
}

interface PropsProprty {
  units: string[];
  setMovedLeft: (prev: TriggerProperty) => void;
}

export default function VocabDisplay({ units, setMovedLeft }: PropsProprty) {
  const vocabs = useStore((store) => [
    store.first,
    store.second,
    store.third,
    store.completed,
  ]);
  const currentZone: number = useStore((store) => store.currentZone);
  const currentPosition = useStore((store) => store.currentPosition);

  const isViewFront = useStore((store) => store.isViewFront);
  const setViewFront = useStore((store) => store.setViewFront);
  const setCurrentPosition = useStore((store) => store.setCurrentPosition);

  const [isDragging, setDragging] = useState<boolean>(false);
  const [posX, setPosX] = useState<number>(0);

  function skipChnageHandler(left: string) {
    const isLeft = left === "left";
    const vocabSize = vocabs[currentZone].length - 1;
    if (isLeft) {
      setMovedLeft({ trigger: true, isLeft: true });
      currentPosition === 0
        ? setCurrentPosition(vocabSize)
        : setCurrentPosition(currentPosition - 1);
    } else {
      setMovedLeft({ trigger: true, isLeft: false });
      currentPosition === vocabSize
        ? setCurrentPosition(0)
        : setCurrentPosition(currentPosition + 1);
    }
  }

  function pointerDownHandler() {
    setDragging(true);
  }

  function pointerMoveHandler(e: any) {
    if (isDragging) {
      const { movementX } = e;
      setPosX((prev) => prev + movementX);
    }
  }

  function pointerCancelHandler() {
    if (isDragging && posX < 5 && posX > -5) {
      setViewFront(!isViewFront);
    }

    if (posX > 80) {
      skipChnageHandler("left");
    } else if (posX < -80) {
      skipChnageHandler("right");
    }

    setDragging(false);
    setPosX(0);
  }

  return (
    <div className="vocabs__content">
      {vocabs[currentZone].length > 0 ? (
        <div
          className="vocabs__items"
          style={{
            transform: `rotateY(${isViewFront ? "0deg" : "180deg"})`,
          }}
          onPointerDown={pointerDownHandler}
          onPointerMove={pointerMoveHandler}
          onPointerUp={pointerCancelHandler}
          onPointerLeave={pointerCancelHandler}
        >
          <div className="vocabs__items__front vocabs__items__front--title">
            <p>
              <b>{vocabs[currentZone][currentPosition].title}</b>
            </p>
          </div>
          <div className="vocabs__items__back">
            <p>{vocabs[currentZone][currentPosition].description}</p>
          </div>
        </div>
      ) : (
        <div className="vocabs__items">
          <div className="vocabs__items__front vocabs__items__front--none">
            <p>
              You have no vocabs in{" "}
              <span>
                {units[currentZone].charAt(0).toUpperCase() +
                  units[currentZone].slice(1)}{" "}
              </span>
              Floor !
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
