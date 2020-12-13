import React from 'react';
import { firebaseConfig } from './firebase';
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {

    const googleProvider = new firebase.auth.GoogleAuthProvider();

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const history = useHistory();
    const location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(function (result) {
                const token = result.credential.accessToken;
                const user = result.user;
                console.log(token, user);
                localStorage.setItem('email', user.email);
                history.replace(from);
            })
            .catch(function (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = error.credential;
            });
    }

    return (
        <div className="m-5 text-center">
            <h1>Login</h1><br />
            <button className="btn btn-primary" onClick={handleGoogleSignIn}>Login with Google</button>
        </div>
    );
};

export default Login;