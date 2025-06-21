import { h } from "preact";
import { useRef } from "preact/hooks";
import "./../styles/AuthForm.css";

import { UserLogin, UserRegister } from "../api/Api";

export const AuthForm = ({ handle }) => {
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = handle
        ? await UserLogin(data)
        : await UserRegister(data);
      console.log(response);
      localStorage.setItem("JWT", response["token"]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="login-container">
      <form ref={formRef} onSubmit={handleSubmit} className="login-form">
        <h1 className="login-title">{handle ? "Login" : "Register"}</h1>

        {handle ? (
          <>
            <label className="form-label" htmlFor="login-user">
              Username or email
            </label>
            <input
              id="login-user"
              name="user"
              className="form-input"
              type="text"
              autoComplete="username"
              required
            />
          </>
        ) : (
          <>
            <label className="form-label" htmlFor="register-username">
              Username
            </label>
            <input
              id="register-username"
              name="name"
              className="form-input"
              type="text"
              autoComplete="username"
              required
            />

            <label className="form-label" htmlFor="register-email">
              Email
            </label>
            <input
              id="register-email"
              name="gmail"
              className="form-input"
              type="email"
              autoComplete="email"
              required
            />
          </>
        )}

        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          minLength={8}
          className="form-input"
          type="password"
          autoComplete={handle ? "current-password" : "new-password"}
          required
        />

        <div className="button-container">
          <button className="form-button" type="submit">
            {handle ? "Login" : "Register"}
          </button>
        </div>

        <div className="register-link">
          <p>
            {handle ? (
              <a href="/register">¿No tienes cuenta?</a>
            ) : (
              <a href="/login">¿Ya tienes cuenta?</a>
            )}
          </p>
        </div>
      </form>
    </section>
  );
};
