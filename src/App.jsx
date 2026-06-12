import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro"
import Main from "./pages/Main"
import Terms from "./pages/Terms"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;