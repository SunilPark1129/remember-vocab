import { useStore } from "../../store";
import imgFlip from "../../images/flip.svg";
import imgHappy from "../../images/happy.svg";
import imgSad from "../../images/sad.svg";
import imgShuffle from "../../images/shuffle.svg";

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

interface PropsProprty {
  units: string[];
  setUpgraded: (prev: TriggerProperty) => void;
  setShuffled: (prev: boolean) => void;
}

export default function VocabFeature({
  units,
  setUpgraded,
  setShuffled,
}: PropsProprty) {
  const vocabs = useStore((store) => [
    store.first,
    store.second,
    store.third,
    store.completed,
  ]);
  const currentZone: number = useStore((store) => store.currentZone);
  const currentPosition = useStore((store) => store.currentPosition);

  const setCurrentPosition = useStore((store) => store.setCurrentPosition);
  const setViewFront = useStore((store) => store.setViewFront);
  const moveZone = useStore((store) => store.moveZone);
  const setShuffle = useStore((store) => store.setShuffle);

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
    <>
      <div className="vocabs__flip">
        <button
          className="vocabs__btn"
          onClick={() => setViewFront()}
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
            vocabs[currentZone].length === 0 || currentZone === 3 ? true : false
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
            vocabs[currentZone].length === 0 || currentZone === 0 ? true : false
          }
        >
          <img src={imgSad} alt="sad" />
        </button>
      </div>
      <div className="vocabs__index">
        <p>{`${vocabs[currentZone].length === 0 ? 0 : currentPosition + 1} / ${
          vocabs[currentZone].length
        }`}</p>
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
    </>
  );
}
