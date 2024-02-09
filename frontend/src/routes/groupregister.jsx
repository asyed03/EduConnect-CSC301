import { useState } from 'react'
import "../styles/groupregister.scss"
import Menu  from "../components/menu";
import LeftMenu  from "../components/left_menu";
import { Link } from "react-router-dom"

function GroupRegister() {
  const [groupName, setGroupName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function groupRegisterPost(event) {
    event.preventDefault();
    const body = {
      "groupName": groupName,
    };

    try {
      const response = await fetch("http://127.0.0.1:8001/groupregister", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json"
        }
      });
      const res = response.status;
      const json = await response.json();
      // Check if the response status indicates success
      if (res !== 200) {
        // Reset error message if registration was successful
        setErrorMessage(json.message);
      } else {
        // If the server responded with an error status, parse the JSON response
        setErrorMessage("");
        console.log("POST: ", res);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      setErrorMessage("An error occurred while processing your request.");
    }
  }
  return (
  <>
    <Menu />
    <LeftMenu />
    <div className="groupregister-main">
      <div className='groupregister-left'>
        <h1>Create a Group <br/></h1>
        <p className="error-message">{errorMessage}</p>
        <form onSubmit={groupRegisterPost}>
          <input
              type="groupName"
              name="groupName"
              id ="groupName"
              value={groupName}
              placeholder={"Enter a Name For Your Group!"}
              onChange={(e) => setGroupName(e.target.value)}
          />
          <input type="submit" value="CREATE GROUP"/>
        </form>
      </div>
      <div className='groupregister-right'>
        <div className="catchphrase">
          <h1>Join All Your Classmates!</h1>
          <h2>All your peers in one place</h2>
        </div>
      </div>
    </div>
  </>
  )
}
export default GroupRegister
