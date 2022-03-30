import DateFnsUtils from '@date-io/date-fns';
import { InputAdornment } from '@material-ui/core';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import { DropzoneArea } from 'material-ui-dropzone';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { FaLightbulb, FaExclamationTriangle, FaRegCalendar } from "react-icons/fa";
import { cascadeData, incidentStatusData, stateData } from './MenuData';
import { TableDemo, tblData } from './TableDemo';
import { PnPAddAttachments, PnPAddItem } from './SPUtilities';
import { PnPGetByID, PnPGetItems } from './SPUtilities';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

require('../CSS/style.css');

let fileInfosSection5 = [];
let qryObj: any = {};
let qryObjString = "";

const SafetyIncident = ({ context }) => {
    let obj = {
        AccidentCategory: "",
        IncidentType: "",
        Severity: "",
        IncidentDate: "",
        SeverityDescription: "",
        IncidentDescription: "",
        RootCause: "",
        CAPA: "",
        IncidentStatus: "",
        IncidentCity: "",
        State: "",
        
        AuditLog: ""
    }
    
    let arrSCategory = [];
    cascadeData.forEach(element => {
        if (!arrSCategory.includes(element.ACatagory))
            arrSCategory.push(element.ACatagory);
    });

    const [financialYear, setFinancialYear] = useState(null);
    const [organization, setOrganization] = useState(null);
    const [facilityType, setFacilityType] = useState(null);
    const [facilityName, setFacilityName] = useState(null);
    const [month, setMonth] = useState(null);
    const [region, setRegion] = useState(null);
    const [storeID, setStore] = useState(null);
    const [fid, setFid] = useState(null);

    const [objACategory, setObjACategory] = useState(arrSCategory);
    const [objICategory, setObjICategory] = useState([]);
    const [objSeverity, setObjSeverity] = useState([]);
    
    const [selACategory, setSelACategory] = useState("");
    const [selICategory, setSelICategory] = useState("");
    const [selSeverity, setSelSeverity] = useState("");
    const [selSevDescription, setSelSevDescription] = useState("");    
    const [selectedDate, setSelectedDate] = useState(null);
    
    const [objPostData, setObjPostData] = useState(obj);

    //Page load starts
    useEffect(() => {       //page ready
        qryObj = GetQueryString();

        if (qryObj.fid) {        //get data from list               
            PnPGetByID("Safety Incident Data", qryObj.fid, "*,StoreId/StoreId", "StoreId", context).then(function (jObj) {
                if (jObj) {
                    if (jObj.Year) setFinancialYear(jObj.Year);
                    if (jObj.Organization) setOrganization(jObj.Organization);
                    if (jObj.FacilityType) setFacilityType(jObj.FacilityType);
                    if (jObj.Facility_x0020_Name) setFacilityName(jObj.Facility_x0020_Name);
                    if (jObj.Month) setMonth(jObj.Month);
                    if (jObj.Retail) setMonth(jObj.Month);
                    if (jObj.StoreId && jObj.StoreId.StoreId) setStore(jObj.StoreId.StoreId);
                                        
                    let obj = objPostData;

                    if(jObj.AccidentCategory)setSelACategory(jObj.AccidentCategory);
                    if(jObj.IncidentType){
                        setObjICategory([""+jObj.IncidentType]);                    //to load options                     
                        setSelICategory(jObj.IncidentType);                         //to set option
                    }
                    if(jObj.Severity){
                        setObjSeverity([""+jObj.Severity]);                         //to load options
                        setSelSeverity(jObj.Severity);                              //to set option
                    }

                    if(jObj.SeverityDescription)setSelSevDescription(jObj.SeverityDescription);
                    if(jObj.IncidentDate)setSelectedDate(new Date(jObj.IncidentDate));

                    obj["IncidentDescription"] = jObj.IncidentDescription ? jObj.IncidentDescription : "";
                    obj["RootCause"] = jObj.RootCause ? jObj.RootCause : "";
                    obj["CAPA"] = jObj.CAPA ? jObj.CAPA : "";
                    obj["IncidentStatus"] = jObj.IncidentStatus ? jObj.IncidentStatus : "";
                    obj["IncidentCity"] = jObj.IncidentCity ? jObj.IncidentCity : "";
                    obj["State"] = jObj.State ? jObj.State : "";

                    obj["AuditLog"] = jObj.AuditLog ? jObj.AuditLog : "";

                    // const [selACategory, setSelACategory] = useState("");
                    // const [selICategory, setSelICategory] = useState("");
                    // const [selSeverity, setSelSeverity] = useState("");
                    // const [selSevDescription, setSelSevDescription] = useState("");    
                    // const [selectedDate, handleDateChange] = useState(new Date());


                    setObjPostData(obj);
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

            if (qryObj.region) {
                let filter = "StoreId eq '" + qryObj.store + "'"
                PnPGetItems("Store Information Data", "*", "", filter, context).then(function (res) {
                    let jObj = res.length > 0 ? res[0] : null;
                    if (jObj) {
                        let temp = {
                            Year: qryObj.financialYear,
                            Organization: qryObj.organization,
                            FacilityType: qryObj.facilityType,
                            Facility_x0020_Name: qryObj.facilityName,
                            Month: qryObj.month,
                            StoreIdId: jObj.ID
                        }
                        qryObjString = JSON.stringify(temp);
                    }
                }).catch(function (err) {
                    console.log("Store info not found: " + err);
                });
            }
            else {
                let temp = {
                    Year: qryObj.financialYear,
                    Organization: qryObj.organization,
                    FacilityType: qryObj.facilityType,
                    Facility_x0020_Name: qryObj.facilityName,
                    Month: qryObj.month
                }
                qryObjString = JSON.stringify(temp);
            }
        }
    }, []);
    //Page load ends

    //page events starts
    function handleInputChange(e, name) {
        let obj = objPostData;
        let selVal = e.target ? e.target.value : e;
        obj[name] = selVal;
        setObjPostData(obj);
        e.preventDefault();
    }

    function handleDateChange(e){
        setSelectedDate(e);
    }

    function handleACategory(e) {
        let selVal = e.target.value;
        let arrTemp = cascadeData.filter(el => el.ACatagory == selVal);
        let arrIcategory = [];

        arrTemp.forEach(element => {
            if (!arrIcategory.includes(element.ICatagory))
                arrIcategory.push(element.ICatagory);
        });
        setSelACategory(selVal);
        setObjICategory(arrIcategory);
        setObjSeverity([]);
    }

    function handleICategory(e) {
        let selVal = e.target ? e.target.value : e;
        let arrTemp = cascadeData.filter(el => el.ACatagory == selACategory && el.ICatagory == selVal);
        let arrSeverity = [];

        arrTemp.forEach(element => {
            if (!arrSeverity.includes(element.Severity))
                arrSeverity.push(element.Severity);
        });
        setSelICategory(selVal);
        //setSelSeverity(arrSeverity);
        setObjSeverity(arrSeverity);

        arrTemp = cascadeData.filter(el => el.ACatagory == selACategory && el.ICatagory == selICategory && el.Severity == selSeverity);
        let arrSevDes = [];

        arrTemp.forEach(element => {
            if (!arrSevDes.includes(element.SevDescription))
                arrSevDes.push(element.SevDescription);
        });
        setSelSevDescription(arrSevDes[0] ? arrSevDes[0] : "");
    }

    function handleSeverity(e) {
        //setAddrType(e.target.value);
        //console.log(e.target.value);
        let selVal = e.target ? e.target.value : e;
        let arrTemp = cascadeData.filter(el => el.ACatagory == selACategory && el.ICatagory == selICategory && el.Severity == selVal);
        let arrSevDes = [];

        arrTemp.forEach(element => {
            if (!arrSevDes.includes(element.SevDescription))
                arrSevDes.push(element.SevDescription);
        });

        setSelSeverity(selVal);
        setSelSevDescription(arrSevDes[0] ? arrSevDes[0] : "");
    }

    function onSave() {
        //validation
        console.log(qryObjString);
        let postData: any = objPostData;

        postData.AccidentCategory = selACategory;
        postData.IncidentType = selICategory;
        postData.Severity = selSeverity;
        postData.SeverityDescription = selSevDescription;
        if (selectedDate)
            postData.IncidentDate = selectedDate.toISOString();

        //audit log

        if (qryObjString != "") {       //new item
            let obj = JSON.parse(qryObjString);
            postData.Year = obj.Year;
            postData.Organization = obj.Organization;
            postData.FacilityType = obj.FacilityType;
            postData.FacilityType = obj.FacilityType;
            postData.Facility_x0020_Name = obj.Facility_x0020_Name;
            postData.Month = obj.Month;
            postData.Mission_x0020_Data_x0020_Status = "Draft";

            if (obj.StoreIdId)
                postData.StoreIdId = obj.StoreIdId;
        }

        PnPAddItem("Safety Incident Data", postData, context).then(function (jObj) {
            console.log("incident added");
            let itemID = jObj.data.ID
            PnPAddAttachments(itemID, fileInfosSection5, "Safety Incident Data", context).then(function (jObj) {
                console.log("attachment added");
                let data = tblData && tblData != "" ? JSON.parse(tblData) : null;
                if (data) {
                    //add causalty details
                    //tblData = [];
                    let arrPromise = [];
                    data.forEach(element => {
                        let obj: any = element;
                        obj.Age = Number(obj.Age);
                        obj.DaysOnLeave = Number(obj.DaysOnLeave);
                        obj.AffectedBodyPart = { results: obj.AffectedBodyPart.split(',') };
                        obj.SafetyIncidentIDId = itemID;
                        delete obj.id;
                        delete obj.itemID;
                        delete obj.OptMinorBdyParts;
                        arrPromise.push(PnPAddItem("Incident Causality Details", obj, context));
                    });

                    Promise.all(arrPromise).then(function (jObj) {
                        console.log('causalty details added');
                        alert('Data Saved Successfully');

                    }).catch(function (err) {
                        console.log("Group not found: " + err);
                    });
                }

            }).catch(function (err) {
                console.log("Group not found: " + err);
            });
        }).catch(function (err) {
            console.log("Group not found: " + err);
        });

        console.log(postData);
        console.log(tblData);
    }

    function onSubmit() {

    }

    function onCancel() {

    }

    function onRevalidate() {

    }


    //page events starts

    //File upload section starts
    let tempFile = [];
    const [files, setFiles] = useState([]);
    const [fileBlob, setFileBlob] = useState([]);

    function handleSave(pFiles) {
        setFiles(pFiles);
        let file = blob(pFiles);
    }

    function blob(files) {
        var fileCount = files.length;
        fileInfosSection5 = [];
        //console.log(fileCount);
        //let temp = [];
        for (var i = 0; i < fileCount; i++) {
            var fileName = files[i].name;
            if (!tempFile.includes(fileName)) {
                tempFile.push(fileName);
                var file = files[i];
                var reader = new FileReader();
                reader.onload = (function (file) {
                    return function (e) {
                        //console.log(file.name);
                        //Push the converted file into array
                        fileInfosSection5.push({
                            "name": file.name,
                            "content": e.target.result
                        });
                        
                        setFileBlob([...fileBlob, [{
                            "name": file.name,
                            "content": e.target.result
                        }]]);
                    }
                })(file);
                reader.readAsArrayBuffer(file);
            }
            else {
                console.log("duplicate file found" + fileName);
            }
        }
    }
    //File upload section ends

    return <>
        <section className='safety'>
            <div className='container'>
                <div className='row'>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="box text-dark mt-3 shadow p-1 triangle">
                            <span className='fa-icon'><FaExclamationTriangle /></span>
                            <h3 className='ml-2'> Safety
                                <p className='mt-1 mb-0'>By 2020 ABFRL Aims Zero Severity at our premises.</p>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section className="safety-body">
            <div className="container">
                {facilityName != null ?
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
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

                                    {facilityType == "Retail" ?
                                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-1">
                                            <h6>Store</h6>
                                            <label>{storeID}</label>
                                        </div>
                                        :
                                        <></>
                                    }
                                </div>
                            </div>


                            <div className="tab-details border shadow mt-3 mb-3">
                                <h5 className="card-title bg-dark p-2 text-white rounded-top">Incident Reporting</h5>
                                <form action="" method="post" className="p-3">
                                    <div className="row">
                                        <div className="col-lg-6 mb-1">
                                            <div className="form-group row">
                                                <label className="col-lg-4">Accident Category *</label>
                                                <div className="col-lg-8">
                                                    <select className="custom-select shadow" onChange={handleACategory}>
                                                        {selACategory != '' ?
                                                            <>
                                                                <option disabled value=" ">Select</option>
                                                                {objACategory.map((val, key) => {
                                                                    return selACategory == val ? <option selected value={val}>{val}</option> : <option value={val}>{val}</option>
                                                                })}
                                                            </>
                                                            :
                                                            <>
                                                                <option selected disabled value=" ">Select</option>
                                                                {objACategory.map((val, key) => {
                                                                    return <option value={val}>{val}</option>
                                                                })}
                                                            </>
                                                        }
                                                    </select>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-1">
                                            <div className="form-group row">
                                                <label className="col-lg-4">Incident Type *</label>
                                                <div className="col-lg-8">
                                                    <select className="custom-select shadow" onChange={handleICategory}>
                                                        {selICategory != '' ?
                                                            <>
                                                                {/* <option disabled value=" ">Select</option> */}
                                                                {objICategory.map((val, key) => {
                                                                    return selICategory == val ? <option selected value={val}>{val}</option> : <option value={val}>{val}</option>
                                                                })}
                                                            </>
                                                            :
                                                            <>
                                                                {/* <option selected disabled value=" ">Select</option> */}
                                                                {objICategory.map((val, key) => {
                                                                    return <option value={val}>{val}</option>
                                                                })}
                                                            </>
                                                        }
                                                    </select>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-1">
                                            <div className="form-group row">
                                                <label className="col-lg-4">Severity *</label>
                                                <div className="col-lg-8">
                                                    <select className="custom-select shadow" onChange={handleSeverity}>
                                                        {selSeverity != '' ?
                                                            <>
                                                                <option disabled value=" ">Select</option>
                                                                {objSeverity.map((val, key) => {
                                                                    return selSeverity == val ? <option selected value={val}>{val}</option> : <option value={val}>{val}</option>
                                                                })}
                                                            </>
                                                            :
                                                            <>
                                                                <option selected disabled value=" ">Select</option>
                                                                {objSeverity.map((val, key) => {
                                                                    return <option value={val}>{val}</option>
                                                                })}
                                                            </>
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-1">
                                            <div className="form-group row">
                                                <label className="col-lg-4">Incident Date and Time *</label>
                                                {/* <div className="col-lg-8"><input type="date" name="" value="" className="form-control shadow" /></div> */}
                                                <div className="col-lg-8">
                                                    <div className='shadow'>
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <DateTimePicker
                                                                clearable
                                                                placeholder="DD-MM-YYYY"
                                                                format='dd-MM-yyyy HH:MM'
                                                                inputVariant='outlined'
                                                                InputProps={{
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <FaRegCalendar />
                                                                        </InputAdornment>
                                                                    )
                                                                }}
                                                                value={selectedDate}
                                                                minDate={new Date(new Date().setMonth(new Date().getMonth() - 1))}
                                                                maxDate={new Date()}
                                                                onChange={(e) => handleDateChange(e)}
                                                            />
                                                        </MuiPickersUtilsProvider>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-12 mb-1">
                                            <div className="form-group row">
                                                <label className="col-lg-2">Severity Description</label>
                                                <div className="col-lg-10"><textarea disabled className="form-control shadow" value={selSevDescription}></textarea></div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-1">
                                            <div className="form-group row">
                                                <label className="col-lg-4">Description *</label>
                                                <div className="col-lg-8"><textarea className="form-control shadow" placeholder="" defaultValue={objPostData["IncidentDescription"]} onChange={(e) => handleInputChange(e, "IncidentDescription")}></textarea></div>
                                            </div>
                                        </div>


                                        <div className="col-lg-6 mb-1">
                                            <div className="form-group row">
                                                <label className="col-lg-4">Root cause *</label>
                                                <div className="col-lg-8"><textarea className="form-control shadow" placeholder="" defaultValue={objPostData["RootCause"]} onChange={(e) => handleInputChange(e, "RootCause")}></textarea></div>
                                            </div>
                                        </div>


                                        <div className="col-lg-6 mb-1">
                                            <div className="form-group row">
                                                <label className="col-lg-4">CAPA *</label>
                                                <div className="col-lg-8">
                                                    {/* {objPostData["CAPA"] != "" ?
                                                        <textarea className="form-control shadow" defaultValue={objPostData["CAPA"]} onChange={(e) => handleInputChange(e, "CAPA")}></textarea>
                                                        :
                                                        <textarea className="form-control shadow" placeholder="Corrective Action and Preventive Action" onChange={(e) => handleInputChange(e, "CAPA")}></textarea>
                                                    } */}
                                                    <textarea className="form-control shadow" placeholder="" defaultValue={objPostData["CAPA"]} onChange={(e) => handleInputChange(e, "CAPA")}></textarea>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-lg-6 mb-1">
                                            <div className="form-group row">
                                                <label className="col-lg-4">Status *</label>
                                                <div className="col-lg-8">
                                                    <select className="custom-select shadow" onChange={(e) => handleInputChange(e, "IncidentStatus")}>
                                                        {objPostData["IncidentStatus"] != '' ?
                                                            <>
                                                                <option disabled value=" ">Select</option>
                                                                {incidentStatusData.map((val, key) => {
                                                                    return objPostData["IncidentStatus"] == val ? <option selected value={val}>{val}</option> : <option value={val}>{val}</option>
                                                                })}
                                                            </>
                                                            :
                                                            <>
                                                                <option selected disabled value=" ">Select</option>
                                                                {incidentStatusData.map((val, key) => {
                                                                    return <option value={val}>{val}</option>
                                                                })}
                                                            </>
                                                        }
                                                    </select>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-1">
                                            <div className="form-group row">
                                                <label className="col-lg-4">City *</label>
                                                <div className="col-lg-8">
                                                    <input type="text" name="" defaultValue={objPostData["IncidentCity"]} className="form-control shadow" onChange={(e) => handleInputChange(e, "IncidentCity")} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-1">
                                            <div className="form-group row">
                                                <label className="col-lg-4">State *</label>
                                                <div className="col-lg-8">
                                                    <select className="custom-select shadow" onChange={(e) => handleInputChange(e, "State")}>
                                                        {objPostData["State"] != '' ?
                                                            <>
                                                                <option disabled value=" ">Select</option>
                                                                {stateData.map((val, key) => {
                                                                    return objPostData["State"] == val ? <option selected value={val}>{val}</option> : <option value={val}>{val}</option>
                                                                })}
                                                            </>
                                                            :
                                                            <>
                                                                <option selected disabled value=" ">Select</option>
                                                                {stateData.map((val, key) => {
                                                                    return <option value={val}>{val}</option>
                                                                })}
                                                            </>
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>


                            <div className="tab-details border shadow mt-3 mb-3">
                                <h5 className="card-title bg-dark p-2 text-white rounded-top">Casuality Details</h5>

                                <div className="col-lg-12 col-md-12 col-sm-12 col-12 mb-1">
                                    <div className="table-responsive">
                                        <TableDemo fid={fid} context={context}/>                                        
                                    </div>
                                </div>
                            </div>


                            <div className="tab-details border shadow mt-3 mb-3">
                                <h5 className="card-title bg-dark p-2 text-white rounded-top">Supporting Documents</h5>
                                <div className="col-lg-12 supporting-docs">
                                    <div style={{ margin: "50px" }}>
                                        <DropzoneArea
                                            // open={open}
                                            inputProps={{ capture: "environment" }}
                                            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp', ".pdf", ".txt", ".xlsx", ".xls", ".pptx", ".ppt", ".doc", ".docx"]}
                                            showPreviews={false}
                                            showPreviewsInDropzone={true}
                                            showFileNames
                                            //showFileNamesInPreview
                                            filesLimit={10}
                                            maxFileSize={5242880}
                                            onChange={(files) => handleSave(files)}
                                            initialFiles={["https://abgapparelretail.sharepoint.com/sites/sustainabilitydashboard/dev/Development/Lists/Incident%20Causality%20Details/Attachments/11/reearth-logo.jpg"]}
                                        // onClose={handleClose}
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="tab-details border shadow mt-3 mb-3">
                                <h5 className="card-title bg-dark p-2 text-white rounded-top">Comments*</h5>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <textarea className="form-control shadow" defaultValue={objPostData["AuditLog"]} onChange={(e) => handleInputChange(e, "AuditLog")} id="exampleFormControlTextarea1" placeholder="Please mention any other information required for data validation." ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 mob-btn">
                            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                            <button type="button" className="btn btn-success ml-2" onClick={onSave}>Save</button>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 text-right mob-btn">
                            <button type="button" className="btn btn-primary" onClick={onRevalidate}>Revalidate</button>
                            <button type="button" className="btn btn-info ml-2" onClick={onSubmit}>Submit</button>
                        </div>

                    </div>
                    :
                    <div className="row">
                        <div className="d-flex justify-content-center m-5">
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                        </div>
                    </div>
                }

            </div>
        </section>
    </>
}

function GetQueryString() {
    var str = decodeURIComponent(window.location.href.split('?')[1]);
    return (str || document.location.search).replace(/(^\?)/, '').split("&").map(function (n) { return n = n.split("="), this[n[0]] = n[1], this }.bind({}))[0];
}

export default SafetyIncident;