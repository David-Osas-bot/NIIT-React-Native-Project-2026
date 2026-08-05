import React, { createContext, useContext, useState } from 'react';

const BASE_URL = 'https://niit-react-native-project-2026.onrender.com';
const DeliveryOnlineStatusContext = createContext(undefined);

export function DeliveryOnlineStatusProvider({ children }) {
  const [isOnline, setIsOnlineState] = useState(false);

  // Syncs the exact boolean state with the backend
  const handleSetIsOnline = async (newStatus) => {
    setIsOnlineState(newStatus); // Optimistic local UI update for instant feedback

    try {
      // Tell the backend to mark this courier as available/unavailable for new orders
      await fetch(`${BASE_URL}/profile`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer YOUR_TOKEN` // Ensure auth is passed if required
        },
        body: JSON.stringify({ isOnline: newStatus }),
      });
    } catch (error) {
      console.error("Failed to sync online status with backend:", error);
      // Revert the UI switch if the network request fails
      setIsOnlineState(!newStatus);
    }
  };

  // Reverses the current state and syncs with backend
  const toggleOnline = () => {
    handleSetIsOnline(!isOnline);
  };

  return (
    <DeliveryOnlineStatusContext.Provider 
      value={{ 
        isOnline, 
        setIsOnline: handleSetIsOnline, 
        toggleOnline 
      }}
    >
      {children}
    </DeliveryOnlineStatusContext.Provider>
  );
}

export function useDeliveryOnlineStatus() {
  const context = useContext(DeliveryOnlineStatusContext);
  if (!context) {
    throw new Error('useDeliveryOnlineStatus must be used within a DeliveryOnlineStatusProvider');
  }
  return context;
}