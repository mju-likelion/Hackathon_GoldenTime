import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Info.scss";

const DetailPage = () => {
  const navigate = useNavigate();
  const goFirstAid = () => {
    navigate("/aid");
  };

  return (
    <div>
      상세정보페이지
      <button className="InfoButton" onClick={goFirstAid}>
        응급 조치 정보
      </button>
    </div>
  );
  //상세 정보에서 응급 조치 보도록 해야됨
};

export default DetailPage;
