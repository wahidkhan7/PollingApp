import React, { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import useUserAuth from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom'
import HeaderWithFilter from '../../components/layout/HeaderWithFilter'


const Home = () => {
    useUserAuth()
    const navigate = useNavigate()
    const[allPolls,setAllPolls]=useState([])
    const[stats,setStats]= useState([])
    const[page,setPage]=useState(1)
    const[hasMore,setHasMore]=useState(true)
    const[loading,setLoading]=useState(false)

    const[filterType,setFilterType]=useState("")

    const fetchAllPolls = async(overridgePage = page)=>{
      if(loading) return;

      setLoading(true)

      try {
        
      } catch (error) {
        
      }
      finally{
        
      setLoading(false)

      }

    }

  return (
  
    <DashboardLayout activeMenu = 'Dashboard'>  
      <div className='my-5 mx-auto'>
        <HeaderWithFilter
        title ="Polls"
        filterType ={filterType}
        setFilterType={setFilterType}
        />

      </div>
    </DashboardLayout>
  )
}

export default Home