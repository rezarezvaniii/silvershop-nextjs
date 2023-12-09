import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';


const LoadingHome = () => {
  return (
    <>
      <div className="w-[25%] max-[800px]:w-1/2 max-[580px]:w-full max-[1250px]:w-[33.3333%] max-[550px]:w-full  flex justify-between hover:scale-[1.01] hover:bg-white hover:z-20 flex-col pb-2 relative border-[0.2px] hover:shadow-[0_3px_10px_-5px_rgba(0,0,0,0.8)] border-gray-400/[0.5]">
        < div className="flex flex-col justify-between pb-6">

          <Stack spacing={1}>
            <div className='p-5 h-[300px]'>

            <Skeleton className="" width={"100%"} height={"100%"} variant="rectangular" />

            </div>
            <div className="px-2">
              <Skeleton variant="text" width={"70%"} sx={{ fontSize: '1.5rem' }} />

            </div>


            <div className="px-2">
              <Skeleton variant="text" width={"45%"} sx={{ fontSize: '1.5rem' }} />

            </div>

            <div className="flex justify-between px-2">
              <Skeleton variant="text" width={"40%"} sx={{ fontSize: '1.5rem' }} />
              <Skeleton className='rounded-full ' variant="text" width={"12%"} sx={{ fontSize: '1.5rem' }} />

            </div>
            <div className="px-2">
              <Skeleton variant="text" width={"40%"} sx={{ fontSize: '1.5rem' }} />

            </div>

          </Stack>

        </div>
      </div>
    </>
  );
}

export default LoadingHome;