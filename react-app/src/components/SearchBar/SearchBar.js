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
            <div className='search-bar-container'>
                 <h1 className='search-header'>Message User Search</h1>
                 <form className='search-bar-form'onSubmit={handleSubmit}>
                     <input className='search-bar' placeholder='Find User' type='text' value={searchTerm} onChange={handleInputChange}/>
                     <button type='submit' className='search-bar-button'><i class="fa-solid fa-magnifying-glass"></i></button>
                     <div className='search-list'>
                         {recommendations.map((recommendation, index) => (
                             <div className='search-entry' key={index} onClick={() => handleSearch(recommendation)}>{recommendation}</div>
                         ))}
                     </div>
                 </form>
            </div>
        </>
    )

}

export default SearchBar;