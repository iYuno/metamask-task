'use client'
import { useSDK } from '@metamask/sdk-react';
import React, { useEffect, useState } from 'react';
import { Input } from '@mui/base/Input';
import { Button } from '@mui/base';
import { testNetArray } from '@/utils/const';

const receiverRegex = /^0x[0-9a-fA-F]{40}$/;
export default function Controls() {

  const { sdk, connected, connecting, chainId: chain, provider, account } = useSDK()
  const [isTestNetwork, setIsTestNetwork] = useState<boolean>(false)

  const connect = async() => {
    try {
      sdk?.connect()
    } catch (err) {
      console.warn(err)
    }
  };

  useEffect(() => {
    if (chain) {
      setIsTestNetwork(testNetArray.some((ch) => ch.chainId === chain))
    }
  }, [chain]);

  return (
    <>
      {
        connected ?
          <form className="space-y-2"
                action={(data) => {
                  const receiver = data.get('receiver') as string
                  const amount = data.get('amount') as string
                  if (!receiverRegex.test(receiver)) {
                    return console.warn('invalid value')
                  }
                  if (receiver && amount) {
                    if (isNaN(+amount)) {
                      console.warn('invalid value')
                      return
                    }

                    provider?.request({
                      method: 'eth_sendTransaction',
                      params: [
                        {
                          from: account,
                          to: receiver,
                          value: Math.floor(+amount * Math.pow(10, 18)).toString(),
                        }
                      ]
                    })
                  } else {

                  }
                }}
          >
            <div
              className="flex gap-x-2 "
            >
              <Input
                placeholder="Send to..."
                id="receiver"
                type="text"
                name="receiver"
                className="w-1/2"
                required
                slotProps={{
                  input: {
                    className: 'input peer'
                  },
                }}
              />
              <Input
                placeholder="Amount"
                id="amount"
                type="text"
                name="amount"
                className="w-1/2"
                required
                slotProps={{
                  input: {
                    className: 'input'
                  },
                }}
              />
            </div>
            <button
              disabled={!isTestNetwork}
              type="submit"
              className={`min-[320px]:text-xs md:text-sm ${isTestNetwork ? 'cursor-pointer focus:border-neutral-200 hover:border-neutral-600' : 'text-neutral-600 '} border-neutral-800 py-2 leading-6 outline-none transition-all ease-out border rounded-md w-full `}
            >
              Send
            </button>
          </form> :
          <Button
            disabled={connecting}
            onClick={() => connect()}
            className="transition-all ease-out outline-none self-center min-[320px]:text-xs md:text-sm py-2 leading-6 rounded-md px-3 border border-neutral-800 hover:border-neutral-600 focus:border-neutral-200"
          >
            {connecting ? 'connecting' : 'connect'}
          </Button>
      }
    </>
  )
}
