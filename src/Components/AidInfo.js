import React from 'react'
import { useRecoilValue } from "recoil";
import {aidInfos} from "../Atoms/atoms";
import "../Styles/Info.scss";


const AidInfo = () => {
    const recoilValue = useRecoilValue(aidInfos); // 이거 근데 네이밍 밸류가 별로 안좋은 것 같음
    console.log(recoilValue)

    const {image,info} = recoilValue;

  return (
    <div className="Info">
    <img className="hospitalImage" alt="AidInfoImage" src={image} />
    <div className="InfoList">
      <p className="InfoText">{info}</p>
    </div>
  </div>
  )
}

export default AidInfo