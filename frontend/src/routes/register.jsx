import { useState } from 'react'
import "../styles/Register.scss"
import { Link } from "react-router-dom"

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [picture, setPicture] = useState(null);

  async function registerPost(event) {
    event.preventDefault();

    const fd = new FormData();
    fd.append("picture", picture);
    fd.append("email", email);
    fd.append("username", username);
    fd.append("password", password);
    fd.append("confirmPassword", confirmPassword);

    const response = await fetch("http://127.0.0.1:8001/register", {
      method: "POST",
      body: fd
    });

    const res = response.status;
    const json = await response.json();

    if (res != 200) {
      setErrorMessage(json.message);
    }
    else {
      window.open("/login", "_self");
    }

    console.log("POST: ", res)
  }

  return (
    <>
      <div className="register-main">
        <div className='register-left'>
          <h2>Sign Up</h2>
          <p>Create your profile.</p>

          <p className="error-message">{errorMessage}</p>

          <form onSubmit={registerPost}>
            <input type="email" name="email" id="email" placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" name="username" id="username" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" name="password" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" name="confirmPassword" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <input type="file" name="picture" onChange={(e) => {setPicture(e.target.files[0])}} />

            <input type="submit" value="SIGN UP" />
            <div className="sign-in">
              <p>Already have an account?</p>
              <Link to="/login">
                <span>SIGN IN</span>
              </Link>
            </div>
          </form>

        </div>
        <div className='register-right'>
          <div className="catchphrase">
            <h1>Engage with your <br />peers in one place.</h1>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
