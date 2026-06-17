import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro"
import Main from "./pages/Main"
import Terms from "./pages/Terms"
import Crew from "./pages/Crew"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/main" element={<Main />} />
        <Route path="/alert" element={<Crew />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;