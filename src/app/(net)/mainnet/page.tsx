import { Typography } from '@mui/material';
import TabsNav from '@/components/tabs-nav';
import { mainNetArray } from '@/util/const';

export default function Page() {
  return (
    <div className="w-full flex justify-between items-center">
      <TabsNav tabsArray={mainNetArray} isParameter/>
      <Typography className="min-[320px]:text-sm md:text-lg">$0.00 USD</Typography>
    </div>
  )
}
