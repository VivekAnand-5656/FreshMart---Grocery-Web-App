import React from 'react'

const Footer = () => {
    return (
        <> 
            <div className="bg-[#175b02] rounded-base shadow-xs text-white m-4 rounded-2xl ">
                <div className="w-full max-w-7xl mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <h1 className=' text-2xl font-bold uppercase text-[#ffffff]  ' >Fresh<span className=' text-[#35d703] ' >Mart</span>  </h1>
                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-body sm:mb-0">
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">About</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 border-default sm:mx-auto lg:my-8" />
                    <span className="block text-sm text-body sm:text-center">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
                </div>
            </div>


        </>
    )
}

export default Footer