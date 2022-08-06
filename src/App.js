import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import DetailPage from "./Pages/DetailPage";
import FirstAidPage from "./Pages/FirstAidPage";
import ListPage from "./Pages/ListPage";
import MainPages from "./Pages/MainPages";

function App() {
  const location = useLocation();
  return (
    <TransitionGroup className="transitions-wrapper">
      <CSSTransition key={location.pathname} classNames={"right"} timeout={300}>
        <Routes>
          <Route path="/" element={<MainPages />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/aid" element={<FirstAidPage />} />
          <Route path="/list" element={<ListPage />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
