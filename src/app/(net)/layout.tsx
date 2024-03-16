import React, { ReactNode } from 'react';
import TabsNav from '@/components/tabs-nav';
import { Divider } from '@mui/material';
import { Input } from '@mui/base/Input';
import { ChevronDown, Copy } from 'lucide-react';
import { netRoutes } from '@/util/const';

export default function Layout({ children }: {
  children: ReactNode
}) {
  return (
    <main className="text-neutral-50 flex flex-col md:w-1/2 xl:w-1/3 m-auto min-[360px]:w-full justify-center h-full gap-y-2">
      <div className="flex justify-between items-end">
        <TabsNav tabsArray={netRoutes} isParameter={false}/>
        <div className="content-end">
          <div className="flex gap-x-2 items-center justify-end">
            <p className="min-[320px]:text-xs md:text-sm">Account name</p>
            <ChevronDown className="stroke-current stroke-2 min-[320px]:size-3 md:size-3.5"/>
          </div>
          <div className="text-neutral-400 hover:text-neutral-50 flex items-center gap-x-2 transition-all ease-out">
            <p className="text-current min-[320px]:text-xs md:text-sm cursor-pointer">0x81CB5...2b66C</p>
            <Copy className="stroke-current stroke-2 min-[320px]:size-3 md:size-3.5"/>
          </div>
        </div>
      </div>
      <Divider orientation="horizontal" className="bg-neutral-800"/>
      <div className="space-y-2">
        {children}
      </div>
      <div className="flex gap-x-2 ">
        <Input
          placeholder="Send to..."
          className="w-1/2"
          slotProps={{
            input: {
              className: 'input'
            },
          }}
        />
        <Input
          placeholder="Amount"
          className="w-1/2"
          slotProps={{
            input: {
              className: 'input'
            },
          }}
        />
      </div>
      <div className="">
        <button className="focus:border-neutral-200 outline-none transition-all ease-out border border-neutral-800 rounded-md w-full hover:border-neutral-600">
          <p className="min-[320px]:text-xs md:text-sm py-2 leading-6">Send</p>
        </button>
      </div>
    </main>
  )
}
