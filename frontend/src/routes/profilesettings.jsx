import { useEffect, useState } from "react";
import "../styles/ProfileSettings.scss"
import Menu from "../components/menu";

function ProfileSettings() {
    const [email, setEmail] = useState("");
    const [events, setEvents] = useState([]);

    async function fetchData() {
        try {
            const res = await fetch(`http://127.0.0.1:8001/users/${sessionStorage.getItem("userid")}`);
            const data = await res.json();
            setEmail(data.email);

            const eventsResponse = await fetch(`http://127.0.0.1:8001/events/${sessionStorage.getItem("userid")}`);
            const eventsData = await eventsResponse.json();

            const userId = parseInt(sessionStorage.getItem("userid"));
            const tempEvents = eventsData.filter((event) => {
                for (let id of event.attending) {
                    if (userId == id) {
                        return true;
                    }
                }

                return false;
            });
            setEvents(tempEvents);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        async function fetchProfile() {
            await fetchData();
        }

        fetchProfile();
    }, []);

    return (
        <>
            <Menu />

            <div className="profile">
                <div className="navigation">
                    <h3>Profile Settings</h3>
                    <a href="#personal">Personal Information</a>
                    <a href="#password">Password</a>
                    <h3>Events</h3>
                    <a href="#events">Upcoming Events</a>
                </div>
                <div className="settings">
                    <div className="settings-module personal" id="personal">
                        <h3>Personal Information</h3>
                        <input type="text" name="email" id="email" placeholder={email} onChange={() => setEmail(e.target.value)} />
                        <button>SAVE</button>
                    </div>

                    <div className="settings-module password" id="password">
                        <h3>Password</h3>
                        <div className="pass-input">
                            <input type="password" name="currentPass" placeholder="Your current password" />
                            <input type="password" name="newPass" placeholder="Your new password" />
                            <input type="password" name="newPassConfirm" placeholder="Retype new password" />
                        </div>
                        <button>CHANGE PASSWORD</button>
                    </div>

                    <div className="settings-module attending-events" id="events">
                        <h3>Upcoming Events</h3>
                        <div className="event-list">
                            {events.map(event => (
                                <div key={event.id}>
                                    <h4>{event.group}: {event.title}</h4>
                                    <p>{event.description}</p>
                                    <i>Created by: {event.owner}</i>
                                    <br />
                                    <i>Date: {event.date}</i>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileSettings;
