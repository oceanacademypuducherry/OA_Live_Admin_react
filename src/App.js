import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AddBatch from "./Components/Batch/AddBatch/AddBatch";
import UnAssignBatch from "./Components/Batch/UnAssignBatch/UnAssignBatch";
import UpdateBatch from "./Components/Batch/UpdateBatch/UpdateBatch";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Login/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="" element={<UnAssignBatch />} />

          <Route path="/add/to/batch" element={<UnAssignBatch />} />
          <Route path="/all/batch" element={<UpdateBatch />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
