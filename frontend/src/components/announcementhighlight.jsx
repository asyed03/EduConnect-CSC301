import React, { useState, useEffect } from "react";
import "../styles/AnnouncementHighlight.scss";
import CommentHighlight from "./commenthighlight";

function AnnouncementHighlight({ announcement }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [upvotes, setUpvotes] = useState(announcement.upvotes || 0);
  const [downvotes, setDownvotes] = useState(announcement.downvotes || 0);

  // Function to handle upvotes
  const handleUpvote = async () => {
    // Placeholder: Implement API call to backend to increase upvote count
    

      try {
        const response = await fetch(`http://127.0.0.1:8001/announcements/upvote`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "announcement_id": announcement.id,
            }),
        });

        if (response.ok) {
            // Do something?
        } else {
            console.error("Failed to upvote:", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Error upvoting:", error);
    }
  };

  // Function to handle downvotes
  const handleDownvote = async () => {
    // Placeholder: Implement API call to backend to decrease upvote count
    setDownvotes(downvotes + 1);
  };

  async function fetchComments() {
    try {
      const response = await fetch(`http://127.0.0.1:8001/announcements/comments/${announcement.id}`);
      const data = await response.json();
      setComments(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  useEffect(() => {
    // Fetch comments for the current announcement when the component mounts
    fetchComments();
  }, []);

  async function handleCommentSubmit(e) {
    e.preventDefault();

    if (commentText.trim() === "") {
      return;
    }

    try {
      // Send a POST request to add a new comment
      const response = await fetch(`http://127.0.0.1:8001/announcements/comments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "announcement_id": announcement.id,
          "content": commentText,
          "commenter_id": sessionStorage.getItem("userid")
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

  return (
    <div className="announcement">
      <h5>{announcement.poster}</h5>
      <h6>{announcement.date.toString()}</h6>
      <p>{announcement.message}</p>

      {/* Voting section */}
      <div className="voting-buttons">
        <button onClick={handleUpvote}>👍 {announcement.upvotes}</button>
        <button onClick={handleDownvote}>👎 {downvotes}</button>
      </div>

      {/* Comment section */}
      <div className="comments-section">
        <h4>Comments:</h4>
        {comments.map((comment, index) => (
          <CommentHighlight comment={comment} key={index} />
        ))}
        <div className="comment-input-section">
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              placeholder="Type your comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="submit">&rarr; Reply</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementHighlight;
