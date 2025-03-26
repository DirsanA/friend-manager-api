import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  function submitHandler() {
    const nameChecking = name;
    const emailChecking = email;
  }

  return (
    <div className="flex justify-center items-center bg-black min-h-screen text-white">
      <div className="bg-gray-800 shadow-lg p-6 rounded-lg w-80">
        <h1 className="mb-4 font-semibold text-xl text-center">Login</h1>

        <form className="space-y-4" onSubmit={submitHandler}>
          <div>
            <label className="block mb-1 text-sm">User Name</label>
            <input
              type="text"
              value={name}
              onChange={function (e) {
                setName(e.target.value);
              }}
              placeholder="Enter your name"
              className="bg-gray-700 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={function (e) {
                setEmail(e.target.value);
              }}
              placeholder="Enter your email"
              className="bg-gray-700 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 py-2 rounded-md w-full font-semibold text-white transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
