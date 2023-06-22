import { useEffect } from "react";
import { useStore } from "../store";

const units = ["first", "second", "third", "completed"];

export default function Delete() {
  const setModal = useStore((store) => store.setModal);

  const setCurrentPosition = useStore((store) => store.setCurrentPosition);
  const vocab = useStore((store) => [
    store.first,
    store.second,
    store.third,
    store.completed,
  ]);

  const setDelete = useStore((store) => store.setDelete);

  const currentZone = useStore((store) => store.currentZone);
  const currentPosition = useStore((store) => store.currentPosition);

  useEffect(() => {
    if (vocab[currentZone].length === 0) {
      setModal(null);
    }
  }, []);

  function clickHandler() {
    if (vocab[currentZone].length !== 0) {
      const zone = units[currentZone];
      const { id } = vocab[currentZone][currentPosition];
      const size = vocab[currentZone].length - 1;

      setDelete(zone, id);
      if (currentPosition === size) {
        setCurrentPosition(currentPosition - 1);
      }
      setModal(null);
    }
  }

  return (
    <div className="modal__content modal__content--delete">
      <p>Do you want to delete this item?</p>
      <div className="modal__button">
        <button onClick={clickHandler}>YES</button>
        <button onClick={() => setModal(null)}>NO</button>
      </div>
    </div>
  );
}
