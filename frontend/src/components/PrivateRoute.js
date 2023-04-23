import { Navigate } from 'react-router-dom';
import { isAuth } from '../utils/auth';

const PrivateRoute = ({ Component }) => {
  return isAuth() ? (
    <Component></Component>
  ) : (
    <Navigate to="/login" replace></Navigate>
  );
};

export default PrivateRoute;
