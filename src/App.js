import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import TestLocation from "./Components/TestLocation";
import DropBox from "./Components/DropBox";

const OPTIONS = [
  { value: "apple", name: "사과" },
  { value: "banana", name: "바나나" },
  { value: "orange", name: "오렌지" },
]; // 일단 여기다가 놓는데 나중에 따로 뺄겁니당

const SelectBoxWrapper = styled.div`
  display: flex;
  width: 75%;
  margin-left: auto;
  margin-right: auto;
  flex: 1;
  justify-content: space-around;
  margin-top: 20px;
`;

function App() {
  return (
    <div className="App">
      <SelectBoxWrapper>
        <DropBox options={OPTIONS} defaultValue="banana" />
        <DropBox options={OPTIONS} defaultValue="banana" />
        <DropBox options={OPTIONS} defaultValue="orange" />
      </SelectBoxWrapper>
      <TestLocation />
    </div>
  );
}

export default App;
