import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setAuth, finishInitialLoad } from '@/redux/features/authSlice';
import { useVerifyMutation } from '@/redux/features/authApiSlice';

export default function useVerify() {
  const dispatch = useAppDispatch();
  const [verify] = useVerifyMutation();

  useEffect(() => {
    // Get the token (example: from localStorage)
    const token = localStorage.getItem('accessToken');

    // If there's no token at all, skip calling verify
    // and just mark the initial load as finished
    if (!token) {
      dispatch(finishInitialLoad());
      return;
    }

    verify(token)
      .unwrap()
      .then(() => {
        // If verify is successful, dispatch setAuth
        dispatch(setAuth());
      })
      .catch(() => {
        // If token is invalid, you can optionally handle it here
        // e.g., remove the token from localStorage, or show a toast
      })
      .finally(() => {
        // Always mark that we've finished the initial load,
        // whether verification succeeded or failed
        dispatch(finishInitialLoad());
      });
  }, [verify, dispatch]);

  return null; // This hook doesn't render anything
}
