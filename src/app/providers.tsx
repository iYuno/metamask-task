'use client'

import React from 'react';
import { MetaMaskProvider } from '@metamask/sdk-react';

const host =
  typeof window !== 'undefined' ? window.location.host : 'defaultHost';

const sdkOptions = {
  logging: { developerMode: false },
  checkInstallationImmediately: true,
  dappMetadata: {
    name: 'Next-Metamask-Boilerplate',
    url: host, // using the host constant defined above
  },
};

export function Providers({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>{children}</MetaMaskProvider>
  )
}
