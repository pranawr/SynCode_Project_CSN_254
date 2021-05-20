import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Errorpage from './components/Error/Errorpage';
import Home from './components/Home/Home';
import Rooms from './components/Room/Rooms';
import Room from './components/InsideRoom/Room';
import { io } from "socket.io-client"
import { SnackbarProvider } from "notistack";
import CreateAccount from './pages/CreateAccount';
import LoginPage from './pages/LoginPage';
import Logout from './pages/Logout';


const App = () => {

	const [socket, setSocket] = useState()
	const [nameOfUser, setNameOfUser] = useState("")
	// const socket = io("http://localhost:5000");
	const [isLogout, setIsLogout] = useState('0');
	useEffect(() => {
		const s = io("http://localhost:5000");
		console.log(s);
		setSocket(s);
		
		return () => {
			s.disconnect();
		}
	}, []);

	const [isDisconnected, setIsDisconnected] = useState(false);

	useEffect(() => {

		if (isDisconnected===true) {
			const s = io("http://localhost:5000");
			console.log(s);
			setSocket(s);
			console.log("USEEFFECT")
			window.location.reload();
			setIsDisconnected(false);

			return () => {
				s.disconnect();
			}
		}
		
	}, [isDisconnected]);

	return (
		<SnackbarProvider>
				<Switch>
					<Route exact path="/">
						<Home isLogout={isLogout} setIsLogout={setIsLogout}></Home>
					</Route>

					<Route path="/login">
						<LoginPage></LoginPage>
					</Route>

					<Route path="/signup">
						<CreateAccount></CreateAccount>
					</Route>

					<Route path="/rooms">
						<Rooms socket={socket} setNameOfUser={setNameOfUser}></Rooms>
					</Route>


					<Route path="/room/:id">
						<Room socket={socket} nameOfUser={nameOfUser} setIsDisconnected={setIsDisconnected}></Room>
					</Route>

					<Route path="/logout">
						<Logout setIsLogout={setIsLogout}></Logout>
					</Route>

					<Route>
						<Errorpage></Errorpage>
					</Route>
				</Switch>

		</SnackbarProvider>
	)
}

export default App