import { atom } from "recoil";

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
  default: {                    
    notice: "",
    firstAid: "",
    firstImage: "",             
    noticeImage: ""             
  },
});
//응급정보
export const infoData = atom({
  key: "infoData",
  default: {},
});
//병원정보
export const selectData = atom({
  key: "selectData",
  default: {},
});
//선택정보

