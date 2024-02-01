import useStore from 'store';
import { useLocation, Navigate, useOutlet } from 'react-router-dom';
import { userTypes } from 'types';

const RouteGuard = () => {
  // const loggedIn = useStore((state) => state.loggedIn);
  const loggedIn = true;
  const location = useLocation();
  const outlet = useOutlet();

  return !loggedIn ? (
    <Navigate
      to={`/login`}
      replace
      state={
        {
          path: location.pathname,
        } as { path: string; failedFrom: userTypes }
      }
    />
  ) : (
    outlet
  );
};

export default RouteGuard;
