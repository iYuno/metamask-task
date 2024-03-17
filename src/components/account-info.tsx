'use client'
import { useSDK } from '@metamask/sdk-react';
import { Copy, LogOut } from 'lucide-react';
import React from 'react';
import { Button, Popper } from '@mui/base';
import { Simulate } from 'react-dom/test-utils';
import TabsNav from '@/components/tabs-nav';
import { netRoutes } from '@/utils/const';
import { Divider } from '@mui/material';

export default function AccountInfo() {

  const { sdk, connected, connecting, account } = useSDK();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'copy-popper' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    navigator.clipboard.writeText(account!)
      .catch(error => {
        console.error('Error copying text to clipboard:', error);
      });
    setTimeout(() => {
      setAnchorEl(null)
    }, 1500)
  };

  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
    }
  };


  return (
    <>
      {connected ?
        <>
          <div className="flex justify-between items-end">
            <TabsNav tabsArray={netRoutes} isChain={false}/>
            <div className="content-end">
              <div
                className="flex gap-x-2 items-center text-neutral-400 hover:text-neutral-50 transition-all ease-out justify-end">
                <Button
                  className="flex items-center gap-x-1 text-rose-700 hover:text-rose-500 capitalize min-[320px]:text-xs md:text-xs"
                  onClick={disconnect}>
                  terminate
                  <LogOut className="stroke-2 stroke-current min-[320px]:size-3 md:size-3.5"/>
                </Button>
              </div>
              <button
                onClick={handleClick}
                className="[&>svg]:hover:stroke-neutral-50 text-neutral-400 hover:text-neutral-50 flex items-center gap-x-2 transition-all ease-out justify-end"
                aria-describedby={id}
              >
                <Copy className="transition-all ease-out stroke-transparent stroke-2 min-[320px]:size-3 md:size-3.5"/>
                <p
                  className="text-current min-[320px]:text-xs md:text-sm cursor-pointer">{account?.substring(0, 8)}...{account?.substring(account?.length - 8)}
                </p>
              </button>
              <Popper
                placement="bottom"
                id={id}
                open={open}
                anchorEl={anchorEl}
              >
                <p className="text-xs text-neutral-50 px-2 py-0.5 ml-2 border border-neutral-400 rounded-md">copied!</p>
              </Popper>
            </div>
          </div>
          <Divider orientation="horizontal" className="bg-neutral-800"/>
        </>
        :
        null
      }
    </>
  )
}
