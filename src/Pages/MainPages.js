import React from "react";
import { useEffect, useState } from "react";
import { AiFillAlert } from "react-icons/ai";
import TestLocation from "./../Components/TestLocation";
import DropBox from "../Components/DropBox";
import "../Styles/AiFillAlert.scss";
import "../Styles/DropBoxWrapper.scss";

const si = [
  { value: "gyoungki", name: "시를 골라주세요" },
  { value: "seoul", name: "서울특별시" },
]; // 데이터들 일단 여기다가 놓는데 나중에 따로 뺄겁니당

const seoul = [
  { value: "orange", name: "구를 골라주세요" },
  { value: "gangnam", name: "강남구" },
];

const gangnam = [
  { value: "orange", name: "동을 골라주세요" },
  { value: "gangnam", name: "신사동" },
  { value: "gangnam1", name: "논현제1동" },
  { value: "gangnam2", name: "논현제2동" },
  { value: "gangnam3", name: "압구정동" },
  { value: "gangnam4", name: "청담동" },
  { value: "gangnam5", name: "삼성제1동" },
  { value: "gangnam6", name: "삼성제2동" },
  { value: "gangnam7", name: "대치제1동" },
  { value: "gangnam8", name: "대치제2동" },
  { value: "gangnam9", name: "대치제4동" },
  { value: "gangnam0", name: "역삼제1동" },
  { value: "gangnam01", name: "역삼제2동" },
  { value: "gangnam02", name: "도곡제1동" },
  { value: "gangnam03", name: "도곡제2동" },
  { value: "gangnam04", name: "개포제1동" },
  { value: "gangnam05", name: "개포제2동" },
  { value: "gangnam06", name: "개포제4동" },
  { value: "gangnam07", name: "일원본동" },
  { value: "gangnam08", name: "일원제1동" },
  { value: "gangnam09", name: "일원제2동" },
  { value: "gangnam00", name: "수서동" },
  { value: "gangnam001", name: "세곡동" },
];

const MainPages = () => {
  const [next, setNext] = useState([]);
  const [final, setFinal] = useState([]);
  const [send, setSend] = useState(""); //이거 나중에 제출 버튼 들어가면 그 때 한번에 문자열 합쳐서 서버로 전송
  const [loading, setLoading] = useState(false); //이건 나중에 서버에서 데이터 받아오면 그 때 지도 렌더링

  const handleChange = (e) => {
    // event handler
    // 이걸로 나중에 useState 관리해서 서버랑 통신
    if (e.target.value === "seoul") {
      setNext(seoul); //이거 로직 개구린데 ...?
    }
    if (e.target.value === "gangnam") {
      setFinal(gangnam);
    }
  };
  return (
    <div className="app">
      <div className="DropBoxWrapper">
        <DropBox
          options={si}
          defaultValue="banana"
          handleChange={handleChange}
        />
        <DropBox
          options={next}
          defaultValue="banana"
          handleChange={handleChange}
        />
        <DropBox
          options={final}
          defaultValue="banana"
          handleChange={handleChange}
        />
        <AiFillAlert className="AiFillAlert" />
      </div>
      <TestLocation className="TestLocation" />
    </div>
  );
};

export default MainPages;
