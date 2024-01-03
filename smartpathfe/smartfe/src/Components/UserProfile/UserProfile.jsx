import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const [responsedata, setresponsedata] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  const navigate = useNavigate();

  const handleredirect = (path) => {
    if (path == "BookAppointment") {
      navigate("/bookappointment");
    }
    if (path == "Appointments") {
      navigate("/appointment");
    }
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/auth/fetch_user_profile/", {
        headers: {
          "Content-Type": "application/json",
          accesstoken: accessToken,
        },
      })
      .then(function (response) {
        if (response.data.Status == 404) {
          setresponsedata(response.data.Payload);
        }
        if (response.data.Status == 200) {
          setresponsedata(response.data.Payload[0]);
        }

        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="mt-20">
      <div className="mx-auto lg:w-[50%] md:w-[56%] sm:w-[90%] rounded-xl text-black-100">
        <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 text-center">
            <h1 className="text-lg leading-6 font-medium text-gray-900">
              Welcome {responsedata.username}
            </h1>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Username</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {responsedata.username}
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {responsedata.email_id}
                </dd>
              </div>

              <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="mr-2">{responsedata.first_name}</span>
                  {responsedata.last_name}
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">User Type</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {responsedata.usertype}
                </dd>
              </div>

              {/* show buttons for diff types of user / */}

              {responsedata.status == 1 && (
                <div className="px-4 py-5 sm:px-6 text-center">
                  <button
                    type="button"
                    onClick={() => handleredirect("BookAppointment")}
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Book Appointment
                  </button>
                </div>
              )}

              {responsedata.status == 2 && (
                <div className="px-4 py-5 sm:px-6 text-center">
                  <button
                    type="button"
                    onClick={() => handleredirect("Appointments")}
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Show Appointments
                  </button>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
