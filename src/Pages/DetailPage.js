import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Title from "../Components/Title";
import DetailInfo from "../Components/DetailInfo";
import LoadRoute from "../Components/LoadRoute";
import Select from "../Components/Select";
import { coordinates, selectData } from "../Atoms/atoms";
import "../Styles/Info.scss";

const DetailPage = () => {
  const [modal, setModal] = useState(false);
  const { address, symptom } = useRecoilValue(selectData);
  const navigate = useNavigate();
  //세빈이가 할 로직
  const goFirstAid = () => {
    //첫번째로, axios 관련 설정 먼저해야지? ex) mainpage
    //데이터 요청 끝나면(then안에서, 리코일 셋팅을 해야지? -> 리코일 임포트 하고, 너가 셋팅할 리코일 밸류를 임포트해야겠지?) ex) mainpage // atom은 aidinfo로
    //리코일 셋팅 끝나면 밑에처럼 네비게이션으로 페이지를 옮겨야겠지? -> 이미 이건 코드가 있음.
    navigate("/aid");
  };
  const OpenMap = () => {
    setModal(true);
  };
  const CloseMap = () => {
    setModal(false);
  };

  return (
    <div>
      <Title name="응급실 찾기" />
      <p className="chocieText">검색 결과</p>
      <div className="mainSelectList">
        {address && <Select select={address} />}
        {symptom && <Select select={symptom} />}
      </div>
      {!modal && <DetailInfo />}
      {!modal && <p className="chocieText">추천 최단 경로</p>}
      {!modal && <LoadRoute name="TestLocation" />}

      {!modal && (
        <button className="ModalButton" onClick={OpenMap}>
          지도에서 보기
        </button>
      )}

      {modal && <LoadRoute name="TestLocation1" />}
      {modal && (
        <button className="ModalButton" onClick={CloseMap}>
          화면으로 보기
        </button>
      )}
      <button className="LastButton" onClick={goFirstAid}>
        응급 조치 정보
      </button>
    </div>
  );
  //상세 정보에서 응급 조치 보도록 해야됨
};

export default DetailPage;
