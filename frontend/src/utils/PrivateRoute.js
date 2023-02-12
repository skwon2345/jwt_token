import { Children } from 'react'
import { Navigate } from 'react-router-dom'


const PrivateRoute = ({children, redirectPath = "/login"}) => {
    const authenticated = false;

    if (!authenticated) {
        return <Navigate to={redirectPath} replace />;
    }

    return children;
}

export default PrivateRoute;