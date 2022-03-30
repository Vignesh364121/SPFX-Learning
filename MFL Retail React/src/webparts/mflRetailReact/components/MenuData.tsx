import * as React from 'react';
import { AiFillHome, AiFillAppstore, AiFillCalculator, AiOutlineCaretRight, AiOutlineCaretDown } from "react-icons/ai";
import { FaLightbulb } from "react-icons/fa";
import { GiSolarPower, GiDustCloud } from "react-icons/gi";

const menuData = [
     {
          title: 'Home',
          path: '#',
          icon: <AiFillHome size={'1.2rem'} />
     },
     {
          title: 'Mission Input',
          path: '#',
          icon: <AiFillHome size={'1.2rem'} />,
          iconClosed: "RiArrowDownSFill",
          iconOpened: "RiIcons.RiArrowUpSFill",
          isOpen: false,
          subMenu: [
               {
                    title: 'Energy',
                    path: '#',
                    icon: <AiFillHome size={'1.2rem'} />
               },
               {
                    head: 'Solar',
                    nav: [
                         {
                              title: 'Tariff Calculator',
                              path: '#',
                              icon: <AiFillHome size={'1.2rem'} />
                         },
                         {
                              title: 'Solar',
                              path: '#',
                              icon: <AiFillHome size={'1.2rem'} />
                         }
                    ]

               },
               {
                    head: 'Carbon',
                    nav: [
                         {
                              title: 'Carbon (Scope 1 and 2)',
                              path: '#',
                              icon: <AiFillHome size={'1.2rem'} />
                         },
                         {
                              title: 'Carbon (Scope 3)',
                              path: '#',
                              icon: <AiFillHome size={'1.2rem'} />
                         }
                    ]
               }
          ]
     },
     {
          title: 'Dashboard',
          path: '#',
          icon: <AiFillHome size={'1.2rem'} />,
          iconClosed: "RiArrowDownSFill",
          iconOpened: "RiIcons.RiArrowUpSFill",
          isOpen: false,
          subMenu: [
               {
                    title: 'Energy',
                    path: '#',
                    icon: <AiFillHome size={'1.2rem'} />
               },
               {
                    head: 'Carbon',
                    nav: [
                         {
                              title: 'Carbon (Scope 1 and 2)',
                              path: '#',
                              icon: <AiFillHome size={'1.2rem'} />
                         },
                         {
                              title: 'Carbon (Scope 3)',
                              path: '#',
                              icon: <AiFillHome size={'1.2rem'} />
                         }
                    ]
               }
          ]
     }
];

const cascadeData = [
     { ACatagory: "Safety Observations", ICatagory: "Select", Severity: "Select", SevDescription: "" },
     { ACatagory: "Safety Observations", ICatagory: "Unsafe Act", Severity: "Category 0", SevDescription: "" },
     { ACatagory: "Safety Observations", ICatagory: "Unsafe Condition", Severity: "Category 0", SevDescription: "" },
     { ACatagory: "Safety Observations", ICatagory: "Near Miss", Severity: "Category 0", SevDescription: ""},

     { ACatagory: "Injury at ABG site", ICatagory: "Select", Severity: "Select", SevDescription: "" },
     { ACatagory: "Injury at ABG site", ICatagory: "First Aid Injury", Severity: "Category 1", SevDescription: "" },
     { ACatagory: "Injury at ABG site", ICatagory: "Medical Treatment Injury", Severity: "Category 2", SevDescription: "" },
     { ACatagory: "Injury at ABG site", ICatagory: "Restricted Work Injury", Severity: "Category 3", SevDescription: "" },
     { ACatagory: "Injury at ABG site", ICatagory: "Lost Time Injury", Severity: "Category 4", SevDescription: "" },
     { ACatagory: "Injury at ABG site", ICatagory: "Fatality", Severity: "Category 5", SevDescription: ""},
     
     { ACatagory: "Road accidents (Outside ABG site)", ICatagory: "Select", Severity: "Select", SevDescription: "" },
     { ACatagory: "Road accidents (Outside ABG site)", ICatagory: "First Aid Injury", Severity: "Category 1", SevDescription: "" },
     { ACatagory: "Road accidents (Outside ABG site)", ICatagory: "Medical Treatment Injury", Severity: "Category 2", SevDescription: "" },
     { ACatagory: "Road accidents (Outside ABG site)", ICatagory: "Restricted Work Injury", Severity: "Category 3", SevDescription: "" },
     { ACatagory: "Road accidents (Outside ABG site)", ICatagory: "Lost Time Injury", Severity: "Category 4", SevDescription: "" },
     { ACatagory: "Road accidents (Outside ABG site)", ICatagory: "Fatality", Severity: "Category 5", SevDescription: "" },
     { ACatagory: "Road accidents (Outside ABG site)", ICatagory: "Property Damage", Severity: "Category 1", SevDescription: "Fire - Fire was Extinguished by employee using Fire extinguisher.Property Damage - Production loss less than 1 hr & Financial Loss 0 - 3.5 Lakhs due to Property damage." },
     { ACatagory: "Road accidents (Outside ABG site)", ICatagory: "Property Damage", Severity: "Category 2", SevDescription: "Fire - Fire was attended by onsite brigade or responders and Activated sprinklers or fire suppression systems. Property Damage - Production loss less than 4 hrs & Financial Loss 3.5 - 10 Lakhs due to Property damage." },
     { ACatagory: "Road accidents (Outside ABG site)", ICatagory: "Property Damage", Severity: "Category 3", SevDescription: "Fire - Response required for Fire from local fire service. Response required from local fire service and fire suppression systems.Property Damage - Production loss less than 24 hrs & Financial Loss 10 - 35 Lakhs due to Property damage." },
     { ACatagory: "Road accidents (Outside ABG site)", ICatagory: "Property Damage", Severity: "Category 4", SevDescription: "Fire - Response required for Fire from Local fire service.  Significant damage happened to equipment and/or buildings. Property Damage - Production loss more than 24 hrs & Financial Loss 35 Lakhs - 3.5 Crores due to Property damage." },
     { ACatagory: "Road accidents (Outside ABG site)", ICatagory: "Property Damage", Severity: "Category 5", SevDescription: "Fire - Response required for Fire from outside agencies; possible off-site consequences.Property Damage - Production loss more than 3 days & Financial Loss more than 3.5 Crores due to Property damage." },

     { ACatagory: "Fire Incidents", ICatagory: "Select", Severity: "Select", SevDescription: "" },
     { ACatagory: "Fire Incidents", ICatagory: "Property Damage", Severity: "Category 1", SevDescription: "Fire - Fire was Extinguished by employee using Fire extinguisher.Property Damage - Production loss less than 1 hr & Financial Loss 0 - 3.5 Lakhs due to Property damage." },
     { ACatagory: "Fire Incidents", ICatagory: "Property Damage", Severity: "Category 2", SevDescription: "Fire - Fire was attended by onsite brigade or responders and Activated sprinklers or fire suppression systems. Property Damage - Production loss less than 4 hrs & Financial Loss 3.5 - 10 Lakhs due to Property damage." },
     { ACatagory: "Fire Incidents", ICatagory: "Property Damage", Severity: "Category 3", SevDescription: "Fire - Response required for Fire from local fire service. Response required from local fire service and fire suppression systems.Property Damage - Production loss less than 24 hrs & Financial Loss 10 - 35 Lakhs due to Property damage." },
     { ACatagory: "Fire Incidents", ICatagory: "Property Damage", Severity: "Category 4", SevDescription: "Fire - Response required for Fire from Local fire service.  Significant damage happened to equipment and/or buildings. Property Damage - Production loss more than 24 hrs & Financial Loss 35 Lakhs - 3.5 Crores due to Property damage." },
     { ACatagory: "Fire Incidents", ICatagory: "Property Damage", Severity: "Category 5", SevDescription: "Fire - Response required for Fire from outside agencies; possible off-site consequences.Property Damage - Production loss more than 3 days & Financial Loss more than 3.5 Crores due to Property damage." },

     { ACatagory: "Dangerous Occurrence / Property Damage", ICatagory: "Select", Severity: "Select", SevDescription: "" },
     { ACatagory: "Dangerous Occurrence / Property Damage", ICatagory: "Property Damage", Severity: "Category 1", SevDescription: "Fire - Fire was Extinguished by employee using Fire extinguisher.Property Damage - Production loss less than 1 hr & Financial Loss 0 - 3.5 Lakhs due to Property damage." },
     { ACatagory: "Dangerous Occurrence / Property Damage", ICatagory: "Property Damage", Severity: "Category 2", SevDescription: "Fire - Fire was attended by onsite brigade or responders and Activated sprinklers or fire suppression systems. Property Damage - Production loss less than 4 hrs & Financial Loss 3.5 - 10 Lakhs due to Property damage." },
     { ACatagory: "Dangerous Occurrence / Property Damage", ICatagory: "Property Damage", Severity: "Category 3", SevDescription: "Fire - Response required for Fire from local fire service. Response required from local fire service and fire suppression systems.Property Damage - Production loss less than 24 hrs & Financial Loss 10 - 35 Lakhs due to Property damage." },
     { ACatagory: "Dangerous Occurrence / Property Damage", ICatagory: "Property Damage", Severity: "Category 4", SevDescription: "Fire - Response required for Fire from Local fire service.  Significant damage happened to equipment and/or buildings. Property Damage - Production loss more than 24 hrs & Financial Loss 35 Lakhs - 3.5 Crores due to Property damage." },
     { ACatagory: "Dangerous Occurrence / Property Damage", ICatagory: "Property Damage", Severity: "Category 5", SevDescription: "Fire - Response required for Fire from outside agencies; possible off-site consequences.Property Damage - Production loss more than 3 days & Financial Loss more than 3.5 Crores due to Property damage." },

     { ACatagory: "Natural Calamity", ICatagory: "Select", Severity: "Select", SevDescription: "" },
     { ACatagory: "Natural Calamity", ICatagory: "Property Damage", Severity: "Category 1", SevDescription: "Fire - Fire was Extinguished by employee using Fire extinguisher.Property Damage - Production loss less than 1 hr & Financial Loss 0 - 3.5 Lakhs due to Property damage." },
     { ACatagory: "Natural Calamity", ICatagory: "Property Damage", Severity: "Category 2", SevDescription: "Fire - Fire was attended by onsite brigade or responders and Activated sprinklers or fire suppression systems. Property Damage - Production loss less than 4 hrs & Financial Loss 3.5 - 10 Lakhs due to Property damage." },
     { ACatagory: "Natural Calamity", ICatagory: "Property Damage", Severity: "Category 3", SevDescription: "Fire - Response required for Fire from local fire service. Response required from local fire service and fire suppression systems.Property Damage - Production loss less than 24 hrs & Financial Loss 10 - 35 Lakhs due to Property damage." },
     { ACatagory: "Natural Calamity", ICatagory: "Property Damage", Severity: "Category 4", SevDescription: "Fire - Response required for Fire from Local fire service.  Significant damage happened to equipment and/or buildings. Property Damage - Production loss more than 24 hrs & Financial Loss 35 Lakhs - 3.5 Crores due to Property damage." },
     { ACatagory: "Natural Calamity", ICatagory: "Property Damage", Severity: "Category 5", SevDescription: "Fire - Response required for Fire from outside agencies; possible off-site consequences.Property Damage - Production loss more than 3 days & Financial Loss more than 3.5 Crores due to Property damage." }
];

const incidentStatusData = [
     "Open",
     "Closed"
];

const stateData = [
     "Andhra Pradesh",
     "Arunachal Pradesh",
     "Assam",
     "Bihar",
     "Chhattisgarh",
     "Goa",
     "Gujarat",
     "Haryana",
     "Himachal Pradesh",
     "Jammu and Kashmir",
     "Jharkhand",
     "Karnataka",
     "Kerala",
     "Madhya Pradesh",
     "Maharashtra",
     "Manipur",
     "Meghalaya",
     "Mizoram",
     "Nagaland",
     "Odisha",
     "Punjab",
     "Rajasthan",
     "Sikkim",
     "Tamil Nadu",
     "Telangana",
     "Tripura",
     "Uttar Pradesh",
     "Uttarakhand",
     "West Bengal",
     "Andaman and Nicobar Islands",
     "Chandigarh",
     "Dadar and Nagar Haveli",
     "Daman and Diu",
     "Delhi",
     "Lakshadweep",
     "Puducherry (Pondicherry)"
];

const natureOfInjuryData = [
     { label: "Amputation", value: "Amputation"},
     { label: "Wounds", value: "Wounds"},
     { label: "Bruises", value: "Bruises"},
     { label: "Sprain", value: "Sprain"},
     { label: "Fractures", value: "Fractures"},
     { label: "Burn", value: "Burn"},
     { label: "Electric Shock", value: "Electric Shock"},
     { label: "Poisoning", value: "Poisoning"},
     { label: "Internal Bleeding", value: "Internal Bleeding"},
     { label: "Unconscious", value: "Unconscious"},
     { label: "Irritation", value: "Irritation"},
     { label: "Abrasion", value: "Abrasion"},
     { label: "Multiple", value: "Multiple"}
];

const bodyPartsAffectedData = [
     //{ MajorBodyParts: "Head", MinorBodyParts: "select" },
     { MajorBodyParts: "Head", MinorBodyParts: "Fore Head" },
     { MajorBodyParts: "Head", MinorBodyParts: "Back Head" },
     
     //{ MajorBodyParts: "Eyes", MinorBodyParts: "select" },
     { MajorBodyParts: "Eyes", MinorBodyParts: "Left Eye" },
     { MajorBodyParts: "Eyes", MinorBodyParts: "Right Eye" },
     
     //{ MajorBodyParts: "Ear", MinorBodyParts: "select" },
     { MajorBodyParts: "Ear", MinorBodyParts: "Left Ear" },
     { MajorBodyParts: "Ear", MinorBodyParts: "Right Ear" },
     
     { MajorBodyParts: "Nose" },
     { MajorBodyParts: "Mouth" },
     { MajorBodyParts: "Neck" },
     { MajorBodyParts: "Stomach" },
     { MajorBodyParts: "Waist/Hip"},
     
     //{ MajorBodyParts: "Left Hand", MinorBodyParts: "select" },
     { MajorBodyParts: "Left Hand", MinorBodyParts: "Left Shoulder" },
     { MajorBodyParts: "Left Hand", MinorBodyParts: "Left Collar Bone" },
     { MajorBodyParts: "Left Hand", MinorBodyParts: "Left Upper Arm" },
     { MajorBodyParts: "Left Hand", MinorBodyParts: "Left Elbow" },
     { MajorBodyParts: "Left Hand", MinorBodyParts: "Left Lower Arm" },
     { MajorBodyParts: "Left Hand", MinorBodyParts: "Left Wrist" },
     { MajorBodyParts: "Left Hand", MinorBodyParts: "Left Thumb Finger" },
     { MajorBodyParts: "Left Hand", MinorBodyParts: "Left Index Finger" },
     { MajorBodyParts: "Left Hand", MinorBodyParts: "Left Middle Finger" },
     { MajorBodyParts: "Left Hand", MinorBodyParts: "Left Ring Finger" },
     { MajorBodyParts: "Left Hand", MinorBodyParts: "Left Small Finger" },

     //{ MajorBodyParts: "Right Hand", MinorBodyParts: "select" },
     { MajorBodyParts: "Right Hand", MinorBodyParts: "Right Shoulder" },
     { MajorBodyParts: "Right Hand", MinorBodyParts: "Right Collar Bone" },
     { MajorBodyParts: "Right Hand", MinorBodyParts: "Right Upper Arm" },
     { MajorBodyParts: "Right Hand", MinorBodyParts: "Right Elbow" },
     { MajorBodyParts: "Right Hand", MinorBodyParts: "Right Lower Arm" },
     { MajorBodyParts: "Right Hand", MinorBodyParts: "Right Wrist" },
     { MajorBodyParts: "Right Hand", MinorBodyParts: "Right Thumb Finger" },
     { MajorBodyParts: "Right Hand", MinorBodyParts: "Right Index Finger" },
     { MajorBodyParts: "Right Hand", MinorBodyParts: "Right Middle Finger" },
     { MajorBodyParts: "Right Hand", MinorBodyParts: "Right Ring Finger" },
     { MajorBodyParts: "Right Hand", MinorBodyParts: "Right Small Finger" },

     //{ MajorBodyParts: "Chest", MinorBodyParts: "select" },
     { MajorBodyParts: "Chest", MinorBodyParts: "Left Chest" },
     { MajorBodyParts: "Chest", MinorBodyParts: "Right Chest" },

     //{ MajorBodyParts: "Left Leg", MinorBodyParts: "select" },
     { MajorBodyParts: "Left Leg", MinorBodyParts: "Left Thigh" },
     { MajorBodyParts: "Left Leg", MinorBodyParts: "Left Knee" },
     { MajorBodyParts: "Left Leg", MinorBodyParts: "Left Lower Leg" },
     { MajorBodyParts: "Left Leg", MinorBodyParts: "Left Ankle" },
     { MajorBodyParts: "Left Leg", MinorBodyParts: "Left Foot" },
     { MajorBodyParts: "Left Leg", MinorBodyParts: "Left Toe" },

     //{ MajorBodyParts: "Right Leg", MinorBodyParts: "select" },
     { MajorBodyParts: "Right Leg", MinorBodyParts: "Right Thigh" },
     { MajorBodyParts: "Right Leg", MinorBodyParts: "Right Knee" },
     { MajorBodyParts: "Right Leg", MinorBodyParts: "Right Lower Leg" },
     { MajorBodyParts: "Right Leg", MinorBodyParts: "Right Ankle" },
     { MajorBodyParts: "Right Leg", MinorBodyParts: "Right Foot" },
     { MajorBodyParts: "Right Leg", MinorBodyParts: "Right Toe" }
];

const affectedPartyData = [     
     { label: "Employee", value: "Employee"},
     { label: "Contractor", value: "Contractor"},
     { label: "Visitor", value: "Visitor"},
     { label: "Promoter", value: "Promoter"},
     { label: "Asset", value: "Asset"},
     { label: "Customer", value: "Customer"},
     { label: "Others", value: "Others"}
];

export { menuData, cascadeData, incidentStatusData, stateData, affectedPartyData, natureOfInjuryData, bodyPartsAffectedData }