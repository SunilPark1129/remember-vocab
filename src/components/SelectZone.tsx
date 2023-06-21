import { useState } from "react";
import "./styles/zone.css";
import { useStore } from "../store";

export default function SelectZone() {
  const currentZone = useStore((store) => store.currentZone);
  const setCurrentZone = useStore((store) => store.setCurrentZone);
  const units = ["first", "second", "third", "completed"];
  const setCurrentPosition = useStore((store) => store.setCurrentPosition);

  const [hasTriggerOn, setTriggerOn] = useState<boolean>(false);

  function triggerHandler() {
    setTriggerOn(true);
  }

  function clickHandler(e: any) {
    const { value } = e.target;
    const nextZone: number = Number(value);
    setTriggerOn(false);

    if (currentZone === nextZone) return;
    setCurrentZone(nextZone);
    setCurrentPosition(0);
  }

  return (
    <div className="zone">
      <div className="zone__content">
        <div
          className={`zone__trigger ${
            hasTriggerOn && "zone__trigger--actived"
          }`}
          onClick={triggerHandler}
        ></div>
        {units.map((item, idx) => {
          return (
            <button
              className={`zone__btn ${
                currentZone === idx && "zone__btn--actived"
              } ${hasTriggerOn && "zone__btn--transform"}`}
              onClick={clickHandler}
              value={idx}
              key={item}
            ></button>
          );
        })}
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
}
