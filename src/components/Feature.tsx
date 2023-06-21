import React from "react";
import "./styles/feature.css";
import { useStore } from "../store";
import imgPlus from "../images/plus.svg";
import imgDelete from "../images/delete.svg";
import imgEdit from "../images/edit.svg";

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
];
export default function Feature() {
  const setModal = useStore((store) => store.setModal);

  function openModalHandler(e: React.MouseEvent<HTMLButtonElement>): void {
    const { name } = e.target as HTMLInputElement;

    if (name) {
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
