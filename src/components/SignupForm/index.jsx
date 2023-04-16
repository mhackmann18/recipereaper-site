import { Link } from "react-router-dom";
import "./account-form.css";

export default function SignupForm() {
  return (
    <form id="signup-form" className="account-form">
      <h2>Create an account</h2>
      <p id="signup-msg">
        Import your favorite recipes. Create your own recipes. Save it all in
        one place. Already have an account? <Link to="/login">Log in</Link>
      </p>
      <label htmlFor="username">Username</label>
      <input name="username" id="username" type="text" />
      <label htmlFor="password">Password</label>
      <input name="password" id="password" type="text" />
      <button type="submit" className="btn-default bg-eerie-black">
        Sign up
      </button>
    </form>
  );
}