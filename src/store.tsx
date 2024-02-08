import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StateProperty {
  title: string;
  description: string;
  id: number;
}

type State = {
  first: StateProperty[];
  second: StateProperty[];
  third: StateProperty[];
  completed: StateProperty[];
  currentZone: number;
  isViewFront: boolean;
  vocabID: number;
  currentPosition: number;
  modal: string | null;
};

const initialState: State = {
  first: [],
  second: [],
  third: [],
  completed: [],
  currentZone: 0,
  isViewFront: true,
  vocabID: 0,
  currentPosition: 0,
  modal: null,
};

const store = (set: any) => ({
  ...initialState,

  // clear all datas
  clearData: () => set(initialState),

  addVocab: (title: string, description: string, floor: string, id: number) =>
    set((store: any) => ({
      [floor]: [...store[floor], { title, description, id }],
      vocabID: store.vocabID + 1,
    })),

  moveZone: (prevZone: string, nextZone: string, target: any) =>
    set((store: any) => ({
      [prevZone]: store[prevZone].filter(({ id }: any) => {
        return id !== target.id;
      }),
      [nextZone]: [
        ...store[nextZone],
        {
          title: target.title,
          description: target.description,
          id: target.id,
        },
      ],
    })),

  setViewFront: (front?: boolean) =>
    set((store: any) => ({
      isViewFront: (front ??= !store.isViewFront),
    })),

  setCurrentZone: (nextZone: number) =>
    set({
      currentZone: nextZone,
    }),

  setCurrentPosition: (newPosition: number) =>
    set({
      currentPosition: newPosition,
    }),

  setShuffle: (zone: string, newItem: object[]) =>
    set({
      [zone]: newItem,
    }),

  setModal: (page: string | null) =>
    set({
      modal: page,
    }),

  setDelete: (zone: string, itemId: number) =>
    set((store: any) => ({
      [zone]: store[zone].filter(({ id }: StateProperty) => id !== itemId),
    })),

  setEdit: (zone: string, itemId: number, payload: StateProperty) =>
    set((store: any) => ({
      [zone]: store[zone].map((item: StateProperty) => {
        if (item.id === itemId) {
          return payload;
        }
        return item;
      }),
    })),
});

export const useStore = create(persist(store, { name: "" }));
