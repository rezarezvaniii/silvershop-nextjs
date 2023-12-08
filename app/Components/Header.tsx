'use client'
import Link from "next/link";
import silverShopimg from "../../public/picture/62bae0e36e541479378535.png"
import Image from 'next/image'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { useAppSelector } from "../Redux/store";


const Header = () => {



  const productbasket : any = useAppSelector( (state) => state.cardSlice.items)

  const uniqueBasket = productbasket.filter(
    (item:any, index:number, self:any) => index === self.findIndex((t:any) => t.id === item.id)
  );

    return ( 
      <>
      <div className="px-[50px] flex max-[411px]:px-4 justify-between">
        <div className="flex gap-5 items-center w-1/2 ">
        <Image
      src={silverShopimg}
      alt="Picture of the author"
      // width={500} automatically provided
      // height={500} automatically provided
      // blurDataURL="data:..." automatically provided
      // placeholder="blur" // Optional blur-up while loading
    />
          <input className="w-3/4 max-[800px]:w-full max-[650px]:hidden h-12 rounded-xl  outline-none bg-[#F5F5F5] px-4" type="text" placeholder="جستجو" />

        </div>

        <div className="flex gap-4  items-center ">
          <button className="px-7 py-3 bg-[#f01436] max-[480px]:px-3 hover:bg-[#780a1b]/[0.9] transition-all duration-300 text-white rounded-xl">ورود / ثبت نام </button>
          <Link href={"/basket"} className="cursor-pointer relative">
            <LocalGroceryStoreIcon color="action" />
            {
              uniqueBasket.length !== 0 ?
              <div className="flex items-center justify-center w-6 h-6 rounded-md absolute -bottom-3 -left-3  bg-[#f01436]">
                <p className="text-white">
                  {
                    uniqueBasket.length ? uniqueBasket.length : null 
                  }
                </p>
              </div>
              :
              null
            }

          </Link>

        </div>



      </div>

      <div className="w-full h-16 border-b-2 border-gray-400/[0.2]  flex gap-4 px-[50px] items-center">
        <Link className="font-bold hover:text-[#f01436] transition-all duration-300 text-base" href={"/"}>خانه</Link>

        <Link className="font-bold hover:text-[#f01436] transition-all duration-300 text-base" href={"/basket"}>سبد خرید</Link>


      </div>
      
      </>
     );
}
 
export default Header;