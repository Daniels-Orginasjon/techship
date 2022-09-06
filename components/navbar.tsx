import { Pages, navPages } from '../lib/server/pages';
import Image from 'next/image'
import {useRouter} from 'next/router'

function Navbar() {
        let router = useRouter()
    let currentPage = router.pathname

    let thisPage = navPages.find((item) => {
        return item.href.toLowerCase() === currentPage
    })
    return (
        <>
<nav className="bg-white border-gray-200 dark:bg-gray-900">
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
        <a href="./" className="flex items-center ">
            <img src="./logo.png" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo"/>
            <img className="self-center whitespace-nowrap dark:text-white mr-3 h-6 pt-2" src='./logoTrans.png'/>
        </a>
        <form className="flex items-center">   
            <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input type="text" id="simple-search" className="bg-gray-50 border border-bluemain text-gray-900 focus:border-blue-800 text-sm rounded-lg block w-full pl-10 p-2.5 " placeholder="Søk" required></input>
                </div>
        </form>
        <div className="flex items-center">
            <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">Login</a>
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

    </>
    )
}
    
    export default Navbar