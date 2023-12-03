import "./styles/zone.css";
import { useState } from "react";
import { useStore } from "../store";

const units = ["first", "second", "third", "completed"];

const SelectZone: React.FC = () => {
  const currentZone = useStore((store) => store.currentZone);
  const setCurrentZone = useStore((store) => store.setCurrentZone);
  const setCurrentPosition = useStore((store) => store.setCurrentPosition);
  const setViewFront = useStore((store) => store.setViewFront);

  const [hasTriggerOn, setTriggerOn] = useState<boolean>(false);

  // when clicked, different zones are displayed to enable moving to another zone
  function triggerHandler(): void {
    // CSS style transition trigger
    setTriggerOn(true);
  }

  // move to other zone
  function zoneClickHandler(e: React.MouseEvent<HTMLButtonElement>): void {
    const { value } = e.target as HTMLInputElement;
    const nextZone: number = Number(value);
    setTriggerOn(false);

    // ignore when the user clicks the current zone
    if (currentZone === nextZone) return;

    setViewFront(true);
    setCurrentZone(nextZone);
    setCurrentPosition(0);
  }

  return (
    <div className="zone">
      <div className="zone__content">
        {/* prevent clicking the zone before trigger is on */}
        <div
          className={`zone__trigger ${
            hasTriggerOn && "zone__trigger--actived"
          }`}
          onClick={triggerHandler}
        ></div>
        {/* display zone buttons */}
        {units.map((item, idx) => {
          return (
            <button
              className={`zone__btn ${
                currentZone === idx && "zone__btn--actived"
              } ${hasTriggerOn && "zone__btn--transform"}`}
              onClick={zoneClickHandler}
              value={idx}
              key={item}
            ></button>
          );
        })}
        {/* display zone title */}
        <button
          className="zone__text"
          style={{
            transform: `translateY(${hasTriggerOn ? currentZone * 120 : 0}%)`,
          }}
          onClick={() => setTriggerOn((prev) => !prev)}
        >
          {units[currentZone].charAt(0).toUpperCase() +
            units[currentZone].slice(1)}{" "}
          Floor
        </button>
      </div>
    </div>
  );
};

export default SelectZone;
