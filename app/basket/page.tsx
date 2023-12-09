'use client'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import axios , { AxiosError } from 'axios';
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch } from 'react-redux';
import { addItem , removeItem } from '../Redux/features/card-slice';
import { AppDispatch } from '../Redux/store';
import { useAppSelector } from '../Redux/store';




const Basket = () => {

    const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index:number) => {
    setActiveTab(index);
    window.scrollTo(0, 0); // صفحه را به بالا اسکرول کنید
  };

  const buybasket : any = useAppSelector( (state) => state.cardSlice.items)

  const gobuybasket:any = buybasket.reduce((acc : any, curr : any) => {
    const existingProduct = acc.find((item:any) => item.name === curr.name);
    if (existingProduct) {
      existingProduct.count += 1;
    } else {
      acc.push({ name: curr.name, count: 1 });
    }
    return acc;
  }, []);

  const totalPrice = buybasket.reduce((sum : any, product:any) => sum + product.full_price.sale_price, 0);

  const uniqueBasket = buybasket.filter(
    (item: any, index: number, self: any[]) =>
      index ===
      self.findIndex((t: any) => t.id === item.id)
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (item:any) => {
    dispatch(addItem(item));
  };
  const handleRemoveFromCart = (id:number) => {
    dispatch(removeItem(id));
  };

  const sendingBasketProduct = async () => {

    const config = {
      method: "POST",
      url: "https://imis.silverage.co/api/shop/cart/details",
      params: {
        products: gobuybasket
      }
    };

    try {
      const response = await axios(config);


    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
      }
  };

    return ( 
        <>

<div className='flex flex-col w-full gap-10 px-20 max-[550px]:px-6'>


<div className='flex gap-10 border-b-[1px] '>
  <button className='relative w-20 h-10' onClick={() => handleTabClick(0)}> سبد خرید{activeTab === 0 && <div className={`   bottom-0 w-full h-1 rounded-t-2xl bg-red-500 absolute`}></div>}</button>
  <button className='relative w-28 h-10' onClick={() => handleTabClick(1)}> خریدهای بعدی{activeTab === 1 && <div className={`   bottom-0 w-full h-1 rounded-t-2xl bg-red-500 absolute`}></div>}</button>
</div>

<div className='flex gap-4 w-full max-[800px]:flex-col max-[800px]:items-center'>


  <div className='w-9/12 max-[1200px]:w-8/12 max-[950px]:w-7/12 max-[800px]:w-full rounded-lg flex flex-col gap-6 border-[1px] border-[#81858b]/0.4 h-fit'>
    <div className='p-4'><p>سبد خرید شما</p></div>


    {
      uniqueBasket.length === 0 ?
        <p className='text-[#f01436] bg-red pb-5'>هیچ محصولی یافت نشد</p>
        :
        uniqueBasket.map((item:any, index:number) =>
        (
          <div key={index} className='flex max-[450px]:flex-col  gap-2 w-full p-4 border-b-[1px] border-[#81858b]/0.4 '>
            <div className='w-3/12 max-[1025px]:w-4/12 max-[450px]:w-full max-[650px]:w-5/12 flex items-center flex-col gap-4'>
              <img className='w-3/4 rounded-lg' src={item.cover} alt="" />
              <div className='w-24 h-11 rounded-lg border-[1px] border-[#81858b]/[0.4] items-center justify-between  flex shadow-[0_2px_8px_0px_rgba(0,0,0,0.1)]'>

                <button onClick={() => handleAddToCart(item)}><AddIcon style={{ color: "#ef4056" }} /></button>
                <p className='text-[#ef4056]'>{buybasket.filter((e:any) => e.id == item.id).length}</p>
                <button onClick={() => handleRemoveFromCart(item.id)}><DeleteIcon style={{ color: "#ef4056" }} /></button>

              </div>
            </div>

            <div className='w-8/12 max-[1025px]:w-7/12 max-[450px]:w-full max-[650px]:w-7/12'>
              <p >{item.name}</p>
              <p className='text-[#62666d] text-base font-normal mt-3 '>مشکی</p>
              <p className='text-[#62666d] text-base font-normal mt-3 '>گارانتی اصالت و سلامت فیزیکی کالا</p>
              <p className='text-[#62666d] text-base font-normal mt-3 '>شرکت چرم مشهد</p>
              <p className='text-[#62666d] text-base font-normal mt-3 '>موجود در انبار فروشند</p>
              <p className='mt-3 text-base font-semibold'>{item.full_price.sale_price} تومان</p>
            </div>

          </div>
        ))
    }

  </div>


  <div className='w-3/12 max-[1200px]:w-4/12 max-[800px]:w-full max-[950px]:w-5/12 rounded-lg h-fit border-[1px] flex flex-col gap-6 border-[#81858b]/0.4 p-8'>
    <div className='flex justify-between '>
      <p className='text-[#62666d]'>قیمت کالاها (۲)</p>
      <p>{totalPrice.toLocaleString()} تومان</p>
    </div>
    <div className='flex justify-between '>
      <p className='text-[#62666d]'>جمع سبد خرید</p>
      <p>{totalPrice.toLocaleString()} تومان</p>
    </div>
    <div className='flex justify-between text-[#ef4056]'>
      <p>سود شما از خرید</p>
      <p>۰ تومان</p>
    </div>
    <button onClick={sendingBasketProduct} className='w-full mt-4 rounded-md bg-[#EF4056] text-white py-2'>ثبت سفارش</button>
           </div>

</div>
</div>



        </>
     );
}
 
export default Basket;