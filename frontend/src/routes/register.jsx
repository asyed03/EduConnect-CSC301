import { useState } from 'react'
import "../styles/Register.scss"
import { Link } from "react-router-dom"

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function registerPost(event) {
    event.preventDefault();
    const body = {
      "email": email,
      "password": password,
      "confirmPassword": confirmPassword
    };

    const response = await fetch("http://127.0.0.1:8001/register", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json"
      }
    });

    const res = response.status;
    const json = await response.json();

    if (res != 200) {
      setErrorMessage(json.message);
    }
    else {
      setErrorMessage("");
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
                <input type="password" name="password" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="confirmPassword" name="confirmPassword" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                <input type="submit" value="SIGN UP" />
                <div className="sign-in">
                  <p>Already have an account?</p>
                  <Link to="/login">
                    <a>SIGN IN</a>
                  </Link>
                </div>
            </form>

        </div>
        <div className='register-right'>
            <div className="catchphrase">
                <h1>Engage with your <br/>peers in one place.</h1>
                <p>Lorem ipsum dolor sit amet.</p>
            </div>
        </div>
      </div>
    </>
  )
}

export default Register
