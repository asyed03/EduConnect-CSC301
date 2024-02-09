import { useState } from 'react'
import "../styles/Login.scss"
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function loginPost(event) {
    event.preventDefault();
    const body = {
      "email": email,
      "password": password
    };

    const response = await fetch("http://127.0.0.1:8001/login", {
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
      sessionStorage.setItem("userid", json.id);
      window.open("/dashboard", "_self");
    }

    console.log("POST: ", res)
  }

  return (
    <>
      <div className="login-main">
        <div className='login-left'>
          <h2>Sign In</h2>
          <p>Sign in to your account.</p>

          <p className="error-message">{errorMessage}</p>

          <form onSubmit={loginPost}>
            <input type="email" name="email" id="email" placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" name="password" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />

            <a href="/" className='forgot'>Forgot Password?</a>
            <input type="submit" value="SIGN IN" />
            <div className="sign-up">
              <p>Don't have an account?</p>
              <Link to="/register">
                <span>SIGN UP</span>
              </Link>
            </div>
          </form>

        </div>
        <div className='login-right'>
          <div className="catchphrase">
            <h1>Engage with your <br />peers in one place.</h1>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
