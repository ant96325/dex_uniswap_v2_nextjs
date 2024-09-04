import '../styles/Home.module.css'
import '../styles/globals.css'

import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { config } from '../wagmi';
import { AppPropsWithLayout } from '../types/pages';

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return  getLayout(<Component {...pageProps} />);
  
}

export default MyApp;
