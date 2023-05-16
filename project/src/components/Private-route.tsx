import {Navigate} from 'react-router-dom';
import {AppRoutes, Authorization} from '../utils/consts';
import { useAppSelector } from '../hooks';
import { getUserStatus } from '../store/user-process/user-selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {

  const authorizationStatus = useAppSelector(getUserStatus);

  return (
    authorizationStatus === Authorization.Auth
      ? children
      : <Navigate to={AppRoutes.Login} />
  );
}

export default PrivateRoute;
