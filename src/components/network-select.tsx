'use client'
import { Select, SelectRootSlotProps } from '@mui/base';
import { Option } from '@mui/base/Option';
import { Typography } from '@mui/material';
import React from 'react';

export default function NetworkSelect() {
  return (
    <div className="w-full flex flex-col justify-center gap-y-2">
      <Select
        slotProps={{ listbox: { className: 'py-2 space-y-2 w-full bg-neutral-950' }, root: { className: 'flex justify-between' }, popup: {className: 'w-1/4'} }}
        slots={{ root: Button }}
        defaultValue={10}
        id="net-select"
        name="net-select"
        className="flex gap-x-8 py-1 px-3 rounded-md border border-neutral-800 text-3xl items-center self-center text-neutral-50 hover:bg-neutral-800 w-1/2"
      >
        <Option
          value={10}
          className="py-1 px-3 rounded-md cursor-pointer items-center text-neutral-50 hover:bg-neutral-800"
        >
          <Typography className="text-3xl">Ethereum Mainnet</Typography>
        </Option>
        <Option
          value={20}
          className="py-1 px-3 rounded-md cursor-pointer items-center text-neutral-50 hover:bg-neutral-800"
        >
          <Typography className=" text-3xl">BNB Chain</Typography>
        </Option>
      </Select>
    </div>
  )
}

const Button = React.forwardRef(function Button<
  TValue extends {},
  Multiple extends boolean,
>(
  props: SelectRootSlotProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const { ownerState, ...other } = props;
  return (
    <button type="button" {...other} ref={ref}>
      {other.children}
      {/*<KeyboardArrowDownOutlinedIcon className="size-7"/>*/}
    </button>
  );
});
