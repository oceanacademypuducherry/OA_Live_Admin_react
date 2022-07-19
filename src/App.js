import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import APIDocs from "./Components/API_Docs/API_Docs";

import AssingBatch from "./Components/Batch/AssingBatch/AssingBatch";
import SeeAllBatch from "./Components/Batch/SeeAllBatch/SeeAllBatch";
import UnAssignBatch from "./Components/Batch/UnAssignBatch/UnAssignBatch";
import AddCourse from "./Components/Course/AddCourse/AddCourse";
import SeeAllCourse from "./Components/Course/SeeAllCourse";
import SeeAllOfflineCourse from "./Components/Course/SeeAllOfflineCourse";

import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Login/SignUp";
import OfflineCourseDownloadedUser from "./Components/OfflineCourseDownloadedUser/OfflineCourseDownloadedUser";
import AddMentor from "./Components/Wbinar/AddMentor/AddMentor";
import AddWebinar from "./Components/Wbinar/AddWebinar/AddWebinar";
import AllWebinar from "./Components/Wbinar/AllWebinar/AllWebinar";
import WebinarInfo from "./Components/Wbinar/WebinarInfo/WebinarInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="" element={<SeeAllCourse />} />
          <Route path="/all/course" element={<SeeAllCourse />} />
          <Route path="/all/offlinecourse" element={<SeeAllOfflineCourse />} />
          <Route path="/add/course" element={<AddCourse />} />
          <Route path="/add/course/:courseId" element={<AddCourse />} />

          <Route path="/add/to/batch" element={<UnAssignBatch />} />
          <Route path="/add/to/batch/:index" element={<AssingBatch />} />
          <Route path="/all/batch" element={<SeeAllBatch />} />
          <Route path="/add/mentor" element={<AddMentor />} />
          <Route path="/add/webinar" element={<AddWebinar />} />
          <Route path="/all/webinar" element={<AllWebinar />} />
          <Route path="/webinar/info" element={<WebinarInfo />} />
          <Route
            path="/offline/course/downloaded/user"
            element={<OfflineCourseDownloadedUser />}
          />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/apis" element={<APIDocs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
