import { useState, useEffect } from "react";
import { useStore } from "../store";

interface Vocab {
  title: string;
  description: string;
}

interface PayloadProprty extends Vocab {
  id: number;
}

const units = ["first", "second", "third", "completed"];

export default function Edit() {
  const setModal = useStore((store) => store.setModal);

  const setViewFront = useStore((store) => store.setViewFront);

  const currentZone = useStore((store) => store.currentZone);
  const currentPosition = useStore((store) => store.currentPosition);

  const setEdit = useStore((store) => store.setEdit);

  const vocabs = useStore((store) => [
    store.first,
    store.second,
    store.third,
    store.completed,
  ]);

  const [vocab, setVocab] = useState<Vocab>({
    title: vocabs[currentZone][currentPosition]?.title,
    description: vocabs[currentZone][currentPosition]?.description,
  });

  useEffect(() => {
    if (vocabs[currentZone].length === 0) {
      setModal(null);
    }
  }, []);

  function changeHandler(e: any) {
    const { name, value } = e.target;
    setVocab((prev) => ({ ...prev, [name]: value }));
  }

  function clickHandler() {
    if (vocab.title && vocab.description) {
      const { title, description, id } = vocabs[currentZone][currentPosition];
      if (title === vocab.title && description === vocab.description) {
        setModal(null);
        return;
      }

      const payload: PayloadProprty = {
        title: vocab.title,
        description: vocab.description,
        id: id,
      };

      setEdit(units[currentZone], id, payload);

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
          value={vocab.title}
          onChange={changeHandler}
        />
      </div>
      <div className="modal__input-box">
        <label>Description</label>
        <textarea
          rows={20}
          cols={30}
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
          Edit
        </button>
        <button onClick={() => setModal(null)}>Cancel</button>
      </div>
    </div>
  );
}
