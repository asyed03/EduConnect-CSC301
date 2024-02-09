import { useState } from 'react'
import "../styles/groupregister.scss"

function GroupRegister() {
  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function groupRegisterPost(event) {
    event.preventDefault();
    const body = {
      "userid": sessionStorage.getItem("userid"),
      "groupName": groupName,
      "groupDesc": groupDesc
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
        setSuccessMessage("");
      } else {
        setErrorMessage("");
        setSuccessMessage("Group was created successfully.");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      setSuccessMessage("");
      setErrorMessage("An error occurred while processing your request.");
    }
  }
  return (
  <>
    <div className="groupregister-main">
      <div className='groupregister-left'>
        <h1>Create a Course</h1>
        <p className="error-message">{errorMessage}</p>
      <p className="success-message">{successMessage}</p>
        <form onSubmit={groupRegisterPost}>
          <input
              type="text"
              name="groupName"
              id ="groupName"
              value={groupName}
              placeholder="Course name..."
              onChange={(e) => setGroupName(e.target.value)}
          />
          <input
              type="text"
              name="groupDesc"
              id ="groupDesc"
              value={groupDesc}
              placeholder="A short description..."
              onChange={(e) => setGroupDesc(e.target.value)}
          />
          <input type="submit" value="CREATE COURSE"/>
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
