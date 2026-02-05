import '../globals.css'
import Link from 'next/link'


export default function Menu({menuVisible, handleMenuVisbility}:
    {
        menuVisible: boolean
        handleMenuVisbility: () => void
    }){

    return(
        <>
        <div className={`flex flex-col md:hidden fixed z-30 top-0 right-0 bg-black/80 backdrop-blur-md min-h-screen w-[100%] xs:w-[100%] transition-all  duration-700 ease-out overflow-y-auto ${menuVisible ? "translate-x-0" : "translate-x-full"}`}>
           <div className="px-5">
              <div className="flex justify-between border-b-2 border-gray-600 py-2 h-[60px]">
                <h1 className="font-bold text-3xl">Logo</h1>
                <button className="flex justify-center items-center rounded-full w-8 h-8 font-bold fancyBorderForX border-2 p-1" onClick={handleMenuVisbility}>x</button>
              </div>
              <div className="flex flex-col gap-3 mt-5">
                <Link href={'/'}><h1 className="font-bold ">Home</h1></Link>
                <Link href={'../pages/genre'}><h1 className="font-bold ">Genres</h1></Link>
                <Link href={'../pages/blog'}><h1 className="font-bold ">Blog</h1></Link>
                <Link href={'../pages/contactUs'}><h1 className="font-bold ">Contact Us</h1></Link>
                <span className="flex gap-6  items-center font-bold  mt-3"> <Link href="/pages/login">Login</Link> <p className="font-bold text-3xl flex items-center">|</p>
               <Link className="text-[#238E8E]" href="/pages/signup">Register</Link>
                </span>
              </div>
            </div> 
        </div>
        <div>
            {menuVisible && <div className="h-[100vh] w-[100vw] fixed top-0 left-0" onClick={()=>
              handleMenuVisbility()}></div>}
          </div>
        </>
        
    )
}