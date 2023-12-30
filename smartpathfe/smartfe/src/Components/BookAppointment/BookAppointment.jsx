import { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const BookAppointment = () => {
  const [loader, setloader] = useState(false);
  const [responsemsg, setresponsemsg] = useState("");
//   const navigate = useNavigate();

  const [formData, setFormData] = useState({
    doctor: "",
    desc: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("button has been pressed");
    const validationErrors = {};

    if (!formData.doctor.trim()) {
      validationErrors.doctor = "Selecting a doctor is mandatory.";
    }
    if (!formData.desc.trim()) {
      validationErrors.desc = "Providing a description of the illness is obligatory.";
    }


    setErrors(validationErrors);

    const accessToken = localStorage.getItem("accessToken")

    if (Object.keys(validationErrors).length === 0) {
      setloader(true);

      console.log(formData.desc,formData.doctor,'>>>>it it oth')
      
      axios
      .post("http://127.0.0.1:8000/patient/book_appointment/", {
          description: formData.desc,
          doctor: formData.doctor,
        },{
            headers: {
                'Content-Type': 'application/json',
                'accesstoken': accessToken
            }})
            .then(function (response) {
                console.log(response,">>>it is sinple response")
                if (response.data.Status == 200) {
                    // navigate("/OtpVerification", { state: response.data.Message });
                    console.log(response.data," when coming 200 error")
                    setloader(false);
                    
                } else if (response.data.Status == 404) {
                    setloader(false);
                    setresponsemsg(response.data.Message);
                    console.log(response.data," when coming 404 error")
                }
            })
            .catch(function (error) {
            setloader(false);
          console.log(error);
        });
    }
  };

  const [responsedata, setresponsedata] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/doctor/fetch_doctors/")
      .then(function (response) {
        if (response.data.Status == 404) {
          setresponsedata(response.data.Payload);
        }
        if (response.data.Status == 200) {
          setresponsedata(response.data.Payload);
        }

        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="mt-10">
      <div className="mx-auto lg:w-[50%] md:w-[56%] sm:w-[90%] p-8 space-y-3 rounded-xl bg-[#bbffa0] text-black-100">
        <h1 className="text-3xl font-bold text-center  text-Black-800">
          Book Appointment
        </h1>
        <form action="" className="space-y-6" onSubmit={handleSubmit}>


          <div className="border-2 rounded-xl">
            <select
              name="doctor"
              className="select text-black select-ghost border-2 w-full"
              value={formData.doctor}
              onChange={handleChange}
            >
              <option value="" className="text-black">
                Select Your Doctor
              </option>

              {responsedata?.map((data, index) => (
                <option
                  key={index}
                  value={data.profile_id}
                  className="text-black"
                >
                  {data.first_name} {data.last_name}
                </option>
              ))}
            </select>

            {errors.doctor && (
              <p className="text-red-500 text-xs">{errors.doctor}</p>
            )}
          </div>

          <div className="space-y-1 text-sm">
            <label className="block text-black">
              Illness Description
              <span className="text-red-600 font-semibold text-md"> *</span>
            </label>
            <input
              type="desc"
              name="desc"
              id="desc"
              placeholder="illness desccription"
              value={formData.desc}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-md border-gray-700 bg-slate-50 focus:border-violet-400 ${
                errors.desc ? "border-red-500" : ""
              }`}
            />
            {errors.desc && (
              <p className="text-red-500 text-xs">{errors.desc}</p>
            )}
          </div>
          <button
            type="submit"
            className="block w-full p-3 text-center rounded-sm text-white bg-sky-700 text-xl"
          >
            Book
          </button>


          <div role="status">
            {loader && (
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />{" "}
              </svg>
            )}
          </div>
        </form>

        {responsemsg && (
          <div className="bg-white-500 border-pink-700 text-red-600">
            {responsemsg}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
