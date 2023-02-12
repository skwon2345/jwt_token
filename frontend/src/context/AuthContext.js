import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    // get authTokens from localStorage first to check if it is there. else just null.
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    let loginUser = async (e) => {
        e.preventDefault()

        let response = await fetch("http://localhost:8000/api/token/", {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })

        let data = await response.json()
        
        if (response.status === 200) {
            // Save access and refresh token to Context
            setAuthTokens(data);

            // Save user information by decoding access token
            setUser(jwt_decode(data.access))
            
            // save access and refresh token to local storage of the browser.
            localStorage.setItem('authTokens', JSON.stringify(data))

            // redirect user to homepage after logged in.
            navigate('/')
        } else {
            alert("Something went wrong!")
        }
    }

    let logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    let updateToken = async () => {
        console.log('Update Token log')
        let response = await fetch("http://localhost:8000/api/token/refresh/", {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'refresh':authTokens.refresh})
        })

        let data = await response.json()
        
        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
        } else {
            logoutUser();
        }
    }

    let contextData = {
        user:user,
        loginUser: loginUser,
        logoutUser: logoutUser
    };

    useEffect(()=> {

        let fourMinutes = 1000 * 600 * 4

        let interval = setInterval(()=>{
            if (authTokens) {
                updateToken()
            }
        }, fourMinutes)

        return () => clearInterval(interval)

    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}