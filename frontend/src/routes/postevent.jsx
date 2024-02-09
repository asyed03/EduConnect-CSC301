import { useState } from 'react'
import "../styles/groupregister.scss"
import { useParams } from "react-router-dom"

function PostEvent() {
    const { courseId } = useParams();
    const [eventTitle, setEventTitle] = useState("");
    const [eventDesc, setEventDesc] = useState("");
    const [eventDate, setEventDate] = useState(Date.now());
    const [errorMessage, setErrorMessage] = useState("");

    async function postAnnouncement(event) {
        event.preventDefault();
        const body = {
            "userid": sessionStorage.getItem("userid"),
            "groupid": courseId,
            "title": eventTitle,
            "desc": eventDesc,
            "date": eventDate
        };

        try {
            const response = await fetch("http://127.0.0.1:8001/events/create", {
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
                window.open("/dashboard", "_self");
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
                    <h1>Create an Event</h1>
                    <p className="error-message">{errorMessage}</p>
                    <form onSubmit={postAnnouncement}>
                        <input
                            type="text"
                            name="eventName"
                            id="eventName"
                            value={eventTitle}
                            placeholder="Event title..."
                            onChange={(e) => setEventTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            name="eventDesc"
                            id="eventDesc"
                            value={eventDesc}
                            placeholder="A short description..."
                            onChange={(e) => setEventDesc(e.target.value)}
                        />
                        <input
                            type="date"
                            name="eventDate"
                            id="eventDate"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                        />
                        <input type="submit" value="CREATE EVENT" />
                    </form>
                </div>
                <div className='groupregister-right'>
                    <div className="catchphrase">
                        <h1>Collaborate with the class!</h1>
                        <h2>All your peers in one place</h2>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PostEvent
