import * as React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './Menu';
// import Example from './Example';
// require('../css/font-awesome.min.css');
// require('../css/bootstrap.min.css');
// require('../css/material-icon.css');
import { PnPGetItems } from './SPUtilities';
import * as FontAwesome from "react-icons/fa";
// import { AiFillHome, AiFillAppstore, AiFillCalculator, AiOutlineCaretRight, AiOutlineCaretDown } from "react-icons/ai";
// import { FaLightbulb } from "react-icons/fa";
// import { GiSolarPower, GiDustCloud } from "react-icons/gi";

require('../CSS/style.css');
require('../CSS/demo.css');
// require('../CSS/animate.min.css');

const IconFa = props => {
     const { iconName, size } = props;
     const icon = React.createElement(FontAwesome[iconName]);
     return <i style={{ fontSize: size }}>{icon}</i>;
};

const SideBar = ({ context }) => {
     const [isMenuOpened, setIsMenuOpened] = useState(false);
     const handleClick = () => setIsMenuOpened(!isMenuOpened);
     const [objMenuData, setObjMenuData] = useState([]);
     const [objMenuStruct, setObjMenuStruct] = useState({});
     let objIcon = {};
     objIcon["Home"] = "fa-FaHome";
     objIcon["Mission Input"] = 'fa-FaFolder';
     objIcon["Dashboard"] = 'fa-FaChartArea';
     objIcon["Report"] = 'fa-FaTable';
     objIcon["Issue Management"] = 'fa-FaFileContract';


//
     useEffect(() => {
          // window.addEventListener("DOMContentLoaded", function () {
          //   console.log('ready')
          // }, false);
          PnPGetItems("Role to Sustainability Mission Assets Map", "*", "", "", context).then(function (jObjSusMapping) {
               let menuData = [];
               let arrMenu = [];
               let objTemp = {};

               for (let index = 0; index < jObjSusMapping.length; index++) {
                    let asertType = jObjSusMapping[index]["MenuName"];

                    if (asertType && asertType != null && asertType != '') {
                         arrMenu.push(asertType);
                    }
               }

               arrMenu = [... new Set(arrMenu)];       //returns unique values
               for (let index = 0; index < arrMenu.length; index++) {
                    let iconType = objIcon[arrMenu[index]].split('-')[0];
                    let iconName = objIcon[arrMenu[index]].split('-')[1];
                    //ReatIconComp(iconType, iconName),
                    objTemp[arrMenu[index]] = {
                         title: arrMenu[index],
                         path: '#',
                         icon: ReatIconComp(iconType, iconName),
                         subMenu: []
                    };
               }

               let tempMenuStruct = {};
               for (let index = 0; index < arrMenu.length; index++) {
                    tempMenuStruct[arrMenu[index]] = false;
               }


               for (let index = 0; index < jObjSusMapping.length; index++) {
                    let asertType = jObjSusMapping[index]["MenuName"];

                    if (asertType && asertType != null && asertType != '') {
                         arrMenu.forEach(element => {
                              if (element == asertType) {
                                   if (jObjSusMapping[index]['IsSubMission']) { //multiple
                                        let lnth = jObjSusMapping[index]['SubMission_x0020_Name'].split(';').length;
                                        let tArr = jObjSusMapping[index]['SubMission_x0020_Name'].split(';');
                                        let iArr = jObjSusMapping[index]['Icons'] ? jObjSusMapping[index]['Icons'].split(';') : [];
                                        let arrNav = [];
                                        let objNav = {};

                                        for (let index = 0; index < lnth; index++) {
                                             let iconType = "fa";
                                             let iconName = "";
                                             let newArr = iArr.length > 0 && iArr[index] ? iArr[index].split('-') : [];

                                             for (let i = 0; i < newArr.length; i++) {
                                                  newArr[i] = newArr[i].charAt(0).toUpperCase() + newArr[i].substr(1);
                                                  iconName = iconName + newArr[i];
                                             }

                                             const element = tArr[index];  //   submission name
                                             objNav = {
                                                  title: element,
                                                  path: '#',
                                                  icon: iconName ? ReatIconComp(iconType, iconName) : <></>
                                             }
                                             arrNav.push(objNav);
                                        }

                                        objTemp[element]['subMenu'].push(
                                             {
                                                  head: jObjSusMapping[index]['Missions'] || "",
                                                  nav: arrNav
                                             }
                                        );
                                   }
                                   else {                              //single
                                        let iconType = "fa";
                                        let iconName = "";
                                        let iArr = jObjSusMapping[index]['Icons'] ? jObjSusMapping[index]['Icons'] : "";
                                        let newArr = iArr != "" ? iArr.split('-') : [];

                                        for (let i = 0; i < newArr.length; i++) {
                                             if(newArr[i] != ""){
                                                  newArr[i] = newArr[i].charAt(0).toUpperCase() + newArr[i].substr(1);
                                                  iconName = iconName + newArr[i];
                                             }
                                        }
                                        //console.log(iconName);
                                        objTemp[element]['subMenu'].push(
                                             {
                                                  title: jObjSusMapping[index]['Missions'],
                                                  path: '#',
                                                  icon: iconName ? ReatIconComp(iconType, iconName) : <></>
                                             }
                                        );
                                   }
                              }
                         });
                    }
               }


               menuData.push({
                    title: 'Home',
                    path: '#',
                    icon: ReatIconComp("fa", "FaHome")
               });

               for (let [key, value] of Object.entries(objTemp)) {
                    menuData.push(value);
               }

               setObjMenuStruct(objMenuStruct => ({
                    ...objMenuStruct,
                    ...tempMenuStruct
               }));
               setObjMenuData(menuData);

          }).catch(function (err) {
               console.log("Group not found: " + err);
          });

     }, []);

     return (
          <>
               <header className="bg-white text-dark shadow p-2 mb-2 sustain">
                    <div className="container-fluid">
                         <div className="row">
                              <div className="col-md-3 text-left">
                                   <h3 className="d-inline-block"><a href="#"><img src="https://abgapparelretail.sharepoint.com/sites/sustainabilitydashboard/Prod/SiteAssets/SPFX%20img/logo.jpg" alt="" title="" className="img-fluid" style={{ objectFit: "contain" }} /></a></h3>
                                   {/* <Icon iconName={"FaBeer"} size={'1.2rem'} /> */}
                                   <a className="toggle" onClick={handleClick} data-bs-toggle="offcanvas" role="button" aria-controls="offcanvasExample">
                                        <span></span>
                                   </a>
                              </div>
                              <div className="col-md-6">
                                   <h3 className="text-center animate-charcter">Sustainability Digital Dashboard</h3>
                              </div>
                              <div className="col-md-3 text-right">
                                   <a href="#" className="help">Help</a>
                                   <h3><a href="#"><img src="https://abgapparelretail.sharepoint.com/sites/sustainabilitydashboard/Prod/SiteAssets/SPFX%20img/logo.png" alt="" title="" className="img-fluid" style={{ objectFit: "contain", maxWidth: '35%' }} /></a></h3>
                              </div>
                         </div>
                    </div>
               </header>
               {objMenuStruct ? <Menu menuData={objMenuData} menuOpen={handleClick} isMenuOpened={isMenuOpened} /> : <></>}
          </>
     );
}

function ReatIconComp(iconType, iconName) {
     switch (iconType) {
          case "fa":
               return <IconFa iconName={iconName} size={'1.2rem'} />
          //break;     
          default:
               return <></>
     }
}
// demo.css
// 729		z-index: 1050;

export default SideBar