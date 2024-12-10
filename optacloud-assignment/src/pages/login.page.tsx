import React, { FormEvent, useEffect, useRef, useState } from "react";
import Button from "../components/shared/Button/Button";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/auth.hook";

const Login = () => {
  const [details, setDetails] = useState<FormData>();
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<boolean>(false);
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 2500);
    }
  }, [error]);
  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/users/login", {
      username: username.current?.value,
      password: password.current?.value,
    });

    if (res.data.status === "success") {
      auth?.setAuth({ username: res.data.username, authenticated: true });
      navigate("/home");
    } else {
      setError(true);
    }
  }
  return (
    <section className="size-full flex items-center justify-center">
      <div className="p-4 shadow-xl shadow-black/10 rounded-none sm:rounded-2xl border-2 gap-2 border-black/10 flex flex-col w-full h-full sm:w-[400px] sm:h-fit">
        <form onSubmit={handleLogin} className="flex flex-col gap-2">
          <div className="text-2xl font-medium">Login</div>
          {error && (
            <div className="text-red-500">Invalid username or password</div>
          )}
          {/* <div className="text-xl font-medium text-black/70"></div> */}
          <input
            name="username"
            ref={username}
            required
            type="text"
            placeholder="Username"
            className="w-full rounded-xl text-xl p-2 outline-none border-2 border-black/20 focus:border-primary"
          />
          <input
            ref={password}
            name="password"
            required
            type="password"
            placeholder="Password"
            className="w-full rounded-xl text-xl p-2 outline-none border-2 border-black/20 focus:border-primary"
          />
          <Button onClick={() => {}}>Login/Create Account</Button>
        </form>
      </div>
    </section>
  );
};

export default Login;
