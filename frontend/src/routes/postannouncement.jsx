import { useState } from 'react'
import "../styles/groupregister.scss"
import { useParams } from "react-router-dom"

function GroupRegister() {
    const { courseId } = useParams();
    const [contents, setContents] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function postAnnouncement(event) {
        event.preventDefault();
        const body = {
            "userid": sessionStorage.getItem("userid"),
            "groupid": courseId,
            "content": contents
        };

        try {
            const response = await fetch("http://127.0.0.1:8001/announcements/create", {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-type": "application/json"
                }
            });

            const res = response.status;
            const json = await response.json();

            if (res !== 200) {
                setErrorMessage(json.message);
            } else {
                window.open("/courses/" + courseId, "_self");
            }
        } catch (error) {
            // Handle network errors or other exceptions
            setErrorMessage("An error occurred while processing your request.");
        }
    }

    return (
        <>
            <div className="groupregister-main">
                <div className='groupregister-left'>
                    <h1>Create an announcement</h1>
                    <p className="error-message">{errorMessage}</p>
                    <form onSubmit={postAnnouncement}>
                        <textarea
                            type="textarea"
                            name="content"
                            id="content"
                            rows="4"
                            cols="50"
                            value={contents}
                            placeholder="Post contents..."
                            onChange={(e) => setContents(e.target.value)}
                        />
                        <input type="submit" value="CREATE ANNOUNCEMENT" />
                    </form>
                </div>
                <div className='groupregister-right'>
                    <div className="catchphrase">
                        <h1>Communicate with the class!</h1>
                        <h2>All your peers in one place</h2>
                    </div>
                </div>
            </div>
        </>
    )
}
export default GroupRegister
