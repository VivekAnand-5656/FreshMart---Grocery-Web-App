import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'

const Orders = () => {
  const { token } = useContext(AuthContext)
  const [allOrders, setAllOrders] = useState([])
  const apibase = "https://grocery-kirana-store.onrender.com"

  // ============ Fetch All Orders ==========
  const fetch_orders = async () => {
    try {
      const response = await axios.get(`${apibase}/sellers/myorders`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log(`Datas:- ${response.data}`)
      setAllOrders(response.data)
    } catch (error) {
      console.log(`Error:- ${error}`)
    }
  }

  useEffect(() => {
    if (token) {
      fetch_orders()
    }
  }, [])
  // ====== orders fetch ho gya hai ab status update krna hai 

  return (
    <>
      <div className=' w-full h-full p-2 bg-[#d6ffce] ' >
        <h1 className=' text-[1.2rem] font-bold ' >My Orders</h1>
        <div className=' w-full h-[90%] border scrolling overflow-scroll flex flex-wrap gap-2 p-2 rounded ' >
          {
            allOrders.length === 0 ? (
              <p>No Orders</p>
            ) : (
              allOrders.map((order, index) => (
                <div key={index} className='  w-full h-60   flex flex-col justify-between  bg-[#ffffff] rounded p-2 relative ' >
                  <div className=' flex w-full h-[90%]   gap-2 p-1 overflow-scroll scrolling bg-[#e3f8d1] ' >
                    {
                      order.items.map((product, index) => (
                        <div className=' w-40 h-full bg-[#ffffff] rounded flex flex-col justify-between p-2  ' >
                          <img src="" alt="order" className=' w-full h-20  object-contain rounded ' />
                          <p className=' text-[0.9rem] text-[#249904] line-clamp-1 ' >{product.productname}</p>
                          <div className=' w-full flex justify-between items-center ' >
                            <p className=' font-semibold ' >₹ {product.discount_price}</p>
                            <p className=' text-[0.9rem] ' >Qty {product.quantity}</p>
                          </div>
                          <p className=' absolute top-0 right-1 bg-[#ffc013] rounded-2xl p-0.5 text-[0.7rem] text-[#ffffff]  ' >{product.status}</p>
                        </div>
                      ))
                    }
                  </div>
                  <p className=' bg-[#178404] text-white text-center font-semibold p-0.5 rounded ' >Total {order.totalAmount}</p>
                </div>
              ))
            )
          }
        </div>
      </div>
    </>
  )
}

export default Orders