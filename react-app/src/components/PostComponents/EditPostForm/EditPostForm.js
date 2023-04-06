import { useParams, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { editPostThunk } from '../../../store/posts';
import { useModal } from '../../../context/Modal';
import './EditPostForm.css'

const EditPostForm = () => {
    const { postId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory();
    const currentUser = useSelector(state => state.session.user);
    const editedPost = useSelector(state => state.postsReducer[postId])
    
    const [body, setBody] = useState(editedPost?.body);
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        let payload = {
            id: postId,
            body,
        }
        
        dispatch(editPostThunk(payload))
            .then(() => {
                history.push('/')
            }
            )
            //closeModal();
    }

    if (!editedPost) {
        return <Redirect to='/' />
    }

    return (
        <>
         <div>
            <h1>Since you're insecure...Here you go</h1>
            {currentUser && <h2><img src={currentUser.profilePictureUrl}/> {currentUser.firstName} {currentUser.lastName}</h2>}
         </div>
         <section>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea
                        type='text'
                        placeholder='Post A Message'
                        value={body}
                        onChange={e => setBody(e.target.value)}
                    />
                </div>
                <button type='submit'>Edit It!</button>
            </form>
        </section>
        </>
    )
}

export default EditPostForm;