import { useState } from 'react'
import viteLogo from '/vite.svg'
import { Link } from "react-router-dom"
import '../App.css'

function Index() {
  const [count, setCount] = useState(0)

  async function getTest() {
    const response = await fetch("http://127.0.0.1:8001");
    const res = await response.json();
    console.log("GET: ", res);

    setCount(res.counter);
  }

  return (
    <div className="landing">
      <div>
        <a href="/login" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Edu-Connect</h1>
      <p>Connect with your peers</p>
      <div className="card">
        <Link to="/login">
          <button>Sign in</button>
        </Link>
        <Link to="/register">
          <button>Sign up</button>
        </Link>
      </div>
    </div>
  )
}

export default Index
