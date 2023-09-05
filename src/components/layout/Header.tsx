import { BRAND_NAME } from "../../constant/Constant";




const Header = ({ username, logoutHandler,close }: any) => (
    <header className="header bg-white shadow py-4 px-4 top-0 sticky z-50">
        <div className="header-content flex items-center flex-row">
            <span className="text-2xl  
    ml-12
    md:hidden font-extrabold whitespace-nowrap truncate text-primary-800">
                {BRAND_NAME}
            </span>
 

            <div className="flex ml-auto">
                <div className="flex flex-end items-center">
                    <div className="flex items-center h-full text-sm">
                        <div className="flex items-center h-full">
                            <div className="rounded-full h-6 w-6 border shadow-lg 
            text-center
            bg-orange-500
            
            "><span className="text-white capitalize text-md">
                                    {username && username.charAt(0)}
                                </span></div>

                                {/* <div className="relative inline-block text-left">
  <div>
    <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
      Options
      <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
    <div className="py-1" role="none">
      <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-0">Account settings</a>
      <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-1">Support</a>
      <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-2">License</a>
      <form method="POST" action="#" role="none">
        <button type="submit" className="text-gray-700 block w-full text-left px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-3">Sign out</button>
      </form>
    </div>
  </div>
  </div>     */}

                            <div className="group relative h-full">
                                <div
                                    className="text-black flex items-center h-full bg-grey-darkest px-4 cursor-pointer"
                                >
                                  <span className="capitalize">{username}</span>  
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        className="h-6 w-6 text-grey-darker fill-current ml-1"
                                    >
                                        <path
                                            className="heroicon-ui"
                                            d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"
                                        />
                                    </svg>
                                </div>
                                <div className="hidden shadow-lg group-hover:block absolute pin-r -ml-8 top-full w-48 bg-white">
                                    <ul className="list-reset">
                                        <li>
                                            <a href="#" className="px-4 py-2 block text-gray-900 hover:bg-gray-200  no-underline hover:no-underline">My account</a></li>
                                        <li>
                                            <hr className="border-t mx-2 border-gray-400" />
                                        </li>
                                        <li>
                                            <button
                                                onClick={logoutHandler}
                                                className="px-4 py-2 w-full text-left  text-gray-900 hover:bg-gray-200 no-underline hover:no-underline">
                                                Logout</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <MobileHeader close={close}/>
                </div>
            </div>
        </div>
    </header>
)


const MobileHeader = ({close}:any) => (
    <label
        htmlFor="menu-open"
        id="mobile-menu-button"
        className=" p-2 focus:outline-none   md:hidden cursor-pointer hover:text-white hover:bg-primary-800 rounded-md"
    >
        <svg
            id="menu-open-icon"
            className="h-6 w-6 transition duration-200 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <a href="#" onClick={close}>
        <svg
        
            id="menu-close-icon"
            className="h-6 w-6 transition duration-200 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12" />
        </svg>
        </a>
    </label>)

export default Header;