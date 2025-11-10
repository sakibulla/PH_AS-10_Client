import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        toast.success("Login successful!", { autoClose: 3000 });
        navigate(from, { replace: true });
      })
      .catch((err) => toast.error(err.message || "Login failed", { autoClose: 3000 }));
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Google login successful!", { autoClose: 3000 });
        navigate(from, { replace: true });
      })
      .catch((err) => toast.error(err.message || "Google login failed", { autoClose: 3000 }));
  };

  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="card bg-base-100 w-full max-w-sm shadow-xl">
        <form onSubmit={handleLogin} className="card-body space-y-3">
          <h2 className="text-2xl font-semibold text-center">Login</h2>

          <label className="form-control">
            <div className="label">Email</div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered"
              required
            />
          </label>

          <label className="form-control">
            <div className="label">Password</div>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full"
                required
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </label>

          <p className="text-sm">
            Forgot password?{" "}
            <Link to="/auth/forgot-password" className="text-blue-500">
              Reset
            </Link>
          </p>

          <button className="btn btn-neutral w-full">Login</button>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full flex items-center justify-center gap-2"
        >
          <FcGoogle size={24} />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
