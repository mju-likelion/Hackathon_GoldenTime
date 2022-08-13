import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineAlert } from "react-icons/ai";
import axios from "axios";
import { useSetRecoilState, useRecoilState } from "recoil";
import DropBox from "../Components/DropBox";
import Title from "../Components/Title";
import Info from "../Components/Info";
import TestLocation from "../Components/TestLocation";
import Select from "../Components/Select";
import { CITY, SEOUL, SYMPTOM } from "../Datas/locationData.js";
import { selectData, infoData } from "../Atoms/atoms";
import "../Styles/Info.scss";

const MainPages = () => {
  const [next, setNext] = useState([]); //구 설정 값
  const [address, setAddress] = useState(""); //서버에 보낼 문장
  const [symptom, setSymptom] = useState(""); //증상 설정 값
  const [loading, setLoading] = useState(false); //렌더링 로딩 조건
  const [data, setData] = useState([]); //axios 통신 데이터
  const [modal, setModal] = useState(false); // 모달 조건
  const setSelectData = useSetRecoilState(selectData); // 전역값을 통한 선택값 렌더링
  const InfoValue = useRecoilState(infoData);
  const hospitalInfoModal = InfoValue[0].address; //마커 클릭이벤트 모달 연동을 위함

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
      url: "https://hack4goldentime.link/api/hospital/inquire?",
      params: sendData,
    };

    axios(option).then(({ data }) => {
      setData(data);
      console.log(data);
      setLoading(true);
    });
  }, [address, symptom]);

  const handleAddress = useCallback(
    (e) => {
      const eventValue = e.target.value;
      if (eventValue === "서울특별시") {
        setNext(SEOUL);
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
    setSelectData({
      address: address,
      symptom: symptom,
    });
  }, [address, symptom]);

  return (
    <div className="page">
      <div className="dummy" />
      <div className="titleBox">
        <Title name="응급실 찾기" />
        {!modal && (
          <div className="DropBoxWrapper">
            <DropBox options={CITY} handleChange={handleAddress} />
            <DropBox options={next} handleChange={handleAddress} />
            <DropBox options={SYMPTOM} handleChange={handleSymptom} />
            <AiOutlineAlert className="AiFillAlert" onClick={onSubmit} />
          </div>
        )}
        {!modal && <p className="chocieText">검색 결과</p>}

        <div className="mainSelectList">
          {address && <Select select={address} />}
          {symptom && <Select select={symptom} />}
        </div>
      </div>
      {!modal && hospitalInfoModal && <Info props={dummy} />}
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
        {loading && !modal && (
          <button className="LastButton">다른 곳 더보기</button>
        )}
      </Link>
    </div>
  );
};

export default MainPages;
