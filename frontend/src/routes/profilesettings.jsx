import { useEffect, useState } from "react";
import "../styles/ProfileSettings.scss"
import Menu from "../components/menu";

function ProfileSettings() {
    const [email, setEmail] = useState("");
    const [currentUsername, setCurrentUsername] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newUsernameConfirm, setNewUsernameConfirm] = useState("");
    const [currentPass, setCurrentPass] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [events, setEvents] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

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

    async function savePersonal() {
        const body = {
            "userid": sessionStorage.getItem("userid"),
            "newEmail": email
        };

        const response = await fetch("http://127.0.0.1:8001/users/update/email", {
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
            setSuccessMessage("");
        }
        else {
            setErrorMessage("");
            setSuccessMessage(json.message);
        }

        console.log("POST: ", res)
    }

    async function changePassword() {
        const body = {
            "userid": sessionStorage.getItem("userid"),
            "currentPass": currentPass,
            "newPass": newPassword,
            "newPassConfirm": newPasswordConfirm
        };

        const response = await fetch("http://127.0.0.1:8001/users/update/password", {
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
            setSuccessMessage("");
        }
        else {
            setErrorMessage("");
            setSuccessMessage(json.message);
        }

        console.log("POST: ", res)
    }
    async function changeUsername() {
        const body = {
            "userid": sessionStorage.getItem("userid"),
            "currentUsername": currentUsername,
            "newUsername": newUsername,
            "newUsernameConfirm": newUsernameConfirm
        };

        const response = await fetch("http://127.0.0.1:8001/users/update/username", {
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
            setSuccessMessage("");
        }
        else {
            setErrorMessage("");
            setSuccessMessage(json.message);
        }

        console.log("POST: ", res)
    }

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
                    <p className="error-message">{errorMessage}</p>
                    <p className="success-message">{successMessage}</p>
                    <div className="settings-module personal" id="personal">
                        <h3>Personal Information</h3>
                        <input type="text" name="email" id="email" placeholder={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                        <button onClick={savePersonal}>SAVE</button>
                    </div>

                    <div className="settings-module password" id="password">
                        <h3>Password</h3>
                        <div className="pass-input">
                            <input type="password" name="currentPass" placeholder="Your current password"
                                   onChange={(e) => setCurrentPass(e.target.value)}/>
                            <input type="password" name="newPass" placeholder="Your new password"
                                   onChange={(e) => setNewPassword(e.target.value)}/>
                            <input type="password" name="newPassConfirm" placeholder="Retype new password"
                                   onChange={(e) => setNewPasswordConfirm(e.target.value)}/>
                        </div>
                        <button onClick={changePassword}>CHANGE PASSWORD</button>
                    </div>

                    <div className="settings-module username" id="username">
                        <h3>Username</h3>
                        <div className="username-input">
                            <input type="username" name="currentUsername" placeholder="Your current username"
                                   onChange={(e) => setCurrentUsername(e.target.value)}/>
                            <input type="username" name="newUsername" placeholder="Your new username"
                                   onChange={(e) => setNewUsername(e.target.value)}/>
                            <input type="username" name="newUsernameConfirm" placeholder="Retype new username"
                                   onChange={(e) => setNewUsernameConfirm(e.target.value)}/>
                        </div>
                        <button onClick={changeUsername}>CHANGE USERNAME</button>
                    </div>
                    <div className="settings-module attending-events" id="events">
                        <h3>Upcoming Events</h3>
                        <div className="event-list">
                            {events.map(event => (
                                <div key={event.id}>
                                    <h4>{event.group}: {event.title}</h4>
                                    <p>{event.description}</p>
                                    <i>Created by: {event.owner}</i>
                                    <br/>
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