import * as React from 'react';
import { useState, useEffect } from 'react';
import {affectedPartyData, natureOfInjuryData, bodyPartsAffectedData} from './MenuData';

import CreateIcon from "@material-ui/icons/Create";
import {
	Box, Button, Snackbar, Table,
	TableBody, TableCell, TableHead, TableRow
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DoneIcon from "@material-ui/icons/Done";
import CancelIcon from '@material-ui/icons/Cancel';
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MultiSelect from 'react-multiple-select-dropdown-lite';
import 'react-dropdown/style.css';
import { PnPGetItems } from './SPUtilities';

// Creating styles
const useStyles = makeStyles({
	root: {
		"& > *": {
			borderBottom: "unset",
		},
	},
	table: {
		minWidth: 700,
	},
	snackbar: {
		bottom: "104px",
	},
});

var tblData = "";

function TableDemo({fid,context}) {

	// Creating style object
	const classes = useStyles();

	// Defining a state named rows
	// which we can update by calling on setRows function
	const [rows, setRows] = useState([
		//{ id: 1, firstname: "vignesh", lastname: "elangovan", city: "erode" },
	]);

	// Initial states
	const [open, setOpen] = useState(false);
	const [isEdit, setEdit] = useState(false);
	const [disable, setDisable] = useState(true);
	const [showConfirm, setShowConfirm] = useState(false);

	//Page load starts
	useEffect(() => {       //page ready
		let filter = "SafetyIncidentIDId eq '" + fid + "'";
		PnPGetItems("Incident Causality Details", "*", "", filter, context).then(function (res) {
			let arrTblRows = [];
			if(res){
				res.forEach((element, index) => { 
					if(element){
						let obj: any = {};
						obj.id = index
						if(element.ID) obj.itemID = element.ID;
						if(element.NameOfVictim) obj.NameOfVictim = element.NameOfVictim;
						if(element.AffectedParty) obj.AffectedParty = element.AffectedParty;
						if(element.Title) obj.Title = element.Title;
						if(element.Age) obj.Age = "" + element.Age;
						if(element.TypeofInjury) obj.TypeofInjury = element.TypeofInjury;
						if(element.AffectedBodyPart) obj.AffectedBodyPart = element.AffectedBodyPart && element.AffectedBodyPart.length > 0 ?  element.AffectedBodyPart.toString() : "";
						if(element.MinorBodyParts) {
							let arrTemp = [];
							if(element.MinorBodyParts && element.MinorBodyParts.split(',').length > 0){
								element.MinorBodyParts.split(',').forEach(ele => {									
									arrTemp.push({ label: ele, value: ele });
								});
							}
							obj.OptMinorBdyParts = arrTemp;
						}
						if(element.MinorBodyParts) obj.MinorBodyParts = element.MinorBodyParts;
						if(element.DaysOnLeave) obj.DaysOnLeave = "" + element.DaysOnLeave;

						arrTblRows.push(obj);
					}
				});
			}
			setRows(arrTblRows);
		}).catch(function (err) {
			console.log("Group not found: " + err);
		});
	}, []);
	//Page load ends

	// Function For closing the alert snackbar
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	// Function For adding new row object
	const handleAdd = () => {
		setRows([
			...rows,
			{
				id: rows.length + 1, NameOfVictim: "",
				AffectedParty: "", Title: "",
				Age: "", TypeofInjury: "",
				AffectedBodyPart: "", MinorBodyParts: "",
				DaysOnLeave: "", OptMinorBdyParts: [], itemID : ""
			},
		]);
		setEdit(true);
	};

	// Function to handle edit
	const handleEdit = (i) => {
		// If edit mode is true setEdit will
		// set it to false and vice versa
		setEdit(!isEdit);
	};

	// Function to handle save
	const handleSave = () => {
		setEdit(!isEdit);
		setRows(rows);
		tblData = JSON.stringify(rows);
		// tblData = [];
		// rows.forEach(element => {
		// 	let obj = element;
		// 	obj.Age = Number(obj.Age);
		// 	obj.DaysOnLeave = Number(obj.DaysOnLeave);
		// 	obj.AffectedBodyPart = {results: obj.AffectedBodyPart.split(',')};
		// 	delete obj.id;
		// 	delete obj.OptMinorBdyParts;
		// 	tblData.push(obj);
		// });

		setDisable(true);
		setOpen(true);
	};

	const handleCancel = () => {
		setEdit(!isEdit);
	}

	// The handleInputChange handler can be set up to handle
	// many different inputs in the form, listen for changes
	// to input elements and record their values in state
	const handleInputChange = (e, index, inputType) => {
		setDisable(false);
		const { name, value } = inputType == "multiselect" ? e : e.target;
		const list = [...rows];
		list[index][name] = value;
		setRows(list);
	};

	const _onSelect = (e, index, name, inputType) => {
		setDisable(false);
		const value = inputType == "multiselect" ? e : e.target;
		const list = [...rows];
		list[index][name] = value;
		
		if(name == "AffectedBodyPart"){
			let arrTemp = value.split(',');
			let arrCombineFilter = [];
			let option = [];

			arrTemp.forEach(element => {
				let arrFilter = bodyPartsAffectedData.filter(el => el.MajorBodyParts == element);
				arrCombineFilter = arrCombineFilter.concat(arrFilter);
			});

			arrCombineFilter.forEach(element => {
				if(element && element.MinorBodyParts)
					option.push({ label: element.MinorBodyParts, value: element.MinorBodyParts });
			});
			list[index]["MinorBodyParts"] = "";
			list[index]["OptMinorBdyParts"] = option;
		}
		
		setRows(list);
	};

	// Showing delete confirmation to users
	const handleConfirm = () => {
		setShowConfirm(true);
	};

	// Handle the case of delete confirmation where
	// user click yes delete a specific row of id:i
	const handleRemoveClick = (i) => {
		const list = [...rows];
		list.splice(i, 1);
		setRows(list);
		setShowConfirm(false);
	};
	
	
	// Handle the case of delete confirmation
	// where user click no
	const handleNo = () => {
		setShowConfirm(false);
	};

	const options = [
		{ label: 'Option 1', value: 'option_1' },
		{ label: 'Option 2', value: 'option_2' },
		{ label: 'Option 3', value: 'option_3' },
		{ label: 'Option 4', value: 'option_4' },
	];
	
	return (
		<div style={{ overflowX: "scroll" }}>
			<Snackbar
				open={open}
				autoHideDuration={2000}
				onClose={handleClose}
				className={classes.snackbar}
			>
				<Alert onClose={(e) => handleClose(e, '')} severity="success">
					Record saved successfully!
				</Alert>
			</Snackbar>
			<Box margin={1}>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<div>
						{isEdit ? (
							<div>
								<Button className='' onClick={handleAdd}>
									<AddBoxIcon onClick={handleAdd} />
									ADD
								</Button>
								{rows.length !== 0 && (
									<>
										{disable ? (
											<>
												<Button disabled className='alignRight ' onClick={handleSave}>
													<DoneIcon />
													SAVE
												</Button>
												<Button className='alignRight ' onClick={handleCancel}>
													<CancelIcon />
													Cancel Edit
												</Button>
											</>
										) : (
											<Button className='alignRight' onClick={handleSave}>
												<DoneIcon />
												SAVE
											</Button>
										)}
									</>
								)}
							</div>
						) : (
							<div>
								<Button className='' onClick={handleAdd}>
									<AddBoxIcon onClick={handleAdd} />
									ADD
								</Button>
								<Button className='alignRight' onClick={handleEdit}>
									<CreateIcon />
									EDIT
								</Button>
							</div>
						)}
					</div>
				</div>
				{/* <TableRow className='alignCenter'></TableRow> */}

				<Table
					className={classes.table}
					size="small"
					aria-label="a dense table"
				>
					<TableHead>
						<TableRow>
							<TableCell>Name of the Victim*</TableCell>
							<TableCell>Affected Party*</TableCell>
							<TableCell>Other Affected Party*</TableCell>
							<TableCell>Age*</TableCell>
							<TableCell>Nature of Injury*</TableCell>
							<TableCell>Body part Affected*</TableCell>
							<TableCell>Minor Body part Affected*</TableCell>
							<TableCell>No of Days Leave after Injury*</TableCell>
							<TableCell>Delete</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row, i) => {
							return (
								<>
									<TableRow>
										{isEdit ? (
											<>
												<TableCell >
													{/*Name of the Victim*/}
													<input
														value={row.NameOfVictim}
														name="NameOfVictim"
														onChange={(e) => handleInputChange(e, i, "TextBox")}
													/>
												</TableCell>
												<TableCell >
													{/*Affected Party*/}
													<MultiSelect
														className="multi-select"
														singleSelect={true}
														clearable={false}
														closeOnSelect={false}
														defaultValue={row.AffectedParty}
														name="MinorBodyParts"
														onChange={(e) => _onSelect(e, i,"AffectedParty", "multiselect")}
														options={affectedPartyData}
														disableChip={true}
													/>
												</TableCell>
												<TableCell >
													{/*Other Affected Party*/}
													{ row.AffectedParty == "Others" ?
														<input
															value={row.Title}
															name="Title"
															onChange={(e) => handleInputChange(e, i, "TextBox")}
														/>
														:
														<input
															value={row.Title}
															name="Title"
															disabled
															onChange={(e) => handleInputChange(e, i, "TextBox")}
														/>
													}													
												</TableCell>
												<TableCell >
													{/*Age*/}
													<input
														value={row.Age}
														name="Age"
														type="number" min="0" max="100"
														onChange={(e) => handleInputChange(e, i, "TextBox")}
													/>
												</TableCell>
												<TableCell >
													{/*Nature of Injury*/}
													<MultiSelect
														className="multi-select"
														singleSelect={true}
														clearable={false}
														closeOnSelect={false}
														defaultValue={row.TypeofInjury}
														name="MinorBodyParts"
														onChange={(e) => _onSelect(e, i,"TypeofInjury", "multiselect")}
														options={natureOfInjuryData}
														disableChip={true}
													/>													
												</TableCell>
												<TableCell >
													{/*Body part Affected*/}
													<MultiSelect
														className="multi-select"
														defaultValue={row.AffectedBodyPart}
														onChange={(e) => _onSelect(e, i,"AffectedBodyPart", "multiselect")}
														options={GetObjBodyPartsAffected()}
														disableChip={true}
													/>
												</TableCell>
												<TableCell >
													{/*Minor Body part Affected*/}
													<MultiSelect
														className="multi-select"
														defaultValue={row.MinorBodyParts}
														name="MinorBodyParts"
														onChange={(e) => _onSelect(e, i,"MinorBodyParts", "multiselect")}
														options={row.OptMinorBdyParts}
														disableChip={true}
													/>
												</TableCell>
												<TableCell >
													{/*No of Days Leave after Injury*/}
													<input
														value={row.DaysOnLeave}
														name="DaysOnLeave"
														type="number" min="0"
														onChange={(e) => handleInputChange(e, i, "TextBox")}
													/>
												</TableCell>
												<TableCell>
													{/*Delete*/}
													<Button className="mr10" onClick={handleConfirm}>
														<ClearIcon />
													</Button>
												</TableCell>
											</>
										) : (
											<>
												<TableCell component="th" scope="row">
													{/* Name of the Victim */}
													{row.NameOfVictim}
												</TableCell>
												<TableCell component="th" scope="row">
													{/* Affected Party */}
													{row.AffectedParty}
												</TableCell>
												<TableCell component="th" scope="row">
													{/* Other Affected Party */}
													{row.Title}
												</TableCell>
												<TableCell component="th" scope="row">
													{/* Age */}
													{row.Age}
												</TableCell>
												<TableCell component="th" scope="row">
													{/* Nature of Injury */}
													{row.TypeofInjury}
												</TableCell>
												<TableCell component="th" scope="row">
													{/* Body part Affected */}
													{row.AffectedBodyPart}
												</TableCell>
												<TableCell component="th" scope="row">
													{/* Minor Body part Affected */}
													{row.MinorBodyParts}
												</TableCell>
												<TableCell component="th" scope="row">
													{/* No of Days Leave after Injury */}
													{row.DaysOnLeave}
												</TableCell>
												<TableCell component="th" scope="row" >
													{/* Delete */}
													<Button className="mr10" onClick={handleConfirm}>
														<DeleteOutlineIcon />
													</Button>
												</TableCell>
											</>
										)}

										{/* {isEdit ? (
											<Button className="mr10" onClick={handleConfirm}>
												<ClearIcon />
											</Button>
										) : (
											<Button className="mr10"  onClick={handleConfirm}>
												<DeleteOutlineIcon />
											</Button>
										)} */}

										{showConfirm && (
											<div>
												<Dialog
													open={showConfirm}
													onClose={handleNo}
													aria-labelledby="alert-dialog-title"
													aria-describedby="alert-dialog-description"
												>
													<DialogTitle id="alert-dialog-title">
														{"Confirm Delete"}
													</DialogTitle>
													<DialogContent>
														<DialogContentText id="alert-dialog-description">
															Are you sure to delete
														</DialogContentText>
													</DialogContent>
													<DialogActions>
														<Button
															onClick={() => handleRemoveClick(i)}
															color="primary"
															autoFocus
														>
															Yes
														</Button>
														<Button
															onClick={handleNo}
															color="primary"
															autoFocus
														>
															No
														</Button>
													</DialogActions>
												</Dialog>
											</div>
										)}
									</TableRow>
								</>
							);
						})}
					</TableBody>
				</Table>
			</Box>
		</div>
	);
}

function GetObjBodyPartsAffected(){	
	let option = [];
	let arrTemp = [];
	bodyPartsAffectedData.forEach(element => {
		if (!arrTemp.includes(element.MajorBodyParts))
			arrTemp.push(element.MajorBodyParts);
	});

	arrTemp.forEach(element => {
		option.push({ label: element, value: element });
	});

	return option;
}

export { TableDemo, tblData };
// style={{ width: "100px" }} align="center"