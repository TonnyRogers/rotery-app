import React, {createContext, useState} from 'react';

type LoadingContextProps = {
  isLoading: boolean;
  setLoading: (state: boolean) => void;
};

const DEFAULT_VALUE: LoadingContextProps = {
  isLoading: false,
  setLoading: () => {},
};

export const LoadingContext = createContext<LoadingContextProps>(DEFAULT_VALUE);

export function LoadingContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loadingVisible, setLoadingVisible] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        isLoading: loadingVisible,
        setLoading: (state) => setLoadingVisible(state),
      }}>
      {children}
    </LoadingContext.Provider>
  );
}
