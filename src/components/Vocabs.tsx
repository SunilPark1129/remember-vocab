import "./styles/vocabs.css";
import { useState, useEffect } from "react";
import { useStore } from "../store";
import imgFlip from "../images/flip.svg";
import imgHappy from "../images/happy.svg";
import imgSad from "../images/sad.svg";
import imgShuffle from "../images/shuffle.svg";
import imgUp from "../images/up.svg";
import imgShuffleExp from "../images/shuffle-express.svg";
import imgSkipArrow from "../images/skipArrow.svg";

const delay = 500;
const units: string[] = ["first", "second", "third", "completed"];
interface Payload {
  title: string;
  description: string;
  id: number;
}

interface TriggerProperty {
  trigger: boolean;
  isUp?: boolean;
  isLeft?: boolean;
}

export default function Vocabs() {
  const vocabs = useStore((store) => [
    store.first,
    store.second,
    store.third,
    store.completed,
  ]);

  const currentZone: number = useStore((store) => store.currentZone);
  const currentPosition = useStore((store) => store.currentPosition);
  const setCurrentPosition = useStore((store) => store.setCurrentPosition);
  const isViewFront = useStore((store) => store.isViewFront);
  const setViewFront = useStore((store) => store.setViewFront);
  const moveZone = useStore((store) => store.moveZone);
  const setShuffle = useStore((store) => store.setShuffle);

  const [isDragging, setDragging] = useState<boolean>(false);
  const [posX, setPosX] = useState<number>(0);

  const [hasUpgraded, setUpgraded] = useState<TriggerProperty>({
    trigger: false,
    isUp: true,
  });
  const [hasShuffled, setShuffled] = useState<boolean>(false);
  const [hasMovedLeft, setMovedLeft] = useState<TriggerProperty>({
    trigger: false,
    isLeft: true,
  });

  useEffect(() => {
    if (hasUpgraded.trigger || hasShuffled || hasMovedLeft.trigger) {
      setTimeout(() => {
        hasUpgraded &&
          setUpgraded((prev: TriggerProperty) => ({
            trigger: false,
            isUp: prev.isUp,
          }));
        hasShuffled && setShuffled(false);
        hasMovedLeft.trigger &&
          setMovedLeft((prev: TriggerProperty) => ({
            trigger: false,
            isLeft: prev.isLeft,
          }));
      }, delay);
    }
  }, [hasUpgraded, hasShuffled, hasMovedLeft]);

  function skipChnageHandler(left: string) {
    const isLeft = left === "left";
    const currnetVocabZone = vocabs[currentZone];
    const vocabSize = currnetVocabZone.length - 1;
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

  function titleClickHandler() {
    setViewFront();
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
    if (posX > 120) {
      skipChnageHandler("left");
    } else if (posX < -120) {
      skipChnageHandler("right");
    }

    setDragging(false);
    setPosX(0);
  }

  function moveZoneHandler(e: any) {
    const { name } = e.target;
    const isUp: boolean = name === "up";
    if (
      (currentZone === 0 && !isUp) ||
      (currentZone === 3 && isUp) ||
      vocabs[currentZone].length === 0
    ) {
      return;
    }

    let nextZone: string = units[currentZone + (isUp ? 1 : -1)];

    const { title, description, id } = vocabs[currentZone][currentPosition];

    const payload: Payload = {
      title: title,
      description: description,
      id: id,
    };

    moveZone(units[currentZone], nextZone, payload);
    if (currentPosition === vocabs[currentZone].length - 1) {
      setCurrentPosition(currentPosition - 1);
    }
    setUpgraded({ trigger: true, isUp: isUp });
  }

  function shuffle(arr: object[], path: object[] = []) {
    for (let i = 0; i < vocabs[currentZone].length; i++) {
      const ranNum = Math.floor(Math.random() * arr.length);
      const temp = arr.splice(ranNum, 1);
      path.push(...temp);
    }
    setShuffled(true);
    setShuffle(units[currentZone], path);
    setCurrentPosition(0);
  }

  return (
    <div className="vocabs">
      <div
        className="vocabs__content"
        style={{
          pointerEvents: `${
            hasUpgraded.trigger || hasShuffled || hasMovedLeft.trigger
              ? "none"
              : "auto"
          }`,
        }}
      >
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
        <div className="vocabs__flip">
          <button
            className="vocabs__btn"
            onClick={titleClickHandler}
            title="filp"
          >
            <img src={imgFlip} alt="flip" />
          </button>
        </div>
        <div className="vocabs__upgrade">
          <button
            className="vocabs__btn"
            onClick={moveZoneHandler}
            name="up"
            title="happy"
            disabled={
              vocabs[currentZone].length === 0 || currentZone === 3
                ? true
                : false
            }
          >
            <img src={imgHappy} alt="happy" />
          </button>
          <button
            className="vocabs__btn"
            onClick={moveZoneHandler}
            name="down"
            title="sad"
            disabled={
              vocabs[currentZone].length === 0 || currentZone === 0
                ? true
                : false
            }
          >
            <img src={imgSad} alt="sad" />
          </button>
        </div>
        <div className="vocabs__index">
          <p>{`${
            vocabs[currentZone].length === 0 ? 0 : currentPosition + 1
          } / ${vocabs[currentZone].length}`}</p>
          <button
            className="vocabs__btn"
            onClick={() => {
              shuffle([...vocabs[currentZone]]);
            }}
            title="shuffle"
          >
            <img src={imgShuffle} alt="shuffle" />
          </button>
        </div>
      </div>
      <div
        className="vocabs__hasUpgraded"
        style={{
          opacity: `${
            vocabs[currentZone].length > 0 &&
            (hasUpgraded.trigger || hasShuffled || hasMovedLeft.trigger)
              ? "1"
              : "0"
          }`,
        }}
      >
        <img
          src={imgUp}
          alt="up arrow"
          style={{
            opacity: `${hasUpgraded.trigger ? 1 : 0}`,
            transform: `rotateX(${hasUpgraded.isUp ? "0deg" : "180deg"})`,
          }}
        />
        <img
          src={imgShuffleExp}
          alt="shuffle arrows"
          style={{ opacity: `${hasShuffled ? 1 : 0}` }}
        />
        <img
          src={imgSkipArrow}
          alt="arrow"
          style={{
            opacity: `${hasMovedLeft.trigger ? 1 : 0}`,
            transform: `rotateY(${hasMovedLeft.isLeft ? "0deg" : "180deg"})`,
          }}
        />
        <div className="vocabs__hasUpgraded__bg"></div>
      </div>
    </div>
  );
}
