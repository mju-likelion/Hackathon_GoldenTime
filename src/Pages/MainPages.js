import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillAlert } from "react-icons/ai";
import axios from "axios";
import DropBox from "../Components/DropBox";
import Title from "../Components/Title";
import Info from "../Components/Info";
import TestLocation from "../Components/TestLocation";
import { city, seoul, Symptom } from "../Datas/locationData.js";
import "../Styles/AiFillAlert.scss";
import "../Styles/DropBoxWrapper.scss";
import "../Styles/LastButton.scss";
import "../Styles/Link.scss";

//이거 나중에 임포트 정리하기, 이렇게 할거면 의미가 없음

const MainPages = () => {
  const [next, setNext] = useState([]); //구 설정 값
  const [address, setAddress] = useState(""); //서버에 보낼 문장
  const [symptom, setSymptom] = useState(""); //증상 설정 값
  const [loading, setLoading] = useState(false); //렌더링 로딩 조건
  //const [setting, setSetting] = useState(false); //클릭 완료 조건
  const [choice, setChoice] = useState("선택한 값 ->"); //내가 선택한 것 관리 string

  const getData = useCallback(() => {
    const sendData = {
      address: address,
      symptom: symptom,
    };

    const option = {
      method: "GET",
      url: "http://15.164.159.158:3000/api/hospital/inquire?",
      params: sendData,
    };

    axios(option).then(({ data }) => {
      console.log(data); // 통신 테스트
    });
  }, [address, symptom]);

  const handleAddress = useCallback(
    (e) => {
      // 이걸로 나중에 useState 관리해서 서버랑 통신

      const eventValue = e.target.value;
      if (eventValue === "서울특별시") {
        setNext(seoul);
        setChoice(choice.concat(`${eventValue} `));
        return; //서버랑 통신할 때 시는 필요 x
      }
      //setChoice("선택한 값 ->");
      setAddress(eventValue);
      setChoice(choice.concat(`${eventValue} `)); //띄어쓰기로 구별
      //setSymptom(eventValue);
    },
    [address, choice]
  );

  const handleSymptom = useCallback(
    (e) => {
      const eventValue = e.target.value;
      setChoice(choice.concat(`${eventValue} `)); //띄어쓰기로 구별
      setSymptom(eventValue);
    },
    [choice]
  );

  const onSubmit = useCallback(() => {
    getData();
    setLoading(true); // 여기서 전송 보내고 받으면 loading을 true로 -> 이거 나중에 axios로 넘기고
    console.log(`${address},${symptom}`);
    // setSetting(true);
  }, [address, symptom]);

  return (
    <div className="app">
      <Title name="응급실 찾기" />
      <div className="DropBoxWrapper">
        <DropBox options={city} handleChange={handleAddress} />
        <DropBox options={next} handleChange={handleAddress} />
        <AiFillAlert className="AiFillAlert" onClick={onSubmit} />
      </div>
      <div className="DropBoxWrapper">
        <DropBox options={Symptom} handleChange={handleSymptom} />
      </div>
      {loading && <div className="chocieText">{choice}</div>}
      {loading && <Info />}
      {loading && <TestLocation />}
      <Link to="/list" className="Link">
        {loading && <button className="LastButton">다른 곳 더보기</button>}
      </Link>
    </div>
  );
};

export default MainPages;
