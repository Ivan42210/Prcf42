
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../../Services/authContext';

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();

  return user ? element : <Navigate to="/connect" />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired, // `element` doit être un élément JSX
};

export default ProtectedRoute;