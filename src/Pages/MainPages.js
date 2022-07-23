import React from "react";
import { useEffect, useState } from "react";
import { AiFillAlert } from "react-icons/ai";
import DropBox from "../Components/DropBox";
import Title from "../Components/Title";
import Info from "../Components/Info";
import TestLocation from "../Components/TestLocation";
import { si, seoul, gangnam, Symptom } from "../Datas/locationData.js";
import "../Styles/AiFillAlert.scss";
import "../Styles/DropBoxWrapper.scss";

const MainPages = () => {
  const [next, setNext] = useState([]);
  const [final, setFinal] = useState([]);
  const [send, setSend] = useState(""); //이거 나중에 제출 버튼 들어가면 그 때 한번에 문자열 합쳐서 서버로 전송
  const [symptom, setSymptom] = useState("");
  const [loading, setLoading] = useState(false); //이건 나중에 서버에서 데이터 받아오면 그 때 지도 렌더링
  const [choice, setChoice] = useState("선택한 값 ->");

  const handleChange = (e) => {
    // 이걸로 나중에 useState 관리해서 서버랑 통신
    if (e.target.value === "서울특별시") {
      setNext(seoul); //이거 로직 개구린데 ...?
    }
    if (e.target.value === "강남구") {
      setFinal(gangnam);
    }
    setSend(send.concat(e.target.value));
    setChoice(choice.concat(`${e.target.value},`));
    setSymptom(e.target.value);
  };

  const onSubmit = () => {
    setSend(send.concat(`,${symptom}`));
    console.log(send);
    setSend("");
    setLoading(true);
  };

  return (
    <div className="app">
      <Title name="응급실 찾기" />
      <div className="DropBoxWrapper">
        <DropBox options={si} handleChange={handleChange} />
        <DropBox options={next} handleChange={handleChange} />
        <DropBox options={final} handleChange={handleChange} />
        <AiFillAlert className="AiFillAlert" onClick={onSubmit} />
      </div>
      <div className="DropBoxWrapper">
        <DropBox options={Symptom} handleChange={handleChange} />
      </div>
      {loading && <div>{choice}</div>}
      {loading && <Info />}
      {loading && <TestLocation />}
    </div>
  );
};

export default MainPages;
