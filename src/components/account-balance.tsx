'use client'
import { useSDK } from '@metamask/sdk-react';
import React, { useEffect, useState } from 'react';
import { testNetArray } from '@/utils/const';
import { Skeleton } from '@mui/material';

export default function AccountBalance() {

  const { chainId: chain, provider, connected, account } = useSDK()
  const [balance, setBalance] = useState<string | null>(null)
  const currencyHandler = (balance: string) => {
    if (!balance) return
    if (testNetArray.some(ch => ch.chainId === chain)) {
      return (
        (parseInt(balance) / 1000000000000000000).toFixed(2) + ' ' +
        testNetArray.find(ch => ch.chainId
          === chain)?.label + 'ETH')
    } else {
      return '$ ' + (parseInt(balance) / 1000000000000000000).toFixed(2)
    }
  }

  useEffect(() => {
    if (connected && provider && account) {
      provider.request({
        method: 'eth_getBalance',
        params: [
          account,
          'safe'
        ]
      }).then(res => setBalance(res?.toString()!))
    }
  }, [account,  connected, provider]);

  if (!connected) {
    return null
  }

  return (
    <>
      {
        balance ?
          <p
            className="min-[320px]:text-xs md:text-sm capitalize">
            {currencyHandler(balance)}
          </p> : <Skeleton className="rounded-md w-20 h-full bg-neutral-800"/>
      }
    </>
  )
}
