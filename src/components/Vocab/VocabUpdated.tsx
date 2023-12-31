import { useStore } from "../../store";
import imgUp from "../../images/up.svg";
import imgShuffleExp from "../../images/shuffle-express.svg";
import imgSkipArrow from "../../images/skipArrow.svg";
import { Update } from "../../model/trigger";

const VocabUpdated: React.FC<Update> = ({
  hasUpgraded,
  hasShuffled,
  hasMovedLeft,
}) => {
  const vocabs = useStore((store) => [
    store.first,
    store.second,
    store.third,
    store.completed,
  ]);
  const currentZone: number = useStore((store) => store.currentZone);
  return (
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
  );
};

export default VocabUpdated;
