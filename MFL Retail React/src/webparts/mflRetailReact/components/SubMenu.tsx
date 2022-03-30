import * as React from 'react';
// import { useState, useEffect } from 'react';
// import { AiFillHome, AiFillAppstore, AiFillCalculator, AiOutlineCaretRight, AiOutlineCaretDown } from "react-icons/ai";
// import { FaLightbulb } from "react-icons/fa";
// import { GiSolarPower, GiDustCloud } from "react-icons/gi";

function SubMenu({ subMenu }) {
     // const [isSubMenuOpened, setSubMenuOpened] = useState(false);
     // const handleClick = () => setSubMenuOpened(!isSubMenuOpened);

     return (
          <>
               {subMenu.map((val, key) => {
                    if (val.head && val.head != '') {
                         return <>
                              <h5>{val.head}</h5>
                              {val.nav ?
                                   (val.nav).map((valNav, key) => {
                                        return <li>
                                             <a href="#" className="nav-link px-0"> <span className='mr-2'>{valNav.icon}</span><span className="d-none d-sm-inline">{valNav.title}</span></a>
                                        </li>
                                   })
                                   :
                                   <></>
                              }

                         </>
                    } else {
                         return <>
                              <li className="w-100">
                                   <a href="#" className="nav-link px-0"> <span className='mr-2'>{val.icon}</span><span className="d-none d-sm-inline">{val.title}</span> </a>
                              </li>
                         </>
                    }
               })}
          </>
     )
}

export default SubMenu
