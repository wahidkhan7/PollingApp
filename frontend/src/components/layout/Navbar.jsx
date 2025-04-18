import React, { useState } from 'react'
import { FaDoorOpen } from 'react-icons/fa6';
import {HiOutlineMenu} from 'react-icons/hi';
const Navbar = ({activeMenu}) => {
  const [OpenSideMenu,setOpenSideMenu] = useState(false);
  return (
    <div className='flex gap-5 border-white-100 bg-slate-50/50 backdrop-blur-[2px] p-4 sticky top-0 z-30'>

      <button
        className='block lg:hidden text-black'
        onClick={()=>{
          setOpenSideMenu(!OpenSideMenu);
        }}
      >
        {OpenSideMenu?<HiOutlineX className='text-2xl'/>:<HiOutlineMenu className='text-2xl'/>}
      </button>
        <h2 className='text-lg font-medium text-black'/>

        {OpenSideMenu && (
          <div className='fixed top-[61px] -ml-4 bg-white'>
            <SideMenu activeMenu = {activeMenu}/>
          </div>
        )}
    </div>
  )
}

export default Navbar