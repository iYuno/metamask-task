'use client'
import { useSDK } from '@metamask/sdk-react';
import React, { useEffect, useState } from 'react';
import { Input } from '@mui/base/Input';
import { Button } from '@mui/base';


export default function Controls() {

  const { sdk, connected, connecting, chainId } = useSDK()
  const [isTestNetwork, setIsTestNetwork] = useState<boolean>(false)
  const connect = async() => {
    try {
      sdk?.connect()
    } catch (err) {
      console.warn(err)
    }
  };

  useEffect(() => {

  }, [chainId]);

  return (
    <>
      {
        connected ?
          <>
            <form
              className="flex gap-x-2 "
              action={(data) => {}}
            >
              <Input
                placeholder="Send to..."
                id="receiver"
                type="text"
                name="receiver"
                className="w-1/2"
                slotProps={{
                  input: {
                    className: 'input'
                  },
                }}
              />
              <Input
                placeholder="Amount"
                id="amount"
                type="text"
                name="amount"
                className="w-1/2"
                slotProps={{
                  input: {
                    className: 'input'
                  },
                }}
              />
            </form>
            <button
              disabled={isTestNetwork}
              type="submit"
              className={`min-[320px]:text-xs md:text-sm ${isTestNetwork ? 'focus:border-neutral-200 hover:border-neutral-600' : 'text-neutral-600 '} border-neutral-800 py-2 leading-6 outline-none transition-all ease-out border rounded-md w-full `}
            >
              Send
            </button>
          </> :
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
