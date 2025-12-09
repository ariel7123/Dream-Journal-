import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getMe } from '../redux/slices/authSlice';

interface AuthInitializerProps {
  children: React.ReactNode;
}

function AuthInitializer({ children }: AuthInitializerProps) {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getMe());
    }
  }, [dispatch, token]);

  return <>{children}</>;
}

export default AuthInitializer;