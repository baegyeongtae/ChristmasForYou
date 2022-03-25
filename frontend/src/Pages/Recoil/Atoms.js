import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userState = atom({
  key: "userstate",
  default: {},
});

export const loginState = atom({
  key: "loginstate",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const loginText = selector({
  key: "logintext",
  get: ({ get }) => {
    const loginResult = get(loginState);
    if (loginResult) {
      return `로그아웃`;
    } else {
      return `로그인`;
    }
  },
});
