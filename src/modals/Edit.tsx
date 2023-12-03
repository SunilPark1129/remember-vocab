import { useState, useEffect } from "react";
import { useStore } from "../store";
import { InputProperty, PayloadProprty } from "../model/modal";

const units = ["first", "second", "third", "completed"];

const Edit: React.FC = () => {
  const setModal = useStore((store) => store.setModal);
  const setViewFront = useStore((store) => store.setViewFront);
  const setEdit = useStore((store) => store.setEdit);

  const vocabs = useStore((store) => [
    store.first,
    store.second,
    store.third,
    store.completed,
  ]);
  const currentZone = useStore((store) => store.currentZone);
  const currentPosition = useStore((store) => store.currentPosition);

  const [InputValue, setInputValue] = useState<InputProperty>({
    title: vocabs[currentZone][currentPosition]?.title,
    description: vocabs[currentZone][currentPosition]?.description,
  });

  useEffect(() => {
    if (vocabs[currentZone].length === 0) {
      setModal(null);
    }
  }, []);

  function changeHandler(e: React.ChangeEvent) {
    const { name, value } = e.target as HTMLInputElement;

    // store input values
    setInputValue((prev) => ({ ...prev, [name]: value }));
  }

  function clickHandler() {
    if (InputValue.title && InputValue.description) {
      const { title, description, id } = vocabs[currentZone][currentPosition];

      // if the property value is same with the input value, break the function
      if (
        title === InputValue.title &&
        description === InputValue.description
      ) {
        setModal(null);
        return;
      }

      const payload: PayloadProprty = {
        title: InputValue.title,
        description: InputValue.description,
        id: id,
      };

      // replace with edited item into state management
      setEdit(units[currentZone], id, payload);

      setViewFront(true);

      // close modal
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
          value={InputValue.title}
          onChange={changeHandler}
        />
      </div>
      <div className="modal__input-box">
        <label>Description</label>
        <textarea
          name="description"
          value={InputValue.description}
          onChange={changeHandler}
        />
      </div>
      <div className="modal__button">
        <button
          onClick={clickHandler}
          disabled={InputValue.title && InputValue.description ? false : true}
        >
          EDIT
        </button>
        <button onClick={() => setModal(null)}>CANCEL</button>
      </div>
    </div>
  );
};

export default Edit;
