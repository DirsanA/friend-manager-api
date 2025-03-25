import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const UpdateUser = () => {
  const { id } = useParams();
  console.log("User ID:", id);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  // ✅ Fetch user details
  function featchUser() {
    axios
      .get(`http://localhost:9000/users/${id}`)
      .then((result) => {
        setName(result.data.name);
        setEmail(result.data.email);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  useEffect(() => {
    featchUser();
  }, [id]);

  // ✅ Submit updated user details
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9000/users/update/${id}`, {
        name,
        email,
      });
      console.log("User updated successfully");
    } catch (err) {
      console.error("Error updating user:", err);
    }
  }

  return (
    <div className="flex justify-center items-center bg-black min-h-screen text-white">
      <div className="bg-gray-800 shadow-lg p-6 rounded-lg w-80">
        <h1 className="mb-4 font-semibold text-xl text-center">Update User</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-700 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-gray-700 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white"
            />
          </div>

          <button
            type="submit"
            onClick={function () {
              navigate("/");
            }}
            className="bg-blue-500 hover:bg-blue-600 py-2 rounded-md w-full font-semibold text-white transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
