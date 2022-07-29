import { atom } from "recoil";

export const test = atom({
  key: "test",
  default: {},
});

export const test2 = atom({
  key:"test2",
  default:{
    dinstacne : 0,
    time : 0, 
  }
})