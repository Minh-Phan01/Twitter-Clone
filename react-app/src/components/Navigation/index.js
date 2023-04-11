import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import TWITTEST from "../../images/TWITTEST.png"
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='navigation-container'>
			{/* <NavLink exact to="/">Home</NavLink> */}
			<Link to='/' className='home-logo-link'>
				<img src={TWITTEST} alt='Twittest Logo' className='home-logo' />
			</Link>
		
		{isLoaded && (
			<div>
				<ProfileButton user={sessionUser} className='profile-button'/>

			</div>
			
		)}
	

		</div>
	);
}

export default Navigation;