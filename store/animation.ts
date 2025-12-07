import { create } from 'zustand';

export type Lottie = object;

export interface State {
  error: string;
  animationData: Lottie | null;
}

interface Store extends State {
  setAnimationData: (payload: Lottie) => void;
  clearAnimationData: () => void;
  parseAndSetAnimationData: (payload: string) => void;
}

export const useAnimationStore = create<Store>((set) => ({
  animationData: null,
  error: "",
  setAnimationData: (payload: Lottie) =>
    set({
      error: "",
      animationData: payload,
    }),
  parseAndSetAnimationData: (payload: string) => {
    try {
      const parsed = JSON.parse(payload);
      set({
        error: "",
        animationData: parsed,
      });
    } catch (e) {
      set({
        error: e instanceof Error ? e.toString() : String(e),
      });
    }
  },
  clearAnimationData: () =>
    set({
      animationData: null,
      error: "",
    }),
}));
