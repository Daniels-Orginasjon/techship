import { Pages, navPages } from '../lib/server/pages';
import Image from 'next/image'
import {useRouter} from 'next/router'
import { useState } from 'react';

function Navbar() {
    const [loginModel, setLoginModel]=useState<boolean>(false)
        let router = useRouter()
    let currentPage = router.pathname

    let thisPage = navPages.find((item) => {
        return item.href.toLowerCase() === currentPage
    })

    function clickLogin(){
        setLoginModel(!loginModel)
    }

    return (
        <>
<nav className="bg-white border-gray-200 dark:bg-gray-900">
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
        <a href="./" className="flex items-center ">
            <div className="mr-3 h-6 sm:h-9">
                <Image src="/logo.png" alt="Flowbite Logo" height={529 / 12} width={491 / 12} />
            </div>
            <div className="self-center whitespace-nowrap dark:text-white mr-3 h-6 pt-1">
                <Image src='/logoTrans.png' alt="" height={156 / 5} width={647 / 5} />
            </div>
        </a>
        <form className="flex items-center">   
            <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input type="text" id="simple-search" className="bg-gray-50 border border-bluemain text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 " placeholder="Søk" required></input>
                </div>
        </form>
        <div className="flex items-center">
            <button className="text-sm font-medium text-white bg-bluemain hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 rounded-lg px-2 py-1 text-center" type="button" onClick={clickLogin}>Login</button>
        </div>
    </div>
</nav>
<nav className="bg-gray-50 dark:bg-gray-700">
    <div className="py-3 px-4 mx-auto max-w-screen-xl md:px-6">
        <div className="flex items-center">
            <ul className="flex flex-row mt-0 text-sm font-medium">
                {navPages.map((page, i) => {
                    let active= page.name ==thisPage?.name ? "bg-bluemain" : ""
                    return (<li key={i}><a href={page.href} className={"text-black hover:bg-bluemain px-7 py-2 rounded-md text-sm font-medium hover:text-white" +active}>{page.name}</a></li>)
                })}
            </ul>
        </div>
    </div>
</nav>
{
    loginModel && (          
    <div id='authentication-modal' tabIndex={-1} className=' bg-black bg-opacity-25 overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full absolute ' onClick={clickLogin}>
                        <div className='p-4 w-1/3 max-w-wd h-full md:h-auto mx-auto' onClick={(e) => { e.stopPropagation(); }}>
            <div className='relative bg-white rounded-lg shadow'>
                <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={clickLogin}>
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Close modal</span>
                </button>  
                    <div className='py-6 px-6 lg:px-8'>
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Pålogging</h3>
                        <form className='space-y-6' action='#'>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Din email</label>
                                <input name="email" id='email' type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder='example@gmail.com'></input>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ditt Passord:</label>
                                <input name="password" id='password' type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder='••••••••'></input>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required/>
                                    </div>
                                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Husk meg</label>
                                </div>
                                <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Husker ikke passord?</a>
                                        </div>
                            <button type="submit" className="w-full text-white bg-bluemain hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Pålogg brukeren</button>            
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Ikke registrert? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Lag konto</a>
                            </div>
                        </form>
                    </div>
            </div>
        </div>               
    </div>
    )
} 
    </>
    )
}
    
    export default Navbar