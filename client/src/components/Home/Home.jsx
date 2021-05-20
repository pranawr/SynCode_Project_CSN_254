import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Home.css';
import { NavLink } from 'react-router-dom';
import {
	BrowserView,
	MobileView
} from "react-device-detect";

const Home = (props) => {

	const [Isuser, setIsuser] = useState("0")

    const checkForUser= async () => {
        try {
            const res = await fetch('/checkforUser', {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
			// console.log(data.isuser);
			setIsuser(data.isuser);
            if (!(res.status === 200)) {
                throw new Error(res.error);
            }
        } catch (error) {
            console.log(error);
        }
    }

	useEffect(()=>{
		checkForUser();
	}, [])

    useEffect(() => {
        if (props.isLogout==="1") {
            // props.setIsLogout("0")
            window.location.reload();
        }
    }, [props.isLogout])

    return (
        <>
        <BrowserView>
        <div>

            <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
                <div className="container">
                    <NavLink exact to="/" className="navbar-brand" href="#">SynCode</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <NavLink className="nav-link my-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item active">
                                <NavLink className="nav-link my-link" to="/rooms">Room</NavLink>
                            </li>
                            {Isuser==='0'
                            ?
                            <li className="nav-item active">
                                <NavLink className="nav-link my-link" to="/login">Sign In</NavLink>
                            </li>
                            :
                            <li className="nav-item active" style={{display:"none"}}>
                                <NavLink className="nav-link my-link" to="/login">Sign In</NavLink>
                            </li>
                            }
                            {Isuser==='0'
                            ?
                            <li className="nav-item active">
                                <NavLink className="nav-link my-link" to="/signup">Sign Up</NavLink>
                            </li>
                            :
                            <li className="nav-item active" style={{display:"none"}}>
                                <NavLink className="nav-link my-link" to="/signup">Sign Up</NavLink>
                            </li>
                            }
                            {Isuser==='0'
                            ?
                            <li className="nav-item active" style={{display:"none"}}>
                                <NavLink className="nav-link my-link" to="/logout">Logout</NavLink>
                            </li>
                            :
                            <li className="nav-item active">
                                <NavLink className="nav-link my-link" to="/logout">Logout</NavLink>
                            </li>
                            }


                            {/* <li className="nav-item active">
                                <NavLink className="nav-link my-link" to="/login">Sign In</NavLink>
                            </li>
                            <li className="nav-item active">
                                <NavLink className="nav-link my-link" to="/signup">Sign Up</NavLink>
                            </li>
                            <li className="nav-item active">
                                <NavLink className="nav-link my-link" to="/logout">Logout</NavLink>
                            </li> */}
                        </ul>

                    </div>
                </div>
            </nav>

            <header className="headerClass">
                <div className="container">
                <div className="banner-text">
                    <div className="text-area">
                        <span>C</span>
                        <span>O</span>
                        <span>D</span>
                        <span>E</span>&nbsp;
                        <span>&</span>&nbsp;
                        <span>D</span>
                        <span>I</span>
                        <span>S</span>
                        <span>C</span>
                        <span>U</span>
                        <span>S</span>
                        <span>S</span>
                       
                    </div>

                    <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                     when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap 
                    </p>

                    <p className="banner-btn">
                        {Isuser==='0'
                        ?
                            <Link to="/login" className="active mr-1">Login</Link> 
                        :
                            <Link to="/login" className="active mr-1" style={{display:"none"}}>Login</Link> 

                        }
                        {/* <Link to="/login" className="active mr-1">Login</Link>  */}
                        {Isuser==='0'
                        ?
                            <Link to="/rooms" title="Sign In to access room">Room</Link> 
                        :
                            <Link to="/rooms">Room</Link>

                        }
                        {/* <Link to="/rooms">Room</Link> */}
                    </p>
                    </div>
                </div>
            </header>
            {/*
            <Link to="/login"><h1>Login</h1></Link>
            <Link to="/signup"><h1>Sign up</h1></Link>
            <Link to="/rooms"><h1>Room</h1></Link>
            */}
        </div>
        </BrowserView>
        <MobileView>
            <div className="mobile-notValid text-center" style={{position:'absolute', top:"50%", left:"50%", transform:'translate(-50%, -50%)'}}>
				<h1>Dear user, unfortunately this app is not supported in MobileView.</h1>
				<h1>Kindly use on a Desktop.</h1>
			</div>
        </MobileView>
        </>
    )
}

export default Home
