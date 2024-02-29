import "../styles/AnnouncementHighlight.scss";

function CommentHighlight({ comment }) {
    return (
        <div className="comment">
            <h5>{comment.commenter}</h5>
            <h6>{comment.date}</h6>
            <p>{comment.content}</p>
        </div>
    )
}

export default CommentHighlight;