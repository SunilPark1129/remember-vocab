import { useStore } from "../store";
export default function Question() {
  const setModal = useStore((store) => store.setModal);
  return (
    <div
      className="modal__content modal__content--question"
      onClick={() => setModal(null)}
    >
      <div className="modal__question modal__question--floor">
        <div>
          <p>Vocab Storage Stage</p>
        </div>
      </div>
      <div className="modal__question modal__question--plus">
        <div>
          <p>Add Vocab</p>
        </div>
      </div>
      <div className="modal__question modal__question--delete">
        <div>
          <p>Delete Vocab</p>
        </div>
      </div>
      <div className="modal__question modal__question--edit">
        <div>
          <p>Edit Vocab</p>
        </div>
      </div>
      <div className="modal__question modal__question--help">
        <div>
          <p>Help</p>
        </div>
      </div>
      <div className="modal__question modal__question--flip">
        <div>
          <p>Flip Vocab</p>
        </div>
      </div>
      <div className="modal__question modal__question--shuffle">
        <div>
          <p>Shuffle Stage Vocabs</p>
        </div>
      </div>
      <div className="modal__question modal__question--up">
        <div>
          <p>Upgrade Vocab to Next Stage</p>
        </div>
      </div>
      <div className="modal__question modal__question--down">
        <div>
          <p>Downgrade Vocab to Previous Stage</p>
        </div>
      </div>
      <div className="modal__question modal__question--drag">
        <div>
          <p>&larr; Drag to Move Index &rarr;</p>
        </div>
      </div>
    </div>
  );
}
