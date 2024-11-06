import React from "react";
import useActiveLink from "../utils/useActiveLink";

// Image

import logoLight from "../assets/images/logoBlanc.jpg";
import { Menu ,LogOut} from "lucide-react";
import { Link,useNavigate } from "react-router-dom";

const Navbar = () => {

    const { activeLink, handleLinkClick } = useActiveLink(".navbar-menu li.active");
    const navigate = useNavigate();
    return (
        <React.Fragment>
             <nav className="group-data-[skin=bordered]:shadow-sm  group-data-[skin=bordered]:border group-data-[skin=bordered]:border-slate-200 group-data-[skin=bordered]:dark:border-zink-500 relative flex justify-around items-center h-16 px-4 py-2 bg-white rounded-md shadow-md  navbar dark:bg-zink-700">
                <div className="shrink-0">
                    <Link to='/dashboard'><img src={logoLight} height={60} width={140} alt="logo" className="p-4 dark:block" /></Link>
                </div>
                <ul id="navbar7" className="absolute inset-x-0 z-20 items-center hidden py-3 bg-white shadow-lg dark:bg-zink-600 dark:md:bg-transparent md:z-0 navbar-menu rounded-b-md md:shadow-none md:flex top-full ltr:ml-auto rtl:mr-auto md:relative md:bg-transparent md:rounded-none md:top-auto md:py-0">
                    <li>
                        <Link
                            to='/dashboard'
                            className={`block md:inline-block px-4 md:px-3 py-2.5 md:py-0.5 text-15 font-medium text-slate-800 transition-all duration-300 ease-linear hover:text-custom-500 [&.active]:text-custom-500 dark:text-zink-100 dark:hover:text-custom-500 dark:[&.active]:text-custom-500 ${activeLink === '/Home' ? 'active' : ''}`}
                            // onClick={() => handleLinkClick('/dashboard')}
                        >Home</Link>
                    </li>
                    {/* <li>
                        <Link
                            to='/Learner'
                            className={`block md:inline-block px-4 md:px-3 py-2.5 md:py-0.5 text-15 font-medium text-slate-800 transition-all duration-300 ease-linear hover:text-custom-500 [&.active]:text-custom-500 dark:text-zink-100 dark:hover:text-custom-500 dark:[&.active]:text-custom-500 ${activeLink === '/About' ? 'active' : ''}`}
                            // onClick={() => handleLinkClick('/About')}

                        >All Learners</Link>
                    </li>
                    <li>
                        <Link
                            to='/Instructor'
                            className={`block md:inline-block px-4 md:px-3 py-2.5 md:py-0.5 text-15 font-medium text-slate-800 transition-all duration-300 ease-linear hover:text-custom-500 [&.active]:text-custom-500 dark:text-zink-100 dark:hover:text-custom-500 dark:[&.active]:text-custom-500 ${activeLink === '/About' ? 'active' : ''}`}
                            // onClick={() => handleLinkClick('/About')}

                        >All Instructors</Link>
                    </li> */}
                    <li>
                        <button onClick={()=>{
                          localStorage.removeItem('token')
                          localStorage.removeItem('user')
                          navigate('/login')
                          window.location.reload()
                        }}
                        className="flex items-center justify-center p-2 text-15 font-medium text-slate-800 transition-all duration-300 ease-linear hover:text-custom-500 dark:text-zink-100 dark:hover:text-custom-500 dark:[&.active]:text-custom-500"
                        title="Logout"
                        >
                          <LogOut size={20}/>
                        </button>
                    </li>
                </ul>
                <div className="ltr:ml-auto rtl:mr-auto md:hidden navbar-toggale-button">
                    <button type="button" className="flex items-center  justify-center size-[37.5px] p-0 text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                        <Menu /></button>
                </div>
            </nav>
            

            
        </React.Fragment>
    );
}

export default Navbar;