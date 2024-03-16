'use client'
import { Tab, Tabs, TabsList } from '@mui/base';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { memo, useCallback } from 'react';

interface ITabs {
  tabsArray: {
    key: string,
    link?: string
  }[],
  isParameter: boolean
}

function TabsNav({ tabsArray, isParameter }: ITabs) {

  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const paramsHandler = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('network', value)
    return params
  }, [searchParams])

  return (
    <>
      <Tabs
        value={isParameter ? searchParams.get('network') || tabsArray[0].key : pathname.split('/').slice(1, 2)[0]}
        aria-label="basic tabs"
        onChange={(event, value) => {
          if (isParameter) {
            router.push(pathname + '?' + paramsHandler(value!.toString()))
          } else {
            router.push('/' + value?.toString())
          }
        }}
        className="bg-neutral-800 w-max rounded-lg"
      >
        <TabsList className="space-x-0.5 p-1 text-sm">
          {tabsArray.map(({ key, link }) => (
            <Tab
              key={key}
              value={link?.slice(1) || key}
              className="tab"
            >
              {key}
            </Tab>
          ))}
        </TabsList>
      </Tabs>
    </>
  )
}

export default memo(TabsNav)
