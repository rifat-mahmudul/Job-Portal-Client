import PropTypes from 'prop-types'
import UseRole from '../hooks/UseRole'
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({children}) => {

    const [role, isLoading] = UseRole();

    if(isLoading) return <LoadingSpinner />
    
    if(role === 'admin') return children;

    return <Navigate to='/dashboard'></Navigate>

}

AdminRoute.propTypes = {
    children : PropTypes.element
}

export default AdminRoute
