import * as React from 'react';
import { useState, useEffect } from 'react';
import { OffCanvas, OffCanvasMenu, OffCanvasBody } from "react-offcanvas";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineCaretRight, AiOutlineCaretDown } from "react-icons/ai";
//import { menuData } from './MenuData';
import SubMenu from './SubMenu';

const Menu = ({ menuData, menuOpen, isMenuOpened }) => {
     //const [isSubMenuOpened, setSubMenuOpened] = useState(false);
     // let obj = {};
     // obj["Mission Input"] = false;
     // obj["Dashboard"] = false;
     // obj["Report"] = false;
     // obj["Portal Management"] = false;

     const [isOpenObj, setIsOpenObj] = useState({});
     const handleClick = (t) => {
          //var obj = isOpenObj;
          // let obj = {};
          // obj = menuStruct;
          // obj[t] = !isOpenObj[t];
          
          for (let [key, value] of Object.entries(isOpenObj)) {
               if(key != t){
                    isOpenObj[key] = false;
               }
          }

          isOpenObj[t] = !isOpenObj[t];
          setIsOpenObj(isOpenObj => ({
               ...isOpenObj,
               ...isOpenObj
          }));

          //setSubMenuOpened(!isSubMenuOpened);

     }

     //const [isClose, sethandleClose] = useState(isMenuOpened || false);
     //const handleClose = () => sethandleClose(!isClose);

     // useEffect(() => {
     //      sethandleClose(isMenuOpened);
     // });
     
     return (
          <>
               <OffCanvas
                    width={300}
                    transitionDuration={300}
                    isMenuOpened={isMenuOpened}
                    position={"left"}
                    effect={"overlay"}
               >
                    <OffCanvasBody className={"my-body-className"} style={{ fontSize: "18px" }}>

                    </OffCanvasBody>
                    <OffCanvasMenu className={"my-menu-className"} style={{ fontWeight: "bold" }}>
                         <div className="offcanvas-header">
                              <h5 className="offcanvas-title" id="offcanvasExampleLabel">Sustainability <span>Mission Management Portal</span></h5>
                         </div>
                         <div className="off-canvas-close" onClick={menuOpen}>
                              <p>Close</p>
                              <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                         </div>

                         <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                              {menuData.map((val, key) => {
                                   return <>
                                        {val.subMenu ?
                                             <li>
                                                  <a data-bs-toggle="collapse" className="nav-link px-0 align-middle" onClick={() => handleClick(val.title)}>
                                                       {val.icon} <span className="ms-1 d-none d-sm-inline">{val.title}</span> <span className='sFloat'>{isOpenObj[val.title] ? <AiOutlineCaretDown /> : <AiOutlineCaretRight />}</span>
                                                  </a>
                                                  <ul className={isOpenObj[val.title] ? "collapse sub-menu nav flex-column ms-1 show" : "collapse nav flex-column ms-1 hide"} id="submenu1" data-bs-parent="#menu">
                                                       <SubMenu subMenu={val.subMenu} />
                                                  </ul>
                                             </li>
                                             :
                                             <li className="nav-item">
                                                  <a href={val.path} className="nav-link align-middle px-0">
                                                       {val.icon} <span className="ms-1 d-none d-sm-inline">{val.title}</span>
                                                  </a>
                                             </li>
                                        }
                                   </>
                              })}
                         </ul>

                         <ul className='bottom-nav'>
                              <li className="github">
                                   <a href="#" target="_blank">
                                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                                   </a>
                              </li>
                              <li className="email">
                                   <a href="mailto:hi@somewebmedia.com" target="_blank">
                                        <svg xmlns="#" width="24" height="24" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /><path d="M0 0h24v24H0z" fill="none" /></svg>
                                   </a>
                              </li>
                              <li className="ko-fi">
                                   <a href="#" target="_blank">
                                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z" /></svg>
                                   </a>
                              </li>
                         </ul>
                    </OffCanvasMenu>
               </OffCanvas>
          </>
     );
}

export default Menu

/*
     <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
          <li className="nav-item">
               <a href="#" className="nav-link align-middle px-0">
                    <AiFillHome size={'1.2rem'} /> <span className="ms-1 d-none d-sm-inline">Home</span>
               </a>
          </li>
          <li>
               <a data-bs-toggle="collapse" className="nav-link px-0 align-middle" onClick={handleClick}>
                    <AiFillAppstore size={'1.2rem'} /> <span className="ms-1 d-none d-sm-inline">Mission Input</span> <span className='sFloat'>{isSubMenuOpened ? <AiOutlineCaretDown /> : <AiOutlineCaretRight />}</span></a>
               <ul className={isSubMenuOpened ? "collapse sub-menu nav flex-column ms-1 show" : "collapse nav flex-column ms-1 hide"} id="submenu1" data-bs-parent="#menu">

                    <li className="w-100">
                         <a href="#" className="nav-link px-0"> <span className='mr-2'><FaLightbulb size={'1.2rem'} /></span><span className="d-none d-sm-inline">Energy</span> </a>
                    </li>
                    <h5>Solar</h5>
                    <li>
                         <a href="#" className="nav-link px-0"> <span className='mr-2'><AiFillCalculator size={'1.2rem'} /></span><span className="d-none d-sm-inline">Tariff Calculator</span></a>
                    </li>
                    <li>
                         <a href="#" className="nav-link px-0"> <span className='mr-2'><GiSolarPower size={'1.2rem'} /></span><span className="d-none d-sm-inline">Solar</span></a>
                    </li>
                    <h5>Carbon</h5>
                    <li>
                         <a href="#" className="nav-link px-0"> <span className='mr-2'><GiDustCloud size={'1.2rem'} /></span><span className="d-none d-sm-inline">Carbon (Scope 1 and 2)</span></a>
                    </li>
                    <li>
                         <a href="#" className="nav-link px-0"> <span className='mr-2'><GiDustCloud size={'1.2rem'} /></span><span className="d-none d-sm-inline">Carbon (Scope 3)</span></a>
                    </li>

               </ul>
          </li>
          <li>
               <a href="#" className="nav-link px-0 align-middle">
                    <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Orders</span></a>
          </li>
          <li>
               <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
                    <i className="fs-4 bi-bootstrap"></i> <span className="ms-1 d-none d-sm-inline">Bootstrap</span></a>
               <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                    <li className="w-100">
                         <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 1</a>
                    </li>
                    <li>
                         <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 2</a>
                    </li>
               </ul>
          </li>
          <li>
               <a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                    <i className="fs-4 bi-grid"></i> <span className="ms-1 d-none d-sm-inline">Products</span> </a>
               <ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                    <li className="w-100">
                         <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 1</a>
                    </li>
                    <li>
                         <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 2</a>
                    </li>
                    <li>
                         <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 3</a>
                    </li>
                    <li>
                         <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 4</a>
                    </li>
               </ul>
          </li>
          <li>
               <a href="#" className="nav-link px-0 align-middle">
                    <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Customers</span> </a>
          </li>
     </ul>
*/