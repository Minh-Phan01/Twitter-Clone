import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createComment } from '../../../store/comments';
import { useModal } from '../../../context/Modal';
import './CreateCommentModal.css';


export const CreateCommentModal = ({post}) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([])
    const [body, setBody] = useState('');
    const { closeModal } = useModal();

    const handleSubmit = async e => {
        e.preventDefault();
        let newComment = {
            userId: currentUser.id,
            postId: post.id,
            body,
            userInfo: currentUser
        }

        await dispatch(createComment(newComment))
        .then(setBody[''])
        closeModal()
    }

    const handleBodyChange = (e) => {
        setBody(e.target.value);
    }

    return (
        <>
         <div className='create-comment-component'>
          { currentUser && <h2 className='create-comment-name'><img src={currentUser.profilePictureUrl} className='profile-pic'/> {currentUser.firstName} {currentUser.lastName}</h2> }
        </div>
        <section>
            <form onSubmit={handleSubmit}>
                <ul>
                {errors.map((error, idx) => <li key={idx} className='error-handler'>{error}</li>)}
                </ul>
                <div className='create-comment-area'>
                    <textarea
                        key='create-comment'
                        className='create-comment-text-area'
                        type='text'
                        placeholder='What is on your mind?'
                        value={body}
                        onChange={handleBodyChange}
                    />
                </div>
                <button type='submit'> <i className="fas fa-paper-plane"></i></button>
            </form>
        </section>
        </>
    )
}

export default CreateCommentModal;