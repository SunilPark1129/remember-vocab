import "./styles/feature.css";
import React from "react";
import { useStore } from "../store";
import imgPlus from "../images/plus.svg";
import imgDelete from "../images/delete.svg";
import imgEdit from "../images/edit.svg";
import imgQuestion from "../images/question.svg";

const units = [
  {
    label: "Add",
    img: imgPlus,
    id: 0,
  },
  {
    label: "Delete",
    img: imgDelete,
    id: 1,
  },
  {
    label: "Edit",
    img: imgEdit,
    id: 2,
  },
  { label: "Question", img: imgQuestion, id: 3 },
];

export default function Feature() {
  const setModal = useStore((store) => store.setModal);

  function openModalHandler(e: React.MouseEvent<HTMLButtonElement>): void {
    const { name } = e.target as HTMLInputElement;

    if (name) {
      // the string sent through state management is read to open the modal in the Modals component
      setModal(name);
    }
  }

  return (
    <div className="feature">
      <div className="feature__content">
        {units.map(({ label, img, id }) => {
          return (
            <button
              className="feature__box"
              onClick={openModalHandler}
              name={label}
              key={label + id}
              title={label}
            >
              <img src={img} alt={label} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
