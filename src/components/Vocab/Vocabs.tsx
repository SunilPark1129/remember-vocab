import "../styles/vocabs.css";
import { useState, useEffect } from "react";
import { Upgrade } from "../../model/trigger";

import VocabDisplay from "./VocabDisplay";
import VocabFeature from "./VocabFeature";
import VocabUpdated from "./VocabUpdated";
import VocabRange from "./VocabRange";

const delay = 500;
const units: string[] = ["first", "second", "third", "completed"];

const Vocabs: React.FC = () => {
  const [hasUpgraded, setUpgraded] = useState<Upgrade>({
    trigger: false,
    isUp: true,
  });

  const [hasShuffled, setShuffled] = useState<boolean>(false);

  const [hasMovedLeft, setMovedLeft] = useState<Upgrade>({
    trigger: false,
    isLeft: true,
  });

  useEffect(() => {
    if (hasUpgraded.trigger || hasShuffled || hasMovedLeft.trigger) {
      setTimeout(() => {
        hasUpgraded &&
          setUpgraded((prev: Upgrade) => ({
            ...prev,
            trigger: false,
          }));
        hasShuffled && setShuffled(false);
        hasMovedLeft.trigger &&
          setMovedLeft((prev: Upgrade) => ({
            ...prev,
            trigger: false,
          }));
      }, delay);
    }
  }, [hasUpgraded, hasShuffled, hasMovedLeft]);

  return (
    <div
      className="vocabs"
      style={{
        pointerEvents: `${
          hasUpgraded.trigger || hasShuffled || hasMovedLeft.trigger
            ? "none"
            : "auto"
        }`,
      }}
    >
      {/* displaying vocab text */}
      <VocabDisplay
        units={units}
        setMovedLeft={(prev: Upgrade) => setMovedLeft(prev)}
      />

      {/* displaying buttons - flip, shuffle, upgrade */}
      <VocabFeature
        units={units}
        setUpgraded={(prev: Upgrade) => setUpgraded(prev)}
        setShuffled={(prev: boolean) => setShuffled(prev)}
      />

      {/* displaying input range */}
      <VocabRange />

      {/* displaying current index */}
      <VocabUpdated
        hasUpgraded={hasUpgraded}
        hasShuffled={hasShuffled}
        hasMovedLeft={hasMovedLeft}
      />
    </div>
  );
};

export default Vocabs;
