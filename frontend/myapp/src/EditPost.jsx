import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'


function EditPost() {
    const [title, setTitle] = useState()
    const [desc, setDesc] = useState()
    const {id} = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()

        
        axios.put(`http://localhost:8082/editpost/${id}`, {title, desc})
        .then(res => {
            if(res.data === "Success"){
              window.location.href = "/"
            }
        })
        
        .catch(err => console.log(err))

    }


    useEffect(() => {
        axios.get(`http://localhost:8082/getpostbyid/${id}`)
            .then(result => {
                setTitle(result.data.title)
                setDesc(result.data.desc)
            })
            .catch(err => console.log(err));
    }, []);



    return (
        <div>
            <div className='post_container'>
                <div className='post_form'>
                    <form onSubmit={handleSubmit} >
                        <h2>Update Post</h2>
                        <input type='text' placeholder='Enter Title'value={title} onChange={e => setTitle(e.target.value)}/>
                        <textarea
                         name="desc" 
                         id="desc"
                         cols="30" 
                         rows="10" 
                         placeholder='Enter Description' 
                         value={desc}
                         onChange={e => setDesc(e.target.value)}></textarea>
                        
                        <button>Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditPost;