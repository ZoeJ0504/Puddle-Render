import React from "react"
import CommentSignedInPrivilege from "./CommentSignedInPrivilege"

function CommentDisplay({ comment, commentId, postUser, loggedInUser, handleCommentDelete, handleCommentUpdate }) {



    

    return (

        <div>
            <p>{comment}</p>
            <p>{postUser}</p>
            {loggedInUser?.username === postUser ? <CommentSignedInPrivilege handleDelete={handleCommentDelete} commentId={commentId} handleCommentUpdate={handleCommentUpdate} /> : <p></p>}
        </div>
    )
}

export default CommentDisplay