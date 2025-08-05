import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,        // Changed from username to email
          password: password,
        }),
      });

      const data = await res.json();
      console.log('Response:', data); // Debug log
      
      if (res.ok && data.access_token) {  // Check for access_token instead of token
        alert('Login success!');
        console.log(data);
        // Store the token if needed
        localStorage.setItem('token', data.access_token);
        navigate('/dashboard');
      } else {
        alert('Login failed: ' + (data.message || 'Invalid credentials'));
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login error: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 dark:from-neutral-800 dark:to-neutral-900">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden dark:bg-neutral-900 transition-all duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative hidden lg:block">
            <img src="/img-placeholder.svg" alt="Login Visual" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-blue-600 opacity-80"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-white">
              <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
              <p className="text-lg">Unlock exclusive features by logging in.</p>
              <span className="mt-6 inline-flex items-center rounded-full bg-purple-500 px-4 py-2 text-xs font-medium shadow-lg hover:bg-purple-400 transition">
                🚀 New Features Await
              </span>
            </div>
          </div>

          <div className="px-10 py-14">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Log In</h1>
              <p className="text-gray-600 mt-2 dark:text-neutral-400">
                Access your dashboard and continue where you left off.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@mail.com"
                  className="mt-1 w-full px-4 py-2 rounded-lg shadow-sm border border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="changeme"
                  className="mt-1 w-full px-4 py-2 rounded-lg shadow-sm border border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-neutral-400">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300 dark:border-neutral-600" />
                  Remember me
                </label>
                <a href="#" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition shadow-md"
              >
                Log In
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600 dark:text-neutral-400">
              Don't have an account?
              <NavLink to="/register" className="ml-1 font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Sign Up
              </NavLink>
            </div>

            {/* Test credentials helper */}
            <div className="mt-4 p-3 bg-gray-100 dark:bg-neutral-800 rounded-lg text-xs text-gray-600 dark:text-neutral-400">
              <strong>Test Credentials:</strong><br />
              Email: john@mail.com<br />
              Password: changeme
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}