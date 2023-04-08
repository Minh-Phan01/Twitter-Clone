import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createPost } from '../../../store/posts';

import './CreatePost.css'

const CreatePostForm = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([])
    

    const [body, setBody] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        let newPost = {
            body,
        }
        
         await dispatch(createPost(newPost))
        .then(async (data) => {
            if (data.ok===false) {
                // const dataErr = await data.json()
                setErrors(['Please input a valid post'])
            } else {
                setBody('')
                setErrors([])
            }
        })
    }

    

    return (
        <>
        <div className='create-post-component'>
          { currentUser && <h2 className='create-post-name'><img src={currentUser.profilePictureUrl} className='profile-pic'/> {currentUser.firstName} {currentUser.lastName}</h2> }
        </div>
        <section>
            <form onSubmit={handleSubmit}>
                <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className='create-post-area'>
                    <textarea
                        className='create-post-text-area'
                        type='text'
                        placeholder='What is on your mind?'
                        value={body}
                        onChange={e => setBody(e.target.value)}
                    />
                </div>
                <button type='submit'> <i className="fas fa-paper-plane"></i></button>
            </form>
        </section>
        </>
    )
}

export default CreatePostForm;