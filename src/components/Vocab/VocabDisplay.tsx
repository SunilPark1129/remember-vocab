import { useState, useRef, createRef } from "react";
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
  const setCurrentPosition = useStore((store) => store.setCurrentPosition);
  const refScreen = useRef<HTMLDivElement>(null);

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

  const [isDragging, setDragging] = useState<boolean>(false);
  const [posX, setPosX] = useState<number>(0);

  // managing the current position
  function managePosition(left: string): void {
    // check if the user dragged to left or right
    const isLeft = left === "left";

    const vocabSize = vocabs[currentZone].length - 1;

    if (refScreen.current) {
      refScreen.current.scrollTo(0, 0);
      setViewFront(true);
    }

    if (isLeft) {
      setMovedLeft({ trigger: true, isLeft: true });

      // if current position is 0, then move to last index of array
      currentPosition === 0
        ? setCurrentPosition(vocabSize)
        : setCurrentPosition(currentPosition - 1);
    } else {
      setMovedLeft({ trigger: true, isLeft: false });

      // if current position is last index of array, then move to 0
      currentPosition === vocabSize
        ? setCurrentPosition(0)
        : setCurrentPosition(currentPosition + 1);
    }
  }

  function keyDownHandler(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowLeft") {
      managePosition("left");
    } else if (e.key === "ArrowRight") {
      managePosition("right");
    }
  }

  // when clicked dragging trigger is on
  function pointerDownHandler(): void {
    setDragging(true);
  }

  // while dragging
  function pointerMoveHandler(e: React.MouseEvent<HTMLDivElement>) {
    if (isDragging) {
      const { movementX } = e;
      setPosX((prev) => prev + movementX);
    }
  }

  // when pointer is stopped
  function pointerCancelHandler() {
    // if the user has dragged more than 80 pixel
    if (posX > 80) {
      managePosition("left");
    } else if (posX < -80) {
      managePosition("right");
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
          tabIndex={0}
          onPointerDown={pointerDownHandler}
          onPointerMove={pointerMoveHandler}
          onPointerUp={pointerCancelHandler}
          onPointerLeave={pointerCancelHandler}
          onKeyDown={keyDownHandler}
        >
          <div className="vocabs__items__front vocabs__items__front--title">
            <p>
              <b>{vocabs[currentZone][currentPosition].title}</b>
            </p>
          </div>
          <div ref={refScreen} className="vocabs__items__back">
            <p>{vocabs[currentZone][currentPosition].description}</p>
          </div>
        </div>
      ) : (
        // when the current zone has no item
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
