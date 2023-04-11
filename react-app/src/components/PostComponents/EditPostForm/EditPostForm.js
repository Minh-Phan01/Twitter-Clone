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
        <div className='edit-post-container'>
         <div >
            <h1 className='edit-post-header'>Edit Your Post!</h1>
            {currentUser && <h2 className='edit-post-username'><img className='profile-pic' src={currentUser.profilePictureUrl}/> {currentUser.firstName} {currentUser.lastName}</h2>}
         </div>
         <section>
            <form onSubmit={handleSubmit}>
                <div className='edit-post-text-area-container'>
                    <textarea
                        className='edit-post-text-area'
                        type='text'
                        placeholder='Post A Message'
                        value={body}
                        onChange={e => setBody(e.target.value)}
                    />
                </div>
                <button className='edit-post-button' type='submit'><i class="fa-solid fa-pen-to-square"></i></button>
            </form>
        </section>

        </div>
        </>
    )
}

export default EditPostForm;