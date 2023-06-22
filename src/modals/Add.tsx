import { useState } from "react";
import { useStore } from "../store";

interface Vocab {
  title: string;
  description: string;
}

const initialValue = {
  title: "",
  description: "",
};

export default function Add() {
  const [vocab, setVocab] = useState<Vocab>(initialValue);

  const setModal = useStore((store) => store.setModal);
  const addVocab = useStore((store) => store.addVocab);
  const vocabID = useStore((store) => store.vocabID);

  const setCurrentZone = useStore((store) => store.setCurrentZone);
  const setCurrentPosition = useStore((store) => store.setCurrentPosition);
  const lastIndex = useStore((store) => store.first.length);
  const setViewFront = useStore((store) => store.setViewFront);

  function changeHandler(e: any) {
    const { name, value } = e.target;
    setVocab((prev) => ({ ...prev, [name]: value }));
  }

  function clickHandler() {
    if (vocab.title && vocab.description) {
      addVocab(vocab.title, vocab.description, vocabID);
      setVocab(initialValue);

      setCurrentZone(0);
      setCurrentPosition(lastIndex);
      setViewFront(true);
      setModal(null);
    }
  }

  return (
    <div className="modal__content">
      <div className="modal__input-box">
        <label>Title</label>
        <input
          type="text"
          name="title"
          maxLength={150}
          value={vocab.title}
          onChange={changeHandler}
        />
      </div>
      <div className="modal__input-box">
        <label>Description</label>
        <textarea
          name="description"
          value={vocab.description}
          onChange={changeHandler}
        />
      </div>
      <div className="modal__button">
        <button
          onClick={clickHandler}
          disabled={vocab.title && vocab.description ? false : true}
        >
          ADD
        </button>
        <button onClick={() => setModal(null)}>CANCEL</button>
      </div>
    </div>
  );
}
