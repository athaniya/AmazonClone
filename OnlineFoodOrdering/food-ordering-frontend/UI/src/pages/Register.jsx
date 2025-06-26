import { Link, useNavigate } from "react-router-dom";
import { assests } from "../assets/assets";
import { useState } from "react";
import { registerUser } from "../service/AuthService";
import { toast } from "react-toastify";

export default function Register() {

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  function handleOnChange(event) {
    const { name, value } = event.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    try{
      const status = await registerUser(userData);

      if(status === 201){
        toast.success("Registration successfull. Please login to continue.");
      }
      else{
        toast.error("Unable to register. Please try again.")
      }
    }catch(error){
      console.log(error);
      toast.error("Error occurred while registering. Please try again")
    }
    
    setUserData({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    })

    navigate('/login');

  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center"
      style={{ backgroundImage: `url(${assests.register})` }}
    >
      <div className="w-full max-w-md bg-white/30 backdrop-blur-md shadow-md rounded-lg p-8">
        <h2 className="text-center text-2xl font-light mb-6">Register</h2>
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="John"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleOnChange(e)}
              value={userData.firstName}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleOnChange(e)}
              value={userData.lastName}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleOnChange(e)}
              value={userData.email}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleOnChange(e)}
              value={userData.password}
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-semibold uppercase cursor-pointer"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-100">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-800 hover:underline font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
}
