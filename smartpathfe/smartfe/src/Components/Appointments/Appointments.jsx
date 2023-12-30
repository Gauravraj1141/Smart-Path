import { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const [responsedata, setresponsedata] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/doctor/fetch_appointments/", {
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
          setresponsedata(response.data.Payload);
          console.log(response.data.Payload, "reponse");
        }

        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Patient Name
              </th>
              <th scope="col" className="px-12 py-6">
                Illness Description
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {responsedata?.map((data, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {data.patient_name}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {data.illness_description}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {data.added_date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
