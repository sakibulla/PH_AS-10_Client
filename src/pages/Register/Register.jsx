import React, { useState, useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { useNavigate } from 'react-router';

const Register = () => {
    const { createUser, setUser, updateUser } = useContext(AuthContext);
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        if (name.length < 5) {
            setNameError("Name should be more than 5 characters");
            return;
        }
        setNameError("");

        const uppercasePattern = /[A-Z]/;
        const lowercasePattern = /[a-z]/;
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
            return;
        }
        if (!uppercasePattern.test(password)) {
            setPasswordError("Password must contain at least one uppercase letter");
            return;
        }
        if (!lowercasePattern.test(password)) {
            setPasswordError("Password must contain at least one lowercase letter");
            return;
        }
        setPasswordError("");

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                return updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo });
                        navigate("/");
                    });
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="card bg-base-100 w-full max-w-sm shadow-xl">
                <form onSubmit={handleRegister} className="card-body space-y-3">
                    <h2 className="text-2xl font-semibold text-center">Register</h2>

                    <label className="form-control">
                        <div className="label">Name</div>
                        <input name="name" type="text" className="input input-bordered" required />
                    </label>
                    {nameError && <p className="text-xs text-error">{nameError}</p>}

                    <label className="form-control">
                        <div className="label">Email</div>
                        <input name="email" type="email" className="input input-bordered" required />
                    </label>

                    <label className="form-control">
                        <div className="label">Photo URL</div>
                        <input name="photo" type="text" className="input input-bordered" required />
                    </label>

                    <label className="form-control">
                        <div className="label">Password</div>
                        <div className="relative">
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"} // ✅ toggle
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
                    {passwordError && <p className="text-xs text-error">{passwordError}</p>}

                    <button type="submit" className="btn btn-neutral w-full">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
