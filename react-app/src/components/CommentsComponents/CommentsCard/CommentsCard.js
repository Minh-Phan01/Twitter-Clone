import './CommentsCard.css'

const CommentsCard = ({comment}) => {


    return (
        <>
        <img className='profile-pic' src={comment.userInfo.profilePictureUrl}/>
            <div>{comment.userInfo.firstName}: {comment.body}</div>
        </>
    )
}

export default CommentsCard