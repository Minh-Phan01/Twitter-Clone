import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createPost } from '../../../store/posts';

import './CreatePost.css'

const CreatePostForm = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    

    const [body, setBody] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        let newPost = {
            body,
        }
        
        await dispatch(createPost(newPost))
        .then(() => setBody(''))
    }

    

    return (
        <>
        <div>
            <h2><img src={currentUser.profilePictureUrl}/> {currentUser.firstName} {currentUser.lastName}</h2>
        </div>
        <section>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea
                        type='text'
                        placeholder='What is on your mind?'
                        value={body}
                        onChange={e => setBody(e.target.value)}
                    />
                </div>
                <button type='submit'>Post It</button>
            </form>
        </section>
        </>
    )
}

export default CreatePostForm;