import React, { useState, useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { Link } from 'react-router';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { resetPassword } = useContext(AuthContext);
  const [message, setMessage] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
   resetPassword(email)
  .then(() => {
    setMessage(
      <span>
        Check your inbox. 
        <a
          href="https://mail.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline ml-1"
        >
          Open Gmail
        </a>
      </span>
    );
  })
  .catch(error => {
    setMessage(error.message);
  });


  };

  return (
    <div className="w-96 mx-auto p-5 bg-base-200 mt-20 rounded">
      <h2 className="text-2xl font-bold mb-3">Reset Password</h2>

      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Enter your email"
          className="input input-bordered w-full mb-3"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn btn-primary w-full" type="submit">Send Reset Link</button>
      </form>

      {message && (
        <p className="mt-3 text-sm text-green-600">{message}</p>
      )}

      <p className="mt-3">
        Remember your password? <Link className="text-blue-500" to="/auth/login">Login</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
