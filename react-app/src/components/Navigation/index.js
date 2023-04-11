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
			<div className='home-logo-container'>
			<Link to='/' className='home-logo-link'>
				<img src={TWITTEST} alt='Twittest Logo' className='home-logo' />
			</Link>

			</div>
			<header className='home-footer'>
				<p className='nav-footer-text'>Created by Minh Phan</p>
				<a href='https://github.com/Minh-Phan01/Twittest' className='nav-footer-icon-link'> <i className="fab fa-github home-footer-icon"></i></a>
				<a href='https://www.linkedin.com/in/minhphan1/' className='nav-footer-icon-link'> <i className="fab fa-linkedin home-footer-icon"></i></a>
			</header>
		
		{isLoaded && (
			<div className='profile-button-container'>
				<ProfileButton user={sessionUser} className='profile-button'/>

			</div>
			
		)}
	

		</div>
	);
}

export default Navigation;