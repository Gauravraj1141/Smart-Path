import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';

const SignIn = () => {
  const [loader, setloader] = useState(false);
  const [responsemsg, setresponsemsg] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    userType: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    console.log("trigger button");
    e.preventDefault();
    const validationErrors = {};

    if (!formData.username.trim()) {
      validationErrors.username = "Username is required";
    }
    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    }
    if (!formData.userType.trim()) {
      validationErrors.password = "Select Type is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("enter in the main thread");
      console.log(formData.userType,"enter in the main thread");
      setloader(true);

      axios
        .post("http://127.0.0.1:8000/auth/user_login/", {
          username: formData.username,
          password: formData.password,
          user_status: parseInt(formData.userType),
        })
        .then(function (response) {
          if (response.data.Status == 200) {
            const accessToken = response.data.Payload.access_token
            const profileId = response.data.Payload.user_profile_id
            const userStatus = response.data.Payload.user_status

            localStorage.setItem("accessToken",accessToken)
            localStorage.setItem("profileId",profileId)
            localStorage.setItem("userStatus",userStatus)
             
            if (userStatus == 1){

                navigate("/bookappointment");
            }
            else if(userStatus == 2){
                navigate("/appointment");

            }
            setloader(false);
          } else if (response.data.Status == 404) {
            setresponsemsg(response.data.Message);
            setloader(false);
          }
        })
        .catch(function (error) {
            setloader(false);
          console.log(error);
        });
    }
  };

  return (
    <div className="mt-16">
      <div className="mx-auto  lg:w-[50%] md:w-[56%] sm:w-[90%] p-8 space-y-3 rounded-xl bg-[#adc1e9] text-black-100">
        <h1 className="text-3xl font-bold text-center text-red-800">Sign In</h1>
        <form action="" className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1 text-sm">
            <label className="block text-black">
              Username
              <span className="text-red-600 font-semibold text-md"> *</span>
            </label>
            <input
              type="username"
              name="username"
              id="username"
              placeholder="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border-gray-700 bg-slate-50 text-black-100 focus:border-violet-400"
            />

            {errors.username && (
              <p className="text-red-500 text-xs">{errors.username}</p>
            )}
          </div>
          <div className="space-y-1 text-sm">
            <label className="block text-black">
              Password{" "}
              <span className="text-red-600 font-semibold text-md"> *</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border-gray-700 bg-slate-50 text-black-100 focus:border-violet-400"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>
          <div className="border-2 rounded-xl">
            <select
              name="userType"
              className="select text-black select-ghost border-2 w-full "
              value={formData.userType}
              onChange={handleChange}
            >
              <option value="" className="text-black">
                Please select your type
              </option>
              <option value="1" className="text-black">
                Patient
              </option>
              <option value="2" className="text-black">
                Doctor
              </option>
            </select>

            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>

          <div>
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

            <button
              to="/singIn"
              type="submit"
              className="block w-full p-3 text-center rounded-sm text-white bg-sky-700 text-xl "
            >
              Sign In
            </button>
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

export default SignIn;
