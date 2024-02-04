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
    <>
      <div>
        <a href="/login" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Educonnect</h1>
      <div className="card">
        <Link to="/login">
          <button>Sign in</button>
        </Link>
        <button onClick={getTest}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default Index
