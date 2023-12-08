'use client'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useState , useEffect } from 'react';
import axios , { AxiosError } from 'axios';
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch } from 'react-redux';
import { addItem , removeItem } from '../Redux/features/card-slice';
import { AppDispatch } from '../Redux/store';
import { useAppSelector } from '../Redux/store';
import LoadingProduct from '../Components/loadingpages/LoadingProduct';
import StorefrontIcon from '@mui/icons-material/Storefront';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';


const Product = ({ params }: { params: { id: string } }) => {

    const [detailsproduct, setDetailsproduct] = useState<any | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [imagehandler, setImagehandler] = useState(0)
    const [moredetails, setMoredetails] = useState(false)
    const [idhandling, setIdhandling] = useState<number>(0)
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index:number) => {
        setActiveTab(index);
        window.scrollTo(0, 0); // صفحه را به بالا اسکرول کنید
      };

      const fetchListProduct = async () => {

        // const url = `https://api.hexarz.com/v1/api/manage/admin/users/list?page=${first}` ;
        const config = {
          method: "POST",
          url: "https://imis.silverage.co/api/shop/products/details",
          params: {
            id: params.id
          }
        };
    
        try {
          const response = await axios(config);
    
          setDetailsproduct(response.data.results.product)
          setIdhandling(response.data.results.product.id)
          setIsLoading(false)
    
    
    
    
        } catch (error) {
            const err = error as AxiosError
            console.log(err.response?.data)
          }
      };
    
      useEffect(() => {
        fetchListProduct()
      }, [])


      const dispatch = useDispatch<AppDispatch>();
      
      const buybasket : any = useAppSelector( (state) => state.cardSlice.items)
      
      
      const handleaddcard = ()=>{
          dispatch(addItem(detailsproduct))
        }
        
        const handleremovecard = ()=>{
            dispatch(removeItem(idhandling))
        }
    
        return ( 
        <>
        {

isLoading ?

  <LoadingProduct />
  :
  <>
    <div className='z-20 bg-white hidden max-[1050px]:flex bottom-0 fixed h-1/6 w-full border-t-2 border-[#81858b]/[0.4]'>

      {
        buybasket.filter((item:any) => item.id == params.id).length < 1 ?
          <div className='flex items-center justify-evenly w-full h-full '>
            <button onClick={handleaddcard} className='w-fit h-fit px-5  mt-4 rounded-md bg-[#EF4056] text-white py-2'>افزودن به سبد خرید</button>
            {
              detailsproduct.full_price.discount_percent ?
                null
                :
                <div className='flex justify-end gap-1 '>
                  <p>قیمت : </p>
                  <p className='text-[#c0c2c5] line-through'>{detailsproduct.full_price.sale_price.toLocaleString()}</p>
                  <div>
                    <p className='flex items-center justify-center rounded-full px-2 funt-bold text-white  bg-[#D32F2F]'>
                      {detailsproduct.full_price.discount_percent}٪

                    </p>
                  </div>
                </div>
            }
          </div>
          :
          <div className='w-full flex gap-4 mt-4 justify-evenly items-center'>

            <div className='w-24 h-11 rounded-lg border-[1px] border-[#81858b]/[0.4] items-center justify-between  flex shadow-[0_2px_8px_0px_rgba(0,0,0,0.1)]'>
              <button onClick={handleaddcard}><AddIcon style={{ color: "#ef4056" }} /></button>
              <p className='text-[#ef4056]'>{buybasket.filter((item:any) => item.id == params.id).length}</p>
              <button onClick={handleremovecard}><DeleteIcon style={{ color: "#ef4056" }} /></button>
            </div>


            {
              detailsproduct.full_price.discount_percent ?
                <div className='flex justify-end gap-1 '>
                  <p className='text-[#c0c2c5] line-through'>{detailsproduct.full_price.sale_price.toLocaleString()}</p>
                  <div>
                    <p className='flex items-center justify-center rounded-full px-2 funt-bold text-white  bg-[#D32F2F]'>
                      {detailsproduct.full_price.discount_percent}٪

                    </p>
                  </div>
                </div>
                :
                null
            }



            <div>


              {
                detailsproduct.full_price.discount_percent ?
                  null
                  :
                  <div className='flex justify-end gap-1 '>
                    <p className='text-[#c0c2c5] line-through'>{detailsproduct.full_price.sale_price.toLocaleString()}</p>
                    <div>
                      <p className='flex items-center justify-center rounded-full px-2 funt-bold text-white  bg-[#D32F2F]'>
                        {detailsproduct.full_price.discount_percent}٪

                      </p>
                    </div>
                  </div>
              }
            </div>


          </div>
      }
    </div>


    <div className='flex flex-col max-[1050px]:pb-16'>


      <div className='flex justify-center max-[600px]:flex-col max-[600px]:items-center px-6'>

        <div className='w-4/12 max-[600px]:w-full max-[1050px]:w-1/2 flex flex-col mt-5'>
          <div className='w-full  flex justify-center '>
            <img className='h-80 rounded-md w-3/4' src={imagehandler ? imagehandler : detailsproduct.cover} alt="" />
          </div>

          <div className='flex gap-4 w-full mt-5 px-2 justify-center '>
            {
              detailsproduct.images.slice(0, 5).map((item :any, index:number) => (
                <div key={index} onClick={() => setImagehandler(item.path)} className={`${imagehandler == item.path ? "border-2 border-gray-600/[0.3]" : ""} w-20 h-20 rounded-lg cursor-pointer`}>
                  <img className='rounded-xl w-full h-full' src={item.path} alt="" />
                </div>

              ))

            }

          </div>

        </div>





        <div className='w-8/12 max-[1050px]:w-1/2 max-[600px]:w-full h-96 gap-3 flex flex-col '>
          <div className='w-full mt-4'>
            <p className='text-xl font-medium'>
              {detailsproduct.name}
            </p>


          </div>

          <div className='flex w-full gap-2 '>

            <div className='w-8/12 max-[1050px]:w-full flex flex-col ps-2 border-t-[1px] border-gray-400/[0.5] h-96 gap-2 '>
              <p className='mt-2 text-[#19bfd3] '>2 پرسش</p>
              <p className='font-bold text-xl '>رنگ : مشکی</p>


              <div className='w-10 h-10 rounded-full bg-white border-2 flex justify-center items-center border-[#19bfd3] '>
                <div className='w-8 h-8 rounded-full bg-black flex items-center justify-center' >
                  <DoneIcon sx={{ color: 'white' }} />
                </div>
              </div>


              <p className='mt-3 font-medium text-xl '>
                ویژگی ها
              </p>
              {
                detailsproduct.attributes.length === 0 ?
                  <p className='text-[#81858b] ' >مورد خاصی ثبت نشده است</p>
                  :
                  detailsproduct.attributes.map((item:any , index:number) => (

                    <div key={index} className='flex gap-2 font-medium text-base'>
                      <p className='text-[#81858b] '>{item.attribute_name} :</p>
                      <p className=''>{item.value}</p>
                    </div>

                  ))
              }


            </div>
            <div className='w-4/12 flex max-[1050px]:hidden  flex-col bg-[#f7f7f7] border-2 rounded-md border-[#E0E0E2] p-5 '>
              <p className=''>فروشنده</p>
              <div className='flex gap-2 mt-4'>
                <StorefrontIcon />
                <p>{detailsproduct.market.title}</p>
              </div>
              <p className='mt-2 text-[#81858b]'>عملکرد : <span className='text-[#b1b64d] '>خیلی خوب</span></p>
              <div className='w-full h-[1px] mt-8 bg-[#81858b]/[0.4] '></div>
              <p className='mt-5 text-base'> <GppGoodOutlinedIcon />  سرویس ویژه دیجی کالا: ۷ روز تضمین بازگشت کالا</p>
              <div className='w-full h-[1px] mt-4 bg-[#81858b]/[0.4] '></div>

              <div className='w-full mt-2'>
                {
                  detailsproduct.full_price.discount_percent ?
                    <div className='flex justify-end gap-1 '>
                      <p className='text-[#c0c2c5] line-through'>{detailsproduct.full_price.sale_price.toLocaleString()}</p>
                      <div>
                        <p className='flex items-center justify-center rounded-full px-2 funt-bold text-white  bg-[#D32F2F]'>
                          {detailsproduct.full_price.discount_percent}٪

                        </p>
                      </div>
                    </div>
                    :
                    null
                }

                <p className='text-end mt-5'>
                  تومان {detailsproduct.full_price.sale_price_with_tax_and_discount.toLocaleString()}
                </p>

              </div>


              {
                buybasket.filter((item:any) => item.id == params.id).length < 1 ?

                  <button onClick={handleaddcard} className='w-full mt-4 rounded-md bg-[#EF4056] text-white py-2'>افزودن به سبد خرید</button>
                  :
                  <div className='w-full items-center flex gap-4 mt-4'>

                    <div className='w-24 h-11 rounded-lg border-[1px] border-[#81858b]/[0.4] items-center justify-between  flex shadow-[0_2px_8px_0px_rgba(0,0,0,0.1)]'>
                      <button onClick={handleaddcard}><AddIcon style={{ color: "#ef4056" }} /></button>
                      <p className='text-[#ef4056]'>{buybasket.filter((item:any) => item.id == params.id).length}</p>
                      <button onClick={handleremovecard}><DeleteIcon style={{ color: "#ef4056" }} /></button>
                    </div>
                    <p className='w-2/4'>در سبد خرید شما</p>
                  </div>
              }


            </div>
          </div>



        </div>

      </div>




      <div className='w-full px-6 mt-10'>

        <div className='flex gap-10 border-b-[1px] '>
          <button className='relative w-20 h-10' onClick={() => handleTabClick(0)}>مشخصات {activeTab === 0 && <div className={`   bottom-0 w-full h-1 rounded-t-2xl bg-red-500 absolute`}></div>}</button>
          <button className='relative w-20 h-10' onClick={() => handleTabClick(1)}>دیدگاه ها {activeTab === 1 && <div className={`   bottom-0 w-full h-1 rounded-t-2xl bg-red-500 absolute`}></div>}</button>
          <button className='relative w-20 h-10' onClick={() => handleTabClick(2)}>پرسش ها {activeTab === 2 && <div className={`   bottom-0 w-full h-1 rounded-t-2xl bg-red-500 absolute`}></div>}</button>
        </div>

        <div className=' w-full'>
          {activeTab === 0 && (
            <div className='w-9/12 max-[950px]:w-full flex pb-10 '>
              <div className='w-2/12 max-[600px]:w-3/12 mt-10 flex flex-col justify-between text-lg'>
                <p>مشخصات</p>

              </div>
              <div className='w-2/12 max-[600px]:w-4/12 mt-14 '>
                {
                  moredetails ?
                    detailsproduct.group.attributes.map((item:any, index:number) => (
                      <p key={index} className='font-medium text-base py-4 text-[#81858b]'>{item.name}</p>

                    ))
                    :
                    detailsproduct.group.attributes.slice(0, 4).map((item:any, index:number) => (
                      <p key={index} className='font-medium text-base py-4 text-[#81858b]'>{item.name}</p>

                    ))

                }

                <button onClick={() => setMoredetails(!moredetails)} className='text-red-400 mt-5 w-fit'>
                  {
                    moredetails ?
                      "کمتر"
                      :
                      "بیشتر"
                  }

                </button>
              </div>

              <div className='w-8/12 mt-14 '>
                {
                  moredetails ?
                    detailsproduct.group.attributes.map((item:any, index:number) => (
                      <div key={index} className='border-b-[1px] border-[#81858b]/[0.5] py-4'><p className='font-medium text-base'>{item.values[0]}</p></div>
                    ))
                    :

                    detailsproduct.group.attributes.slice(0, 4).map((item:any, index:number) => (
                      <div key={index} className='border-b-[1px] border-[#81858b]/[0.5] py-4'><p className='font-medium text-base'>{item.values[0]}</p></div>
                    ))
                }
              </div>

            </div>
          )}
          {activeTab === 1 && (
            <div className='mt-10'>
              <p>دیدگاهی ثبت نشده است</p>
            </div>
          )}
          {activeTab === 2 && (
            <div className='mt-10'>
              <h2>پرسشی موجود نیست</h2>

            </div>
          )}
        </div>

      </div>





    </div>


  </>

}
        </>
     );
}

export default Product;