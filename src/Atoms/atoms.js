import { atom } from "recoil";
import image from "../Datas/image.jpg";

export const coordinates = atom({
  key: "coordinate",
  default: {},
});
//좌표
export const details = atom({
  key: "details",
  default: {
    dinstacne: 0,
    time: 0,
  },
});
//거리
export const aidInfos = atom({
  key: "aidinfo",
  default: {                    //아직 서버에서 이미지를 못받아서 일단은 배제 시켰습니다.
    //image:image,
    notice: "",
    firstAid: ""
  },
});
//응급정보
export const infoData = atom({
  key: "infoData",
  default: {},
}); // 이걸로 마커 이벤트 관리하고 경로 추천 까지 한번에 하면 될 듯 싶음 coordinate가 필요가 없음
//병원정보
export const selectData = atom({
  key: "selectData",
  default: {},
});
//선택정보
//나중에 선택한게 뭔지 알려면 이것도 전역 상태로 관리해야 됨
