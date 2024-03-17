'use client'
import { useSDK } from '@metamask/sdk-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { memo, useCallback, useEffect, useState } from 'react';
import { Tab, Tabs, TabsList } from '@mui/base';
import { mainNetArray, testNetArray } from '@/utils/const';

interface ITabs {
  tabsArray?: {
    key?: string,
    label: string,
    chainId?: string,
    chains?: string[]
  }[],
  isChain: boolean
}

function TabsNav({ tabsArray, isChain }: ITabs) {

  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { provider, chainId: chain } = useSDK()
  const [network, setNetwork] = useState<string | null>(null)
  const [chains, setChains] = useState<{label: string, chainId: string}[]>()

  const paramsHandler = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('chain', value)
    return params
  }, [searchParams])

  useEffect(() => {
    if (chain) {
      const net = tabsArray?.find(t => t.chains?.includes(chain))?.key!
      setNetwork(net)
      if (!!testNetArray.find(n => n.chainId === chain)) {
        setChains(testNetArray)
      } else {
        setChains(mainNetArray)
      }
    }
  }, [chain]);

  if (isChain) {
    return (
      <>
        {
          chain  ?
            <Tabs
              value={chain}
              aria-label="chain tabs"
              onChange={(event, value) => {
                provider?.request({
                  method: 'wallet_switchEthereumChain',
                  params: [
                    {
                      chainId: `${chains?.find(({ chainId }) => chainId === value?.toString())?.chainId}`
                    }
                  ]
                })
              }}
              className="bg-neutral-800 w-max rounded-lg"
            >
              <TabsList className="space-x-0.5 p-1 text-sm">
                {chains?.map(({ label, chainId }) => (
                  <Tab
                    key={chainId}
                    value={chainId}
                    className="tab"
                  >
                    {label}
                  </Tab>
                ))}
              </TabsList>
            </Tabs> : null
        }
      </>
    )
  } else {
    return (
      <>
        {chain ?
          <Tabs
            value={network}
            aria-label="network tabs"
            onChange={(event, value) => {
              provider?.request({
                method: 'wallet_switchEthereumChain',
                params: [
                  {
                    'chainId': `0x${value === 'main' ? '1' : '5'}`
                  }
                ]
              }).then(() => {
                setNetwork(value?.toString()!);
              })
            }}
            className="bg-neutral-800 w-max rounded-lg"
          >
            <TabsList className="space-x-0.5 p-1 text-sm">
              {tabsArray?.map(({ key, label }) => (
                <Tab
                  key={key}
                  value={key}
                  className="tab"
                >
                  {label}
                </Tab>
              ))}
            </TabsList>
          </Tabs> : null}
      </>
    )
  }
}

export default memo(TabsNav)
