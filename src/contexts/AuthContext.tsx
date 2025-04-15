
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'admin' | 'candidate' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  userRole: UserRole;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database - in a real app this would be in a backend
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Test Candidate',
    email: 'candidate@example.com',
    role: 'candidate',
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Check if user was previously logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<void> => {
    // In a real app, this would verify credentials with a backend
    // For demo, we're using the mock data
    const mockPassword = 'password123'; // All mock users have this password
    
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.role === role
    );

    if (user && password === mockPassword) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('Invalid credentials'));
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    // In a real app, this would send registration data to a backend
    // For demo, we're just simulating a successful registration
    
    // Check if email already exists
    if (MOCK_USERS.some(user => user.email === email)) {
      return Promise.reject(new Error('Email already in use'));
    }
    
    const newUser: User = {
      id: `${MOCK_USERS.length + 1}`,
      name,
      email,
      role: 'candidate',
    };
    
    // Add to our mock database
    MOCK_USERS.push(newUser);
    
    // Log in the new user
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return Promise.resolve();
  };

  const value = {
    currentUser,
    isAuthenticated,
    userRole: currentUser?.role || null,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const addCandidate = (admin: User, candidateData: {name: string, email: string, password: string}): Promise<void> => {
  // Check if admin
  if (admin.role !== 'admin') {
    return Promise.reject(new Error('Unauthorized'));
  }
  
  // Check if email already exists
  if (MOCK_USERS.some(user => user.email === candidateData.email)) {
    return Promise.reject(new Error('Email already in use'));
  }
  
  const newUser: User = {
    id: `${MOCK_USERS.length + 1}`,
    name: candidateData.name,
    email: candidateData.email,
    role: 'candidate',
  };
  
  // Add to our mock database
  MOCK_USERS.push(newUser);
  
  return Promise.resolve();
};
