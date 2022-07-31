import { atom } from "recoil";
import image from "../Datas/image.jpg";


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

export const aidInfos = atom({
  key : "aidinfo",
  default : {
    image : image,
    info : "이건 어떻게 넘길건지 나중에 이야기 해보자,일단 테스트니까 배열로 받아야 되나 ?"
  }
})

//나중에 선택한게 뭔지 알려면 이것도 전역 상태로 관리해야 됨