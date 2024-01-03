import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
// import { BrowserRouter, RouterProvider, createBrowserRouter } from "react-router-dom";
// import Home from "./Components/Home/Home";
// import SignIn from "./Components/SignIn/SignIn";
// import OtpVerification from "./Components/OtpVerification/OtpVerification";
// import Appointments from "./Components/Appointments/Appointments";
// import BookAppointment from "./Components/BookAppointment/BookAppointment";
import App from "./App";


// const router = createBrowserRouter([
//   {
   
//     children: [
//       {
//         path: "/",
//         element:<Home></Home>
//       },
//       {
//         path: "/signIn",
//         element:<SignIn></SignIn>
//       },
//       {
//         path: "/appointment",
//         element:<Appointments></Appointments>
//       },
//       {
//         path: "/bookappointment",
//         element:<BookAppointment></BookAppointment>
//       },
//       {
//         path: "/OtpVerification",
//         element:<OtpVerification></OtpVerification>
//       },
     
//     ],
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <App />
  </React.StrictMode>
);
