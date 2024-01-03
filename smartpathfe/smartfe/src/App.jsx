import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Components/Home/Home";
import SignIn from "./Components/SignIn/SignIn";
import OtpVerification from "./Components/OtpVerification/OtpVerification";
import Appointments from "./Components/Appointments/Appointments";
import BookAppointment from "./Components/BookAppointment/BookAppointment";
import Navbar from "./Components/Navbar/Navbar";
import SignUp from "./Components/Home/SignUp/SignUp";
import UserProfile from "./Components/UserProfile/UserProfile";
import Success from "./Components/Success/Success";




function App() {

  return (
    <>
     <BrowserRouter >
    <Navbar></Navbar> 


     <Routes>

     <Route path={"/"} element={<Home></Home>}></Route>
     <Route path={"/signIn"} element={<SignIn></SignIn>}></Route>
     <Route path={"/Success"} element={<Success></Success>}></Route>
     <Route path={"/signUp"} element={<SignUp></SignUp>}></Route>
     <Route path={"/appointment"} element={<Appointments></Appointments>}></Route>
     <Route path={"/bookappointment"} element={<BookAppointment></BookAppointment>}></Route>
     <Route path={"/OtpVerification"} element={<OtpVerification></OtpVerification>}></Route>
     <Route path={"/UserProfile"} element={<UserProfile></UserProfile>}></Route>

     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
