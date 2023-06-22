import "../styles/vocabs.css";
import { useState, useEffect } from "react";

import VocabDisplay from "./VocabDisplay";
import VocabFeature from "./VocabFeature";
import VocabUpdated from "./VocabUpdated";

const delay = 500;
const units: string[] = ["first", "second", "third", "completed"];

interface TriggerProperty {
  trigger: boolean;
  isUp?: boolean;
  isLeft?: boolean;
}

export default function Vocabs() {
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
      <VocabDisplay
        units={units}
        setMovedLeft={(prev: TriggerProperty) => setMovedLeft(prev)}
      />
      <VocabFeature
        units={units}
        setUpgraded={(prev: TriggerProperty) => setUpgraded(prev)}
        setShuffled={(prev: boolean) => setShuffled(prev)}
      />
      <VocabUpdated
        hasUpgraded={hasUpgraded}
        hasShuffled={hasShuffled}
        hasMovedLeft={hasMovedLeft}
      />
    </div>
  );
}
