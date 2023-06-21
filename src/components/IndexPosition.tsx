import { useStore } from "../store";

const units = ["First Zone", "Second Zone", "Third Zone", "Completed Zone"];

export default function IndexPosition() {
  const vocabs = useStore((store) => [
    store.first,
    store.second,
    store.third,
    store.completed,
  ]);
  const currentPosition = useStore((store) => store.currentPosition);
  const currentZone: number = useStore((store) => store.currentZone);

  return (
    <div className="index-position">
      <p>{`${currentPosition + 1} / ${vocabs[currentZone].length}`}</p>
      <p>{units[currentZone]}</p>
    </div>
  );
}
