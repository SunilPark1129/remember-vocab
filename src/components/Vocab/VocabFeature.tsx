import { useStore } from "../../store";
import imgFlip from "../../images/flip.svg";
import imgHappy from "../../images/happy.svg";
import imgSad from "../../images/sad.svg";
import imgShuffle from "../../images/shuffle.svg";
import { Fragment, useState } from "react";
import { Upgrade, Payload } from "../../model/trigger";

interface OwnProp {
  units: string[];
  setUpgraded: (prev: Upgrade) => void;
  setShuffled: (prev: boolean) => void;
}

const VocabFeature: React.FC<OwnProp> = ({
  units,
  setUpgraded,
  setShuffled,
}) => {
  const [hasAgreedShuffle, setHasAgreedShuffle] = useState<boolean>(false);
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
    const isUp: boolean = name === "up";

    // if current zone is at the edge, break the function
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

    // if the current position is the last index of the array
    // calculate current position
    if (currentPosition === vocabs[currentZone].length - 1) {
      setCurrentPosition(currentPosition - 1);
    }
    setUpgraded({ trigger: true, isUp: isUp });
  }

  // shuffle the current zone array
  function shuffle(arr: object[], path: object[] = []) {
    for (let i = 0; i < vocabs[currentZone].length; i++) {
      const ranNum = Math.floor(Math.random() * arr.length);
      const temp = arr.splice(ranNum, 1);
      path.push(...temp);
    }

    setShuffled(true);

    // replace the original array with the shuffled array
    setShuffle(units[currentZone], path);
    setCurrentPosition(0);
    setHasAgreedShuffle(false);
  }

  function shuffleHandler(): void {
    shuffle([...vocabs[currentZone]]);
    setHasAgreedShuffle(false);
  }

  return (
    <Fragment>
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
          onClick={() => setHasAgreedShuffle(true)}
          title="shuffle"
          disabled={vocabs[currentZone].length === 0 ? true : false}
        >
          <img src={imgShuffle} alt="shuffle" />
        </button>
      </div>
      {hasAgreedShuffle ? (
        <>
          <div className="vocabs__modal__permit">
            <div className="vocabs__modal__permit__text">
              <p>
                Do you really want to shuffle the sequentially listed items?
              </p>
              <p>
                <span>Applying current floor only*</span>
              </p>
            </div>
            <div className="vocabs__modal__permit__btn">
              <button onClick={shuffleHandler}>YES</button>
              <button onClick={() => setHasAgreedShuffle(false)}>NO</button>
            </div>
          </div>
          <div
            className="vocabs__modal__cover"
            onClick={() => setHasAgreedShuffle(false)}
          ></div>
        </>
      ) : null}
    </Fragment>
  );
};

export default VocabFeature;
