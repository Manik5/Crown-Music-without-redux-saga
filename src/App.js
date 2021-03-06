import React from 'react';
import './App.css';

//  importing react router dom, and with "Redirect" we will send the user into the main page after the log in
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/header/Header';

import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/Shop';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/SignInAndSignUp';
import CheckOutPage from './pages/checkout/CheckOut';

//  Log in with Google via Firebase
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

// added temporary to store the hard coded data in firebase
// addCollectionAndDocuments;


//  using redux
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
import { createStructuredSelector } from  'reselect';

// added temporary to store the hard coded data in firebase
// import { selectCollectionsForPreview } from './redux/shop/shop.selector'

class App extends React.Component {
	//  with redux, we can cancel the constructor,, because we are passing the state in the redux store.js

	//  without redux
	// constructor () {
	// 	super ()
	// 	this.state = {
	// 		// Log in with Google via Firebase
	// 		currentUser: null,
	// 	}
	// }

	//  Log in with Google via Firebase
	unsubscribeFromAuth = null

	//  Storing user in a database and in the state of the App, so we could use it
	componentDidMount() {
		const { setCurrentUser } = this.props;
		//  temporary defined to store the hard coded data in firebase
		//  collectionsArray;

		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			if (userAuth) {
				const userRef = await  createUserProfileDocument(userAuth);

				userRef.onSnapshot(snapShot => {
					// this.setState({ { without redux }
					//  with redux
						setCurrentUser({
							id: snapShot.id,
							...snapShot.data
						})
					// }); without redux
				});
			}
			//  with redux
			setCurrentUser(userAuth);
				// setCurrentUser({currentUser: userAuth});   ----> without redux

				// // added temporary to store the hard coded data in firebase
			// addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) =>({ title, items}) ))
		});
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return(
			<div>
				{/* without redux */}
				{/* <Header currentUser={this.state.currentUser} /> */}
				{/* with redux, we can cancel "this.state" because we set up the configuration in the Header.jsx */}
				<Header />
				{/* Importing react router dom */}
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route path='/shop' component={ShopPage} />
					<Route exact path='/checkout' component={CheckOutPage} />
					<Route
						exact
						path='/signin'
						render={() =>
						this.props.currentUser ? (
							<Redirect to="/" />
							) : (
							<SignInAndSignUpPage />)} />
				</Switch>
			</div>
		)
	};
}

//  redirecting the user in the main page, after the log in
const mapStateToProps = createStructuredSelector ({
	currentUser: selectCurrentUser,
	// storing the hard coded data in firebase
	// collectionsArray: selectCollectionsForPreview
});

// using redux
const mapDispatchToProps = dispatch => ({
	setCurrentUser: user => dispatch(setCurrentUser(user))
});

// with redux
export default connect(
	//  redirecting the user in the main page, after login with mapStateToProps
	mapStateToProps,
	mapDispatchToProps
	)(App);


// without redux
// export default App;
