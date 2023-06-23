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
  /*
    boolean states for displaying the animation
  */

  // when an item is moved to a different zone, this trigger is activated
  const [hasUpgraded, setUpgraded] = useState<TriggerProperty>({
    trigger: false,
    isUp: true,
  });

  // when the user pressed the shuffle icon, this trigger is activated
  const [hasShuffled, setShuffled] = useState<boolean>(false);

  // when the user drag to sideways, this trigger is activated
  const [hasMovedLeft, setMovedLeft] = useState<TriggerProperty>({
    trigger: false,
    isLeft: true,
  });

  useEffect(() => {
    if (hasUpgraded.trigger || hasShuffled || hasMovedLeft.trigger) {
      // set trigger back to false after the delay
      // purpose: animation effect
      setTimeout(() => {
        hasUpgraded &&
          setUpgraded((prev: TriggerProperty) => ({
            ...prev,
            trigger: false,
          }));
        hasShuffled && setShuffled(false);
        hasMovedLeft.trigger &&
          setMovedLeft((prev: TriggerProperty) => ({
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
      {/* displaying vocab text + dragging feature */}
      <VocabDisplay
        units={units}
        setMovedLeft={(prev: TriggerProperty) => setMovedLeft(prev)}
      />
      {/* displaying features - flip, shuffle, upgrade */}
      <VocabFeature
        units={units}
        setUpgraded={(prev: TriggerProperty) => setUpgraded(prev)}
        setShuffled={(prev: boolean) => setShuffled(prev)}
      />
      {/* displaying current index */}
      <VocabUpdated
        hasUpgraded={hasUpgraded}
        hasShuffled={hasShuffled}
        hasMovedLeft={hasMovedLeft}
      />
    </div>
  );
}
