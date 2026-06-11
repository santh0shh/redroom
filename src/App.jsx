import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro"
import Main from "./pages/Main"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;