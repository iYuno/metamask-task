'use server'
import TabsNav from '@/components/tabs-nav';
import AccountInfo from '@/components/account-info';
import React from 'react';
import AccountBalance from '@/components/account-balance';
import Controls from '@/components/controls';

export default async function Home() {

  return (
    <main
      className="text-neutral-50 flex flex-col md:w-1/2 xl:w-1/3 m-auto min-[360px]:w-full justify-center h-full gap-y-2">
      <AccountInfo/>
      <div className="w-full flex justify-between items-center">
        <TabsNav isChain/>
        <AccountBalance/>
      </div>
      <Controls/>
    </main>
  );
}
