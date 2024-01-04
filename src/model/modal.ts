export type InputProperty = {
  title: string;
  description: string;
};

export type PayloadProprty = InputProperty & {
  id: number;
};

export type FloorProperty = "first" | "second" | "third" | "completed";
