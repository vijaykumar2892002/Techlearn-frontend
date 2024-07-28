import "./App.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes , useNavigate} from "react-router-dom";
import OpenRoute from "./components/auth/OpenRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import Navbar from "./components/common/Navbar";
import AboutSection from "./components/core/AboutPage/AboutSection";
import ContactUsPage from "./components/core/ContactUsSection/ContactUsPage";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import ForgotPassword from "./pages/ForgetPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/verifyEmail";
import Settings from "./components/core/Dashboard/Settings";
import { useDispatch, useSelector } from "react-redux";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constansts";
import AddCourse from "./components/core/Dashboard/AddCourse/index"
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  
  const { user } = useSelector((state) => state.profile)

  return (
    <div className="custom-app">
      <div className="navbar"><Navbar></Navbar></div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="catalog/:catalogName" element={<Catalog/>} />
        <Route path="courses/:courseId" element={<CourseDetails/>} />

        <Route path="/login" element={<OpenRoute>
          <Login />
        </OpenRoute>} />

        <Route path="/signup" element={<OpenRoute>
          <Signup />
        </OpenRoute>} />

        <Route path="/verify-email" element={<OpenRoute>
          < VerifyEmail />
        </OpenRoute>} />

        <Route path="/forgot-password" element={<OpenRoute>
          < ForgotPassword />
        </OpenRoute>} />

        <Route path="update-password/:id" element={<OpenRoute>
          <UpdatePassword />
        </OpenRoute>} />

        <Route path="/about" element={
          <AboutSection></AboutSection>
        } />

        <Route path="/contact" element={
          <ContactUsPage></ContactUsPage>
        } />


        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/Settings" element={<Settings />} />
          {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route path="dashboard/cart" element={<Cart />} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
          </>
        )
      }

      {
        user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
          <Route path="dashboard/instructor" element={<Instructor />} />
          <Route path="dashboard/add-course" element={<AddCourse />} />
          <Route path="dashboard/my-courses" element={<MyCourses />} />
          <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
          </>
        )
      }

        </Route>

        <Route element={
        <PrivateRoute>
          <ViewCourse />
        </PrivateRoute>
      }>

      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route 
            path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails />}
          />
          </>
        )
      }

      </Route>


        <Route path="*" element={<Error />} />
      </Routes>

    </div>
  );
}

export default App;
