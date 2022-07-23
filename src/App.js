import "./App.css";
import { Route, Routes } from "react-router-dom";
import DetailPage from "./Pages/DetailPage";
import FirstAidPage from "./Pages/FirstAidPage";
import ListPage from "./Pages/ListPage";
import MainPages from "./Pages/MainPages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPages />} />
      <Route path="/detail" element={<DetailPage />} />
      <Route path="/aid" element={<FirstAidPage />} />
      <Route path="/list" element={<ListPage />} />
    </Routes>
  );
}

export default App;
