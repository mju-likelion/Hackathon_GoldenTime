import React from 'react'
import { useRecoilValue } from "recoil";
import {aidInfos} from "../Atoms/atoms";
import "../Styles/Info.scss";

const Notice = () => {
    const recoilValue = useRecoilValue(aidInfos); // 이거 근데 네이밍 밸류가 별로 안좋은 것 같음
    console.log(recoilValue)

    const {firstaid} = recoilValue;

  return (
    <div className="Info">
    <img className="hospitalImage" alt="AidInfoImage" src={image} />
    <div className="InfoList">
      <p className="InfoText">{firstaid}</p>
    </div>
  </div>
  )
}

export default Notice