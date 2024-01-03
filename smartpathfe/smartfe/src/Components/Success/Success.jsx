import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  const handleredirect = (path) => {
    if (path == "Login") {
      navigate("/signIn");
    }
  };

  return (
    <div className="mt-20">
      <div className="mx-auto  lg:w-[40%] md:w-[50%] sm:w-[90%] p-8 space-y-3 rounded-xl bg-[#adc1e9] text-black-100">
        <h1 className="text-3xl font-bold text-center text-green-800">
          Register Successful
        </h1>
        <p className="text-center text-black">
          Kindly log in to schedule an appointment.
        </p>

        <div className="px-4 py-5 sm:px-6 text-center">
          <button
            type="button"
            onClick={() => handleredirect("Login")}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Sign IN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
