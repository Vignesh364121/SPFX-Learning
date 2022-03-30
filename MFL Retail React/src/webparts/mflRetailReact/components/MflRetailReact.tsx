import * as React from 'react';
import { FunctionComponent, useState, useEffect } from 'react';
//import styles from './MflRetailReact.module.scss';
import { IMflRetailReactProps } from './IMflRetailReactProps';
//import { escape } from '@microsoft/sp-lodash-subset';
import SideBar from './SideBar';
import { sp } from "@pnp/sp/presets/all";
import { PnPGetItems } from './SPUtilities';
import SafetyIncident from './SafetyIncident';
import MultiSelect from 'react-multiple-select-dropdown-lite';
import 'react-multiple-select-dropdown-lite/dist/index.css';
import { TableDemo, tblData } from './TableDemo';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DialogTitle, IconButton, InputAdornment } from '@material-ui/core';
import { FaRegCalendar } from 'react-icons/fa';

//import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";


import { DropzoneArea, DropzoneDialog } from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';

const MflRetailReact: FunctionComponent<IMflRetailReactProps> = (props) => {
  let context = props.context;
  // context.pageContext.web.absoluteUrl;
  // context.pageContext.web.serverRelativeUrl
  let curUserEmail = context.pageContext.user.email;
  sp.setup({
    spfxContext: context
  });

  const [value, setvalue] = useState('');

  const handleOnchange = val => {
    setvalue(val);
    console.log(tblData);
  };

  const options = [
    { label: 'Option 1', value: 'option_1' },
    { label: 'Option 2', value: 'option_2' },
    { label: 'Option 3', value: 'option_3' },
    { label: 'Option 4', value: 'option_4' },
  ];

  const [tableData, setTableData] = useState({});

  function handleTblSave() {
    console.log(tableData);
  }

  useEffect(() => {
    let ele = document.querySelectorAll('[data-automation-id="CanvasZone"]');
    ele[0].removeAttribute("class");

    // ele = document.querySelectorAll('[data-automation-id="CanvasControl""]');
    // ele[0].removeAttribute("class");

    // window.addEventListener("DOMContentLoaded", function () {
    //   console.log('ready')
    // }, false);
    // PnPGetItems("Role to Sustainability Mission Assets Map","*","","",context).then(function (obj) {

    // }).catch(function (err) {
    //   console.log("Group not found: " + err);
    // });

    // sp.web.siteGroups.getByName('SPFX Admins').users.get().then(function (user) {
    //   let isAdmin = false;

    //   user.forEach(element => {
    //     if (element.Email == curUserEmail) {
    //       isAdmin = true;
    //     }
    //   });

    //   //HideDefaultElements(isAdmin);
    //   let ele = document.querySelectorAll('[data-automation-id="CanvasZone"]');
    //   ele[0].removeAttribute("class");

    //   ele = document.querySelectorAll('[data-automation-id="CanvasControl""]');
    //   ele[0].removeAttribute("class");

    // }).catch(function (err) {
    //   console.log("Group not found: " + err);
    // });
    
    // let qryString: any = GetQueryString();

    // if (qryString.fid && qryString.fid != "") {

    // }
  });



  const [selectedDate, handleDateChange] = useState(new Date());
  const styles = (theme) => ({
    grid: {
      width: "60%"
    },
    root: {
      "& .MuiFormLabel-root": {
        fontSize: "30px"
      }
    },
    customTextField: {
      width: "100px",
      "& input::placeholder": {
        fontSize: "10px"
      }
    }
  });

  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);

  function handleOpen() { setOpen(true); }
  function handleClose() { setOpen(false); }
  function handleSave(pFiles) {
    setFiles(pFiles);
    setOpen(false);
  }

  return (
    <>
      <SideBar context={context} />
      <SafetyIncident context={context} />

      {/* <Button autoFocus onClick={() => setOpen(true)} color="primary">
        Open
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="dialog-title"
      >
        <DialogContent>
          <DialogTitle>My title</DialogTitle>
          <DialogContentText>This is my content</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog> */}

      {/* <MultiSelect
        className="multi-select"
        onChange={handleOnchange}
        options={options}
        disableChip={true}
        singleSelect={true}
      /> */}
      {/* <TableDemo /> */}
      {/* https://www.npmjs.com/package/react-multiple-select-dropdown-lite */}
      {/* https://yuvaleros.github.io/material-ui-dropzone/ */}
      {/* https://www.geeksforgeeks.org/how-to-create-an-editable-table-with-add-delete-and-search-filter-using-reactjs/ */}
    </>
  );
}


/*  Hide SharePoint Defaults  */
function HideDefaultElements(isAdmin) {
  //if ((curPageUrl).includes("SitePages") && (absoluteURL == "https://abgapparelretail.sharepoint.com/sites/sustainabilitydashboard") || absoluteURL == "https://enoah429.sharepoint.com/sites/SPFX")  {    //https://enoah429.sharepoint.com/sites/SPFX
  let elem;
  elem = document.getElementById("sp-appBar");
  elem.parentNode.removeChild(elem);
  elem = document.getElementById("spLeftNav");
  elem.parentNode.removeChild(elem);

  elem = document.getElementById("spSiteHeader");
  elem.parentNode.removeChild(elem);
  elem = document.getElementById("CommentsWrapper");
  elem.parentNode.removeChild(elem);

  let elem1 = document.querySelectorAll('[data-automation-id="pageHeader"]');
  elem1[0].remove();

  let header = `<div class="navBar">
    <span><a class="navbar animate-charcter" href="#">Sustainability</a><span class="nav-bar-text">Missions Management Portal</span></span>
    <a href="https://abgapparelretail.sharepoint.com/sites/sustainabilitydashboard/Prod/Pages/Issue%20Tracker/Issuetracker.aspx" target="_blank">Help</a>        
       <span class="nav-item">
          <a class="nav-link"><img src="https://abgapparelretail.sharepoint.com/sites/sustainabilitydashboard/Prod/SiteAssets/SPFX%20img/reearth-logo.jpg" class="img-responsive pr-5 custom-logo-border-right" data-themekey="#"></a>
       </span>
       <span class="nav-item dropdown">
          <a class="nav-link"><img src="https://abgapparelretail.sharepoint.com/sites/sustainabilitydashboard/Prod/SiteAssets/SPFX%20img/logo.jpg" class="img-responsive pl-2" data-themekey="#"></a>
       </span>        
 </div>`;

  let footer = `<div class="footer"><div class="container">
  <div class="row">
    <div class="col-lg-6 col-md-6 col-sm-6 col-12">Copyright©2019 Aditya Birla Group</div>
    <div class="col-lg-6 col-md-6 col-sm-6 col-12 text-right">An Aditya Birla Group Sustainability Intiative | <a href="http://www.abfrl.com/pdf/Privacy-Policy.pdf" style="color:white">Privacy Policy</a></div>
  </div></div></div>`;
  let placeholderBottom = document.querySelectorAll('[data-sp-placeholder="Bottom"]');
  placeholderBottom[0].innerHTML = footer;
  let placeholderTop = document.querySelectorAll('[data-sp-placeholder="Top"]');
  //placeholderTop[0].innerHTML = header;
  placeholderTop[0].remove();

  placeholderBottom = document.querySelectorAll('[data-automation-id="CanvasZone"]');
  placeholderBottom[0].removeAttribute("class");

  placeholderBottom = document.querySelectorAll('[data-automation-id="CanvasControl""]');
  placeholderBottom[0].removeAttribute("class");


  if (!isAdmin) {   //non admin people
    let elem = document.getElementById("spCommandBar");
    elem.parentNode.removeChild(elem);
    elem = document.getElementById("centerRegion");
    elem.parentNode.removeChild(elem);
    elem = document.getElementById("HeaderButtonRegion");
    elem.parentNode.removeChild(elem);
    elem = document.getElementById("O365_MainLink_NavMenu");
    elem.parentNode.removeChild(elem);
  }
}

export default MflRetailReact;


/*
<div className="app">
      <div  className="preview-values">
        <h4>Values</h4>
        {value}
      </div>

      <MultiSelect
        onChange={handleOnchange}
        options={options}
      />
      
      </div>
      <TableDemo tableData={tableData}/>  


      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker
          clearable
          placeholder="DD-MM-YYYY"
          fullWidth={false}
          format='dd-MM-yyyy HH:MM'
          inputVariant='outlined'
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">                
                <FaRegCalendar/>
              </InputAdornment>
            )
          }}
          value={selectedDate}
          minDate={new Date(new Date().setMonth(new Date().getMonth() - 1))}
          maxDate={new Date()}
          onChange={handleDateChange}
        />
      </MuiPickersUtilsProvider>


      <Button onClick={handleOpen}>
                  Add Image
                </Button>
                <DropzoneArea
                    // open={open}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={false}
                    showPreviewsInDropzone={true}
                    showFileNames
                    filesLimit={3}
                    maxFileSize={5000000}
                    onChange={(files)=>handleSave(files)}

                    // onClose={handleClose}
                />

*/
