import * as React from 'react'
import { useEffect, useState } from 'react';
import { PnPGetByID, PnPGetItems } from './SPUtilities';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

let qryObj: any = {};
let qryObjString = "";

function Facility({ context }) {
     const [financialYear, setFinancialYear] = useState(null);
     const [organization, setOrganization] = useState(null);
     const [facilityType, setFacilityType] = useState(null);
     const [facilityName, setFacilityName] = useState(null);
     const [month, setMonth] = useState(null);
     const [region, setRegion] = useState(null);
     const [storeID, setStore] = useState(null);
     const [fid, setFid] = useState(null);

     //Page load starts
     useEffect(() => {       //page ready
          qryObj = GetQueryString();

          if (qryObj.fid) {        //get data from list               
               PnPGetByID("Safety Incident Data", qryObj.fid, "StoreId\StoreId", "StoreId\StoreId", context).then(function (jObj) {
                    if (jObj) {
                         if (jObj.Year) setFinancialYear(jObj.Year);
                         if (jObj.Organization) setOrganization(jObj.Organization);
                         if (jObj.FacilityType) setFacilityType(jObj.FacilityType);
                         if (jObj.Facility_x0020_Name) setFacilityName(jObj.Facility_x0020_Name);
                         if (jObj.Month) setMonth(jObj.Month);
                         if(jObj.StoreId && jObj.StoreId.StoreId) setStore(jObj.StoreId.StoreId);                         
                    }
               }).catch(function (err) {
                    console.log("Group not found: " + err);
               });
               setFid(qryObj.fid);
          }
          else {
               setFinancialYear(qryObj.financialYear);
               setOrganization(qryObj.organization);
               setFacilityType(qryObj.facilityType);
               setFacilityName(qryObj.facilityName);
               setMonth(qryObj.month);
               setRegion(qryObj.region);
               setStore(qryObj.store);
               
               if(qryObj.region){
                    let filter = "StoreId eq '" + qryObj.store+ "'"
                    PnPGetItems("Store Information Data", "*", "", filter, context).then(function (res) {
                         let jObj = res.length > 0 ? res[0] : null;
                         if (jObj) {               
                              let temp = {
                                   Year: qryObj.financialYear,
                                   Organization: qryObj.organization,
                                   FacilityType: qryObj.facilityType,
                                   Facility_x0020_Name: qryObj.facilityName,
                                   Month : qryObj.month,
                                   StoreIdId: jObj.ID
                              }
                              qryObjString = JSON.stringify(temp);
                         }
                    }).catch(function (err) {
                         console.log("Group not found: " + err);
                    });
               }
               else {
                    let temp = {
                         Year: qryObj.financialYear,
                         Organization: qryObj.organization,
                         FacilityType: qryObj.facilityType,
                         Facility_x0020_Name: qryObj.facilityName,
                         Month : qryObj.month
                    }
                    qryObjString = JSON.stringify(temp);
               }               
          }
     }, []);
     //Page load ends

     return (
          <>
               {facilityName != null ?
                    <div className="box border text-dark mt-3 shadow p-4">
                         <div className="row">
                              <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-1">
                                   <h6>Year</h6>
                                   <label>{financialYear}</label>
                              </div>

                              <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-1">
                                   <h6>Month</h6>
                                   <label>{month}</label>
                              </div>

                              <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-1">
                                   <h6>Facility / Brand</h6>
                                   <label>{facilityName}</label>
                              </div>

                              {region == "Retail" ?
                                   <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-1">
                                        <h6>Store</h6>
                                        <label>{storeID}</label>
                                   </div>
                                   :
                                   <></>
                              }
                         </div>
                    </div>
                    :
                    <div className="d-flex justify-content-center m-5">
                         <Box sx={{ display: 'flex' }}>
                              <CircularProgress />
                         </Box>
                    </div>
               }

          </>
     )
}

function GetQueryString() {
     var str = decodeURIComponent(window.location.href.split('?')[1]);
     return (str || document.location.search).replace(/(^\?)/, '').split("&").map(function (n) { return n = n.split("="), this[n[0]] = n[1], this }.bind({}))[0];
}

export {Facility, qryObjString, GetQueryString}
