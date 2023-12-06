"use client"
import Image from 'next/image'
import { RootState } from './Redux/store';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { AppDispatch } from './Redux/store';
import { addItem , removeItem } from './Redux/features/card-slice';



export default function Home() {




  const dispatch = useDispatch<AppDispatch>();

  const lang = useSelector( (state: RootState) => state.cardSlice.items)
  console.log(lang)

  const handleaddcard = ()=>{
    // dispatch(addItem({name:"reza"}))
  }
  
  return (
    <main className="">
      <button onClick={handleaddcard} className='' >hello fuck</button>

      <p>this is a first page with url</p>





    </main>
  )
}
