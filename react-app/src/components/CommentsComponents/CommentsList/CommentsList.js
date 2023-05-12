import CommentsCard from '../CommentsCard/CommentsCard';
import './CommentsList.css'


const CommentsList = ({postComments}) => {
    

    return (
        <>
         {postComments.map(comment => (
            <>
            <CommentsCard comment={comment}/>
            </>
         ))}
        </>
    )
}

export default CommentsList;