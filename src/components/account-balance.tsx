'use client'
import { useSDK } from '@metamask/sdk-react';
import React from 'react';

export default function AccountBalance() {

  const { balance } = useSDK()

  return (
    <>
      {
        balance ? <p
          className="min-[320px]:text-xs md:text-sm capitalize">{(parseInt(balance) / 1000000000000000000).toFixed(2)} ETH
        </p> : null
      }
    </>
  )
}
