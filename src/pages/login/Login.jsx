import { useState } from "react";

import style from "./Login.module.scss";
import { useDispatch } from "react-redux";
import { addUser, setUserError } from "../../pages/profile/userSlice";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
  
    const [loading, setLoading] = useState(false);
  
    const navigate = useNavigate();
  
    const dispatch = useDispatch();
  
    async function handleSubmit(e) {
      e.preventDefault();
  
      setLoading(true);
  
      try {
        const response = await fetch("http://localhost:8080/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName, password }),
        });
  
        if (!response.ok) {
          throw new Error("User login failed!");
        }
        const userData = await response.json();
        dispatch(addUser(userData));
        navigate("/");
      } catch (error) {
        dispatch(setUserError(error.message));
      } finally {
        setLoading(false);
      }
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="card w-full max-w-sm shadow-lg bg-gray-800">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                placeholder="Enter your username"
                className="input input-bordered"
                id='username'
                type='text'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary w-full"
                disabled={!(userName && password) || loading}
               >
                {loading ? "In process..." : "Login"}
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
