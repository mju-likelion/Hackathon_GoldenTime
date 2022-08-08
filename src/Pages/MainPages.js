import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillAlert } from "react-icons/ai";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import DropBox from "../Components/DropBox";
import Title from "../Components/Title";
import Info from "../Components/Info";
import TestLocation from "../Components/TestLocation";
import Select from "../Components/Select";
import { city, seoul, Symptom } from "../Datas/locationData.js";
import { selectData } from "../Atoms/atoms";
import "../Styles/AiFillAlert.scss";
import "../Styles/DropBoxWrapper.scss";
import "../Styles/LastButton.scss";
import "../Styles/Link.scss";
import "../Styles/Select.scss";

//이거 나중에 임포트 정리하기, 이렇게 할거면 의미가 없음

const MainPages = () => {
  const [next, setNext] = useState([]); //구 설정 값
  const [address, setAddress] = useState(""); //서버에 보낼 문장
  const [symptom, setSymptom] = useState(""); //증상 설정 값
  const [loading, setLoading] = useState(false); //렌더링 로딩 조건
  const [data, setData] = useState([]); //axios 통신 데이터
  const [modal, setModal] = useState(false); // 이거 나중에 모달로 변경해서 지도 확대하는거 구현
  const setSelectData = useSetRecoilState(selectData);

  const dummy = {
    dutyAddr: "",
    dutyName: "",
    dutyTel3: "", // 형식 맞추기 위한 더미 객체
  };

  const OpenMap = () => {
    setModal(true);
  };
  const CloseMap = () => {
    setModal(false);
  };

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
      console.log(option.params);
      setData(data);
      setLoading(true);
      console.log(data);
    });
  }, [address, symptom]);

  const handleAddress = useCallback(
    (e) => {
      const eventValue = e.target.value;
      if (eventValue === "서울특별시") {
        setNext(seoul);
        return; //서버랑 통신할 때 시는 필요 x
      }
      setAddress(eventValue);
    },
    [address]
  );

  const handleSymptom = (e) => {
    const eventValue = e.target.value;
    setSymptom(eventValue);
  };

  const onSubmit = useCallback(() => {
    getData();
    console.log(`${address},${symptom}`); //이것도 나중에 삭제
    setSelectData({
      address: address,
      symptom: symptom,
    });
  }, [address, symptom]);

  return (
    <div className="app">
      <Title name="응급실 찾기" />
      {!modal && (
        <div className="DropBoxWrapper">
          <DropBox options={city} handleChange={handleAddress} />
          <DropBox options={next} handleChange={handleAddress} />
          <DropBox options={Symptom} handleChange={handleSymptom} />
          <AiFillAlert className="AiFillAlert" onClick={onSubmit} />
        </div>
      )}
      {!modal && <p className="chocieText">검색 결과</p>}

      <div className="mainSelectList">
        {address && <Select select={address} />}
        {symptom && <Select select={symptom} />}
      </div>

      {loading && !modal && <Info props={dummy} />}
      {loading && !modal && <TestLocation data={data} name="TestLocation" />}
      {loading && !modal && (
        <button className="ModalButton" onClick={OpenMap}>
          지도에서 보기
        </button>
      )}

      {modal && <TestLocation data={data} name="TestLocation1" />}
      {modal && (
        <button className="ModalButton" onClick={CloseMap}>
          화면으로 보기
        </button>
      )}

      <Link to="/list" state={data} className="Link">
        {loading && <button className="LastButton">다른 곳 더보기</button>}
      </Link>
    </div>
  );
};

export default MainPages;
