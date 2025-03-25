import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    axios
      .get("http://localhost:9000/users")
      .then((result) => {
        setUsers(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteUser(userId) {
    axios
      .delete(`http://localhost:9000/users/${userId}`)
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        ); // Ensures latest state
      })
      .catch((err) => {
        console.log("Error deleting user:", err);
      });
  }

  return (
    <div className="flex flex-col items-center bg-gray-900 p-6 min-h-screen text-white">
      {/* Create User Button */}
      <button
        className="bg-blue-500 hover:bg-blue-600 mb-4 px-4 py-2 rounded-md font-semibold transition"
        onClick={() => navigate("/register")}
      >
        Create User
      </button>

      {/* Display Users */}
      <div className="bg-gray-800 shadow-lg p-4 rounded-lg w-full max-w-md">
        <h2 className="mb-4 font-semibold text-xl text-center">User List</h2>
        {users.length === 0 ? (
          <p className="text-gray-400 text-center">No users found.</p>
        ) : (
          <ul>
            {users.map(function (user) {
              // user is an array of objects from mongodb which is randomly given name user but ican also say people
              <li
                key={user._id} // the id that comes from mongodb
                className="flex justify-between items-center p-2 border-gray-600 border-b"
              >
                <div>
                  <strong>Name:</strong> {user.name} <br />
                  <strong>Email:</strong> {user.email}
                </div>
                <div className="flex">
                  <button
                    className="bg-red-500 hover:bg-red-600 ml-4 px-3 py-1 rounded-md text-white transition"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>

                  <button
                    className="bg-green-500 hover:bg-green-600 ml-4 px-3 py-1 rounded-md text-white transition"
                    onClick={() => navigate(`/update/${user._id}`)}
                  >
                    Update
                  </button>
                </div>
              </li>;
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
