import './HomePage.css'
import { PostList } from '../PostComponents/PostList/PostList'
import CreatePostForm from '../PostComponents/CreatePostForm/CreatePostForm'

export const HomePage = () => {


    return (
        <>
            <CreatePostForm />
            <PostList />
        </>
    )
}