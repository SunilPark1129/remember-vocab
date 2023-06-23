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
  const setCurrentPosition = useStore((store) => store.setCurrentPosition);
  const setViewFront = useStore((store) => store.setViewFront);
  const moveZone = useStore((store) => store.moveZone);
  const setShuffle = useStore((store) => store.setShuffle);

  const vocabs = useStore((store) => [
    store.first,
    store.second,
    store.third,
    store.completed,
  ]);
  const currentZone: number = useStore((store) => store.currentZone);
  const currentPosition = useStore((store) => store.currentPosition);

  // upgrade or downgrade the item
  function upgradeClickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    const { name } = e.target as HTMLButtonElement;

    // check the clicked item is either up or down
    const isUp: boolean = name === "up";

    // if current zone is at the edge, break the function
    if (
      (currentZone === 0 && !isUp) ||
      (currentZone === 3 && isUp) ||
      vocabs[currentZone].length === 0
    ) {
      return;
    }

    // calculating the next zone as a string
    let nextZone: string = units[currentZone + (isUp ? 1 : -1)];

    const { title, description, id } = vocabs[currentZone][currentPosition];
    const payload: Payload = {
      title: title,
      description: description,
      id: id,
    };

    // move the zone with using state management
    moveZone(units[currentZone], nextZone, payload);

    // if the current position is the last index of the array
    // replace current position with last index - 1 to prevent error
    if (currentPosition === vocabs[currentZone].length - 1) {
      setCurrentPosition(currentPosition - 1);
    }

    // animation on
    setUpgraded({ trigger: true, isUp: isUp });
  }

  // shuffle the current zone array
  function shuffle(arr: object[], path: object[] = []) {
    // shuffle event
    for (let i = 0; i < vocabs[currentZone].length; i++) {
      const ranNum = Math.floor(Math.random() * arr.length);
      const temp = arr.splice(ranNum, 1);
      path.push(...temp);
    }

    // animation on
    setShuffled(true);

    // replace the original array with the shuffled array
    setShuffle(units[currentZone], path);
    setCurrentPosition(0);
  }

  return (
    <>
      {/* displaying flip */}
      <div className="vocabs__flip">
        <button
          className="vocabs__btn"
          onClick={() => setViewFront()}
          title="filp"
        >
          <img src={imgFlip} alt="flip" />
        </button>
      </div>
      {/* displaying upgrade */}
      <div className="vocabs__upgrade">
        {/* upgrade */}
        <button
          className="vocabs__btn"
          onClick={upgradeClickHandler}
          name="up"
          title="happy"
          disabled={
            vocabs[currentZone].length === 0 || currentZone === 3 ? true : false
          }
        >
          <img src={imgHappy} alt="happy" />
        </button>
        {/* downgrade */}
        <button
          className="vocabs__btn"
          onClick={upgradeClickHandler}
          name="down"
          title="sad"
          disabled={
            vocabs[currentZone].length === 0 || currentZone === 0 ? true : false
          }
        >
          <img src={imgSad} alt="sad" />
        </button>
      </div>
      {/* displaying index location + shuffle */}
      <div className="vocabs__index">
        {/* current index location */}
        <p>{`${vocabs[currentZone].length === 0 ? 0 : currentPosition + 1} / ${
          vocabs[currentZone].length
        }`}</p>
        {/* shuffle */}
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
