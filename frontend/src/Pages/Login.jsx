import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const {headers} =
      const response = await axios.post("http://localhost:8000/api/v1/login", {
        email,
        password,
      });

      console.log(response);

      if (response.status === 200) {
        setMessage("Login successful");
        toast.success("Login successfully!");
        //With token coming from headers
        // localStorage.setItem('token', headers.authorization);
        localStorage.setItem("token", response.token);
        //Don't save the email in the localstorage
        localStorage.setItem("email", response.email);
        setError("");
        const token = response.data.token;
        Cookies.set("token", token), { expires: 1 };
        setIsAuthenticated(true);

        navigate("/");
      }
    } catch (error) {
      setError("Invalid credentials");
      toast.error(error.response.data.message);
      setMessage("");
    }
  };

  const handleLogout = async () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div
      className="max-h-screen bg-cover bg-center justify-center items-center flex flex-col"
      style={
        {
          // backgroundImage: `url(${backgroundImage})`,
        }
      }
    >
      <h2 className="flex text-3xl font-bold mb-6 mt-20 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white text-left text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="mt-1 p-2 w-full border rounded outline-none text-black bg-cyan-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-left text-sm">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mt-1 p-2 w-full border rounded outline-none text-black bg-cyan-50"
          />
        </div>
        <button
          // initialValue={{ scale: 0.9 }}
          // whileHover={{ scale: 1.02 }}
          // whileTap={{ scale: 0.9 }}
          type="submit"
          className="w-full bg-yellow-300 text-black p-2 rounded mt-4 font-bold hover:bg-orange-400"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

