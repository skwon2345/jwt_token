import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({children, redirectPath = "/login"}) => {
    let {user} = useContext(AuthContext);
    
    if (!user) {
        return <Navigate to={redirectPath} replace />;
    }

    return children;
}

export default PrivateRoute;