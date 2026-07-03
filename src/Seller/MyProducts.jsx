import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'

const MyProducts = () => {
  const { token } = useContext(AuthContext)

  const apibase = "https://grocery-kirana-store.onrender.com"

  const [allProducts, setAllProducts] = useState([])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${apibase}/sellers/myproducts`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setAllProducts(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (token) {
      fetchProducts()
    }
  }, [token])

  return (
    <>
      <div className=' w-full h-[80vh] flex flex-col gap-2 ' >
        <h1 className=' font-semibold  ' >My Products</h1> 
          <div className="w-full flex flex-wrap gap-5  ">

            {
              allProducts.length === 0 ?

                <p className="text-lg font-semibold">
                  Product not available
                </p>

                :

                allProducts.map((product, index) => (

                  <div
                    key={index}
                    className="w-52 bg-white rounded-xl flex flex-col justify-between shadow hover:shadow-lg border overflow-hidden transition"
                  >

                    <div className="h-36 bg-gray-100 flex justify-center items-center">

                      <img
                        src={product.image_url}
                        alt=""
                        className="w-28 h-28 object-contain"
                      />

                    </div>

                    <div className="p-3">

                      <h2 className="font-semibold text-sm line-clamp-2">
                        {product.productname}
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        {product.brand} • {product.unit}
                      </p>

                      <div className="flex justify-between items-center mt-4">

                        <p className="font-bold text-green-600">
                          ₹{product.discount_price}
                        </p> 

                        <p className={` p-1 rounded-[1.2rem] text-[0.8rem]   ${product.isAvailable?"bg-[#b0eb91] text-[#1e7c04] ":"bg-[#fb9b9b] text-[#ef0a0a] "} `} >
                          {product.isAvailable? "Available" : "Out of Stock"}
                        </p>

                      </div>

                    </div>

                  </div>

                ))

            }
 
        </div>
      </div>
    </>
  )
}

export default MyProducts