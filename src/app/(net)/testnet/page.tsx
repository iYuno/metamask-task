import TabsNav from '@/components/tabs-nav';
import { testNetArray } from '@/util/const';
import { Typography } from '@mui/material';

export default function Page() {
  return (
    <div className="w-full flex justify-between items-center">
      <TabsNav tabsArray={testNetArray} isParameter/>
      <Typography className="min-[320px]:text-sm md:text-lg">$0.00 USD</Typography>
    </div>
  )
}
