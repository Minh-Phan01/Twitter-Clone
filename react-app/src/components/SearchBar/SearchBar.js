import './SearchBar.css'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getAllUsers } from '../../store/users';
import { useHistory, Redirect } from 'react-router-dom';

const SearchBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [searchTerm, setSearchTerm] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const users = useSelector(state => state.usersReducer);
    const usersArr = Object.values(users)
    const sessionUser = useSelector(state => state.session.user);
    

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch]);

    let userId = 0;
    let usersIdArr = [];

    for (let i = 0; i < usersArr.length; i++) {
        if (usersArr[i].firstName+ ' ' + usersArr[i].lastName === searchTerm) userId = usersArr[i].id
    }

    let searchNamesArr = [];
    for (let i = 0; i < usersArr.length; i++) {
        searchNamesArr.push(usersArr[i].firstName + ' ' + usersArr[i].lastName);
        usersIdArr.push(usersArr[i].id);
    }
    

    const handleInputChange = (event) => {
       setSearchTerm(event.target.value);
       setRecommendations(getRecommendations(event.target.value));
    }

    const handleSubmit = (e) => {
        // if (usersIdArr.includes(sessionUser.id)) {
        //     return history.push(`/users/${sessionUser.id}`)
         if (usersIdArr.includes(userId)) {
            return history.push(`/messages/${userId}`)
        }
    }

    const getRecommendations = (searchTerm) => {
        return searchNamesArr.filter(
            (recommendation) => 
                recommendation.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm !== ''
        )
    }

    const handleSearch = (recommendation) => {
        setSearchTerm(recommendation)
    }

    return (
        <>
            <h1>Message User Search</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder='Find User' type='text' value={searchTerm} onChange={handleInputChange}/>
                <button type='submit'>Search</button>
                <div>
                    {recommendations.map((recommendation, index) => (
                        <div key={index} onClick={() => handleSearch(recommendation)}>{recommendation}</div>
                    ))}
                </div>
            </form>
        </>
    )

}

export default SearchBar;