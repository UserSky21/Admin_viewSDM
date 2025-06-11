import { createContext, useContext, useReducer, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(undefined);

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user: decoded.user, token },
        });
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      // Mock API call - in a real app, this would be an actual API call
      if (email === 'admin@sdmconsultancy.com' && password === 'admin123') {
        const mockUser = {
          id: '1',
          name: 'Admin User',
          email: 'admin@sdmconsultancy.com',
          role: 'admin',
        };
        
        // Mock JWT token (in real app this would come from the server)
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMSIsIm5hbWUiOiJBZG1pbiBVc2VyIiwiZW1haWwiOiJhZG1pbkBzZG1jb25zdWx0YW5jeS5jb20iLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNjE2MjM5MDIyfQ.BdYYn7kq8YPLjF1XWWBnMTAVDJLWypKQ';
        
        localStorage.setItem('token', token);
        
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user: mockUser, token },
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
