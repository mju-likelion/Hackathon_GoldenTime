import React, { useCallback, useEffect, useState } from "react";
import { AiFillAlert } from "react-icons/ai";
import DropBox from "../Components/DropBox";
import Title from "../Components/Title";
import Info from "../Components/Info";
import TestLocation from "../Components/TestLocation";
import { si, seoul, gangnam, Symptom } from "../Datas/locationData.js";
import "../Styles/AiFillAlert.scss";
import "../Styles/DropBoxWrapper.scss";
import "../Styles/LastButton.scss";

const MainPages = () => {
  const [next, setNext] = useState([]); //구 설정 값
  const [final, setFinal] = useState([]); //동 설정 값
  const [send, setSend] = useState(""); //서버에 보낼 문장
  const [symptom, setSymptom] = useState(""); //증상 설정 값
  const [loading, setLoading] = useState(false); //렌더링 로딩 조건
  const [choice, setChoice] = useState("선택한 값 ->"); //내가 선택한 것 관리 string

  const handleChange = useCallback(
    (e) => {
      // 이걸로 나중에 useState 관리해서 서버랑 통신
      const eventValue = e.target.value;

      if (eventValue === "서울특별시") {
        setNext(seoul); //이대로 하려면 이거 서울에 있는 구 죄다 if로 때려 박아야 되는데 이거 로직 개구린데 ...?
      }
      if (eventValue === "강남구") {
        setFinal(gangnam);
      }
      setChoice("선택한 값 ->");
      setSend(send.concat(eventValue));
      setChoice(choice.concat(`${eventValue} `)); //띄어쓰기로 구별
      setSymptom(eventValue);
    },
    [send, choice]
  );

  const onSubmit = useCallback(() => {
    setSend(send.concat(`,${symptom}`));
    setSend("");
    setLoading(true);
  }, [send]);

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
      {loading && <div className="chocieText">{choice}</div>}
      {loading && <Info />}
      {loading && <TestLocation />}
      {loading && <button className="LastButton">다른 곳 더보기</button>}
    </div>
  );
};

export default MainPages;
