import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isJoinClubModalOpen, setIsJoinClubModalOpen] = useState(false);
  const [isEditClubModalOpen, setIsEditClubModalOpen] = useState(false);

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  // Error handling
  const [error, setError] = useState(null);

  const showLoading = (text = 'Đang xử lý...') => {
    setLoadingText(text);
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
    setLoadingText('');
  };

  const showError = (errorMessage) => {
    setError(errorMessage);
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    isJoinClubModalOpen,
    setIsJoinClubModalOpen,
    isEditClubModalOpen,
    setIsEditClubModalOpen,

    // Loading states
    isLoading,
    loadingText,
    showLoading,
    hideLoading,

    // Error states
    error,
    showError,
    clearError,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook để sử dụng context
export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
}; 