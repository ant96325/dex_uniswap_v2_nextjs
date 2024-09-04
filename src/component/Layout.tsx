import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Header from './Header';
import Footer from './Footer';
// import 'antd/dist/antd.less';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from '../wagmi';
const client = new QueryClient();

import { store, persistor } from '../store'


interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <React.StrictMode>
      <Provider store={ store }>
        <PersistGate loading={null} persistor={persistor}>
          <WagmiProvider config={config}>
            <QueryClientProvider client={client}>
              <RainbowKitProvider>
              <div className="bg-[#131313] relative flex h-screen w-screen min-w-0 shrink-0 flex-col sm:w-auto sm:shrink sm:grow">
                <Header />
                  {children}
                {/* <Footer /> */}
                </div>
              </RainbowKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

export default Layout;