import { atom } from "recoil";

export const coordinates = atom({
  key: "coordinate",
  default: {},
});

export const details = atom({
  key: "details",
  default: {
    dinstacne: 0,
    time: 0,
  },
});
