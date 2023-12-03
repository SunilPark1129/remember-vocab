import { useEffect } from "react";
import { useStore } from "../store";

const units = ["first", "second", "third", "completed"];

const Delete: React.FC = () => {
  const setModal = useStore((store) => store.setModal);
  const setCurrentPosition = useStore((store) => store.setCurrentPosition);
  const setDelete = useStore((store) => store.setDelete);

  const vocab = useStore((store) => [
    store.first,
    store.second,
    store.third,
    store.completed,
  ]);
  const currentZone = useStore((store) => store.currentZone);
  const currentPosition = useStore((store) => store.currentPosition);

  useEffect(() => {
    if (vocab[currentZone].length === 0) {
      // if the array is empty, close the modal
      setModal(null);
    }
  }, []);

  function clickHandler() {
    const { id } = vocab[currentZone][currentPosition];
    const zone = units[currentZone];
    const size = vocab[currentZone].length - 1;

    // delete the current item from state management
    setDelete(zone, id);

    if (currentPosition === size) {
      // if deleted last index of array, move to last index to prevent the error
      setCurrentPosition(currentPosition - 1);
    }

    // close modal
    setModal(null);
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
};

export default Delete;
