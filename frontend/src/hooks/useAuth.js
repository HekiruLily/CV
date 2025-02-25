import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../redux/slices/userSlice';

export const useAuth = (requireAuth = false) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    // Nếu yêu cầu đăng nhập và không có userData
    if (requireAuth && !isAuthenticated) {
      navigate('/login');
    }

    // Kiểm tra token hết hạn
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/auth/check-auth', {
          credentials: 'include'
        });
        
        if (!response.ok) {
          dispatch(clearUser());
          if (requireAuth) {
            navigate('/login');
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };

    if (isAuthenticated) {
      checkAuthStatus();
    }
  }, [isAuthenticated, requireAuth, navigate, dispatch]);

  return { isAuthenticated, userData };
}; 