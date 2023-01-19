import React, { useEffect, useState } from 'react'
import PostDisplays from '../components/PostDisplay'
import RiddlePostForm from '../components/RiddlePostForm'
import styled from 'styled-components'

function Riddle({ user }) {
    const [comments, setComments] = useState([])
    const [newPost, setNewPost] = useState({})
    const [show, setShow] = useState(false)




    useEffect(() => {
        fetch("/wordpuzzle")
            .then(r => r.json())
            .then(data => {
                setComments(data)
            })
    }, [])






    const handleSubmit = (event) => {
        event.preventDefault()
        fetch("/rpost", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
        })
            .then(res => res.json())
            .then(data => setComments([data, ...comments]))
        event.target.reset()
    }


    const handleChange = (e) => {
        setNewPost({
            user_id: user.id,
            post: e.target.value
        })
    }

    const handleDelete = (postId) => {
        fetch(`/worldpuzzleremove/${postId}`, {
            method: "DELETE"
        })
            .then(res => res.json())
        setComments(comments?.filter(comment => comment.id !== postId))
    }

    const changeShow = () => setShow(!show)


    return (
        <div>
            <PageTitle>Riddles!</PageTitle>
            <ShowButton onClick={changeShow}>Have a Riddle?</ShowButton>
            {show === true ?
                <RiddlePostForm handleSubmit={handleSubmit} handleChange={handleChange} />
                : <p></p>
            }
            {comments?.map(comment => { return <PostDisplays key={comment.id} text={comment.post} id={comment.user} user={user} postId={comment.id} handleDelete={handleDelete} setComments={setComments} /> })}

        </div>
    )
}

export default Riddle;

const PageTitle = styled.p`
font-size: 40px;
text-decoration: underline;
`
const ShowButton = styled.button`
width: 150px;
height: 30px;
padding: 5px;
font-size: 15px;
border-color: #008037;
&:hover{
  background-color: #008037;
  color: white;
} 
`