import Add from "./Add";
import Delete from "./Delete";
import Edit from "./Edit";
import "./styles/modals.css";

import { useStore } from "../store";

interface StyledProperty {
  opacity: any;
  pointerEvents: any;
}

export default function Modals() {
  const modal = useStore((store) => store.modal);

  const StyledModal: StyledProperty = {
    opacity: modal ? "1" : "0",
    pointerEvents: modal ? "auto" : "none",
  };

  return (
    <div className="modal" style={StyledModal}>
      {modal === "Add" ? (
        <Add />
      ) : modal === "Delete" ? (
        <Delete />
      ) : modal === "Edit" ? (
        <Edit />
      ) : null}
      <div className="modal__cover"></div>
    </div>
  );
}
