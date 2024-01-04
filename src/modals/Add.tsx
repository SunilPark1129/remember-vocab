import { useState } from "react";
import { useStore } from "../store";
import { InputProperty, FloorProperty } from "../model/modal";

const initialValue = {
  title: "",
  description: "",
};

export default function Add() {
  const [inputValue, setInputValue] = useState<InputProperty>(initialValue);
  const [floor, setFloor] = useState<FloorProperty>("first");

  const setModal = useStore((store) => store.setModal);
  const addVocab = useStore((store) => store.addVocab);
  const setCurrentZone = useStore((store) => store.setCurrentZone);
  const setCurrentPosition = useStore((store) => store.setCurrentPosition);
  const setViewFront = useStore((store) => store.setViewFront);

  const lastIndex = useStore((store) => store[floor].length);
  const vocabID = useStore((store) => store.vocabID);

  function changeHandler(e: React.ChangeEvent): void {
    const { name, value } = e.target as HTMLInputElement;

    // store input values
    setInputValue((prev) => ({ ...prev, [name]: value }));
  }

  function clickHandler(): void {
    if (inputValue.title && inputValue.description) {
      // store new item into state management
      addVocab(inputValue.title, inputValue.description, floor, vocabID);

      setInputValue(initialValue);

      let floorInNumber;

      switch (floor) {
        case "first":
          floorInNumber = 0;
          break;
        case "second":
          floorInNumber = 1;
          break;
        case "third":
          floorInNumber = 2;
          break;
        case "completed":
          floorInNumber = 3;
          break;
        default:
          floorInNumber = 0;
      }

      // address and display the last added item
      setCurrentZone(floorInNumber);
      setCurrentPosition(lastIndex);
      setViewFront(true);

      // close modal
      setModal(null);
    }
  }

  function floorClickHandler(val: FloorProperty) {
    setFloor(val);
  }

  return (
    <div className="modal__content">
      <div className="modal__input-box">
        <label>Title</label>
        <input
          type="text"
          name="title"
          maxLength={150}
          value={inputValue.title}
          onChange={changeHandler}
        />
      </div>
      <div className="modal__input-box">
        <label>Description</label>
        <textarea
          name="description"
          value={inputValue.description}
          onChange={changeHandler}
        />
      </div>
      <div className="modal__location">
        <button onClick={() => floorClickHandler("first")}>First Floor</button>
        <button onClick={() => floorClickHandler("second")}>
          Second Floor
        </button>
        <button onClick={() => floorClickHandler("third")}>Third Floor</button>
        <button onClick={() => floorClickHandler("completed")}>
          Fourth Floor
        </button>
      </div>
      <div className="modal__button">
        <button
          onClick={clickHandler}
          disabled={inputValue.title && inputValue.description ? false : true}
        >
          ADD
        </button>
        <button onClick={() => setModal(null)}>CANCEL</button>
      </div>
    </div>
  );
}
