import React, { createContext, useContext, useEffect, useState } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import { QueryClient } from '@tanstack/react-query';

interface NetworkContextType {
  isConnected: boolean | null;
  isInternetReachable: boolean | null;
  networkType: string | null;
}

const NetworkContext = createContext<NetworkContextType>({
  isConnected: null,
  isInternetReachable: null,
  networkType: null,
});

export const useNetwork = () => useContext(NetworkContext);

interface NetworkProviderProps {
  children: React.ReactNode;
  queryClient: QueryClient;
}

export const NetworkProvider: React.FC<NetworkProviderProps> = ({
  children,
  queryClient,
}) => {
  const [networkState, setNetworkState] = useState<NetworkContextType>({
    isConnected: null,
    isInternetReachable: null,
    networkType: null,
  });

  const [previousConnectionState, setPreviousConnectionState] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const newState = {
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
        networkType: state.type,
      };

      if (
        previousConnectionState !== null &&
        previousConnectionState !== state.isConnected
      ) {
        if (!state.isConnected) {
          Toast.show({
            type: 'error',
            text1: 'No Internet Connection',
            text2: 'Please check your connection and try again',
          });
        } else {
          Toast.show({
            type: 'success',
            text1: 'Connected',
            text2: 'You are back online',
          });

          // Tự động chạy lại các truy vấn khi có mạng trở lại
          queryClient.invalidateQueries();
        }
      }

      setPreviousConnectionState(state.isConnected);
      setNetworkState(newState);
    });

    // Lấy trạng thái mạng ban đầu
    NetInfo.fetch().then((state) => {
      setNetworkState({
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
        networkType: state.type,
      });
      setPreviousConnectionState(state.isConnected);
    });

    return () => unsubscribe();
  }, [queryClient, previousConnectionState]);

  return (
    <NetworkContext.Provider value={networkState}>
      {children}
    </NetworkContext.Provider>
  );
};
