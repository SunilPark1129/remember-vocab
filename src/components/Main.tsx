import "./styles/main.css";
import Vocabs from "./Vocab/Vocabs";
import Feature from "./Feature";
import SelectZone from "./SelectZone";
import Modals from "../modals/Modals";

export default function Main() {
  return (
    <main>
      <div className="wrapper">
        <div className="position">
          {/* manages the addresses for retrieving array items */}
          <SelectZone />

          {/* manages the functions of adding, removing, and editing */}
          <Feature />

          {/* a modal is opened to manage the items */}
          <Modals />

          {/* displays the results of the items added by the user */}
          <Vocabs />
        </div>
      </div>
    </main>
  );
}
