import { Link, useNavigate } from "react-router-dom"
import { assests } from "../assets/assets"
import { useContext, useState } from "react"
import { loginUser } from "../service/AuthService";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";


export default function Login() {

  const navigate = useNavigate();

  const [loginData,setLoginData] = useState({
    email : '',
    password : ''
  });

  const {setToken} = useContext(StoreContext);

  const handleOnChange = (e) => {
    const {name,value} = e.target;
    setLoginData(prev => ({...prev,[name]:value}));
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await loginUser(loginData);
      if(response.status === 200){

        setToken(response.data.token);
        localStorage.setItem('token',response.data.token);
        toast.success("Login Successfully")
        navigate('/')
      }
      else{
        toast.error("Unable to login. Please try again.")
      }      
    }
    catch(error){
      if(error.response && error.response.status === 401){
        toast.error("Invalid username or password.")
      }
      else{
        toast.error("Unable to login. Please try again.")
      }
      
    }

  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center" style={{backgroundImage : `url(${assests.login})`}}>
      <div className="w-full max-w-md bg-white/30 backdrop-blur-md shadow-md rounded-lg p-8">
        <h2 className="text-center text-2xl font-light mb-6">Login</h2>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input type="email" id="email" placeholder="name@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="email"
              onChange={handleOnChange}
              value={loginData.email}
              required/>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" id="password" placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              name="password"
              onChange={handleOnChange}
              value={loginData.password}
              required/>
          </div>
          <div className="flex justify-center">
            <button type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-semibold uppercase cursor-pointer">
              Login
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-100">
          Don’t have an account?
          <Link to="/register" className="text-blue-900 hover:underline font-medium"> Register</Link>
        </p>
      </div>
    </div>

  )
}
