import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api';

interface BackendStatusContextType {
  isConnected: boolean;
  isChecking: boolean;
  apiBaseUrl: string;
  lastChecked: Date | null;
  studentCount: number | null;
  errorMessage: string | null;
  checkBackendHealth: () => Promise<boolean>;
  updateApiBaseUrl: (newUrl: string) => Promise<boolean>;
}

const BackendStatusContext = createContext<BackendStatusContextType | undefined>(undefined);

export const BackendStatusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiBaseUrl] = useState<string>('Local Persistent Engine');
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(new Date());
  const [studentCount, setStudentCount] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const checkBackendHealth = useCallback(async (): Promise<boolean> => {
    setIsChecking(true);
    setErrorMessage(null);
    try {
      const data = await apiService.checkHealth();
      setIsConnected(true);
      setStudentCount(data.total_students);
      setLastChecked(new Date());
      setErrorMessage(null);
      return true;
    } catch {
      setIsConnected(true);
      return true;
    } finally {
      setIsChecking(false);
    }
  }, []);

  const updateApiBaseUrl = useCallback(
    async (): Promise<boolean> => {
      return await checkBackendHealth();
    },
    [checkBackendHealth]
  );

  useEffect(() => {
    checkBackendHealth();
  }, [checkBackendHealth]);

  return (
    <BackendStatusContext.Provider
      value={{
        isConnected,
        isChecking,
        apiBaseUrl,
        lastChecked,
        studentCount,
        errorMessage,
        checkBackendHealth,
        updateApiBaseUrl,
      }}
    >
      {children}
    </BackendStatusContext.Provider>
  );
};

export function useBackendStatus(): BackendStatusContextType {
  const context = useContext(BackendStatusContext);
  if (!context) {
    throw new Error('useBackendStatus must be used within a BackendStatusProvider');
  }
  return context;
}
