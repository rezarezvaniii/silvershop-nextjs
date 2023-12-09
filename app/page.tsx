"use client"
import Image from 'next/image'
import { RootState } from './Redux/store';
import { useSelector } from 'react-redux';
import { useState , useEffect } from 'react';
import axios , { AxiosError } from 'axios';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Stack from '@mui/material/Stack';
import LoadingHome from "./Components/loadingpages/LoadingHome";
import Link from 'next/link';


export default function Home() {

  const [products, setProducts] = useState<any[]>([])
  const [pageApi, setPageApi] = useState(1);
  const [countpage, setCountpage] = useState(12)
  const [loadingpage, setLoadingpage] = useState(true)
  const handleloading : number[] = [1, 2, 3, 4, 5, 6, 7, 8]

  const fetchListProducts = async () => {
    setLoadingpage(true)
    // const url = `https://api.hexarz.com/v1/api/manage/admin/users/list?page=${first}` ;
    const config = {
      method: "POST",
      url: "https://imis.silverage.co/api/shop/products/search",
      params: {
        search_key: "",
        group_depth: 2,
        load_products: 2,
        load_group: 1,
        per_page: 12,
        page: pageApi
      }
    };

    try {
      const response = await axios(config);
      
      setProducts(response.data.results.products)
      setCountpage(response.data.results.paginate_for_products.last_page)
      setLoadingpage(false)

    } catch (error) {
      const err = error as AxiosError
      console.log(err.response?.data)
    }
  };

  useEffect(() => {
    fetchListProducts()
  }, [pageApi])


  const lang = useSelector( (state: RootState) => state.cardSlice.items)

  return (
    <main className="flex flex-col w-full">
    
    <div className="flex mt-10 gap-5 px-4 ">
        <div className="w-2/12 max-[1000px]:w-0  max-[1000px]:hidden h-96">
          <div className="flex justify-between ">
            <p className="">فیلتر ها</p>
            <p className="text-[#f01436]"> حذف فیلتر ها</p>
          </div>
          <p className="mt-10 text-[#8A8A8A]">
            فیلتری وجود ندارد
          </p>

        </div>

        <div className="w-10/12 max-[1000px]:w-full  h-96 ">
          <div className="w-full  bg-[#F5F5F5] h-20 rounded-xl flex gap-20 items-center ps-4">
            <p className="text-[#8A8A8A]">مرتب سازی بر اساس:</p>
            <p>محصولات</p>

          </div>

          <div className="flex w-full  mt-8 flex-wrap ">

            {

                loadingpage === true ?
                handleloading.map((item, index:number) =>
                
                  <LoadingHome key={index} />
                  
                  )
                  
                  :
                  products.map((item :any , index:number) =>
                  (
                    <Link href={`/${item.id}`} key={index} className="w-[25%] max-[800px]:w-1/2 max-[580px]:w-full max-[1250px]:w-[33.3333%] max-[550px]:w-full  flex justify-between hover:scale-[1.01] hover:bg-white hover:z-20 flex-col pb-2 relative border-[0.2px] hover:shadow-[0_3px_10px_-5px_rgba(0,0,0,0.8)] border-gray-400/[0.5]">
                      <div className="w-full p-5 h-[300px]">
                        <img className="" src={item.cover} alt="" />
                      </div>
                      <p className="font-bold  text-base px-2 mt-4 ">{item.name}</p>
                      <p className="px-2 font-medium mt-2">
                        <StorefrontIcon color='error'/>
                        فروشگاه مرکزی
                      </p>
                      <div className="flex justify-between flex-col gap-2 px-2 mt-5">
                        {
                          item.full_price.discount_percent ?
                          <div className='flex justify-between w-full '>
                          <p className="text-[#f01436] ">
                              {item.full_price.sale_price_with_tax_and_discount.toLocaleString()} ریال
                            </p>
                            <p className='flex items-center justify-center rounded-full px-2 funt-bold text-white  bg-[#D32F2F]'>
                            {item.full_price.discount_percent}٪
  
                          </p>
                          </div>
                            :
                            null
                          }
                          <p className="font-medium line-through text-[#c0c2c5]">{item.full_price.sale_price.toLocaleString()} ریال</p>
                      </div>
                    </Link>
                  )
                  ) 
                
            }
          </div>
          <div className={`${ loadingpage == false ? "" : "hidden"} py-10 w-full flex justify-center`}>
            <Stack spacing={2}>
              <Pagination
                variant="outlined" shape="rounded"
                onChange={(e, value) => setPageApi(value)}
                onClick={() => window.scrollTo(0, 0)}
                count={countpage}
                renderItem={(item) => (
                  <PaginationItem
                    sx={{ background: "#F01436", color: "white" }}
                    className="hover:text-black after:text-black before:text-black text-black"

                    slots={{ previous: ArrowForwardIcon, next: ArrowBackIcon }}
                    {...item}
                  />
                )}
              />
            </Stack>
          </div>
        </div>
      </div>
 
    </main>
  )
}