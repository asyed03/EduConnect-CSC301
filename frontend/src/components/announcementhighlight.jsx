import React, { useState, useEffect } from "react";
import "../styles/AnnouncementHighlight.scss";

function AnnouncementHighlight({ announcement }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments for the current announcement when the component mounts
    fetchComments();
  }, [announcement.id]); // Adjust the dependency as needed

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8001/announcements/comments/${announcement.id}`);
      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (commentText.trim() !== "") {
      try {
        // Send a POST request to add a new comment
        const response = await fetch(`http://127.0.0.1:8001/announcements/comments/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            announcement_Id: announcement.id,
            content: commentText,
          }),
        });

        if (response.ok) {
          // If the comment is added successfully, fetch updated comments
          fetchComments();
          setCommentText("");
        } else {
          console.error("Failed to add comment:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    }
  };

  return (
    <div className="announcement">
      <h5>{announcement.poster}</h5>
      <h6>{announcement.date.toString()}</h6>
      <p>{announcement.message}</p>

      <div className="comments-section">
        <h6>Comments:</h6>
        {comments.map((comment, index) => (
          <p key={index} className="comment">
            {comment.content}
          </p>
        ))}
        <div className="comment-input-section">
          <input
            type="text"
            placeholder="Type your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            style={{ width: "calc(100% - 20px)", padding: "10px" }} // Adjust the padding value as needed
          />
          <button onClick={handleCommentSubmit}>&rarr; Reply</button>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementHighlight;
