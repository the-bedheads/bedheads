import React, { useEffect, SyntheticEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
// Declare the type of data that will be handled in onSubmit function
type LoginExistingUser = {
  email: string;
  password: string;
};

interface AuthProps {
  handleLogin: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const Login: React.FC<AuthProps> = ({ handleLogin: [isAuthenticated, setAuth] }) => {
  const { errors } = useForm<LoginExistingUser>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const loginUser = () => {
    setAuth(true);
  };

  const logoutUser = () => {
    setAuth(false);
  };

  const onLogin = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const body = {
        email, password,
      };
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      console.log(parseRes.jwtToken);
      if (parseRes.jwtToken) {
        localStorage.setItem('token', parseRes.jwtToken);
        setAuth(true);
        console.log('Logged in? ', isAuthenticated);
        toast.success('Logged in successfully!');
      }
    } catch (err) {
      toast.error('Invalid credentials entered!');
      console.error(err.message);
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center my-5">Login</h1>
        <div className="row justify-content-center">
          <form onSubmit={onLogin}>
            <div className="form-group">
              <label htmlFor="email">
                Email
                <input
                  className="form-control my-3"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="error"> Enter A Valid Email </div>}
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Enter Password
                <input
                  className="form-control my-3"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <div className="error">Enter A Valid Password </div>}
              </label>
            </div>
            <div className="button">
              <button
                className="btn btn-success btn-block"
                type="submit"
              >
                Start Swapping
              </button>
              <a href="/register">Have a verification code? Sign Up Here</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
