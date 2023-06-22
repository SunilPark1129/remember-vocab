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
          <SelectZone />
          <Feature />
          <Vocabs />
          <Modals />
        </div>
      </div>
    </main>
  );
}
