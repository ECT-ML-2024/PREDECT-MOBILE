const TYPE_OF_STIMULATION = [
        {title: "BRIEF-PULSE",}, 
        {title: "ULTRA-BRIEF PULSE",},
        {title: "SCES",}
  ];
const OUTCOME = [
        {title: "GENERALIZED TONIC-CLONIC SEIZURES",}, 
        {title: "TONIC RESPONSE WITH STIMULATION",},
        {title: "NO RESPONSE",},
        {title: "CLONIC RESPONSE WITH STIMULATION",},
  ];

  const ANAESTHESIA = [
    { title: "KETAMINE50" },
    { title: "PROPOFOL/LIDOCAINE" },
    { title: "STRAIGHT" },
    { title: "KETAMINE 100" },
    { title: "KETAMINE 25" },
    { title: "KETAMINE 75" },
    { title: "PROPOFOL/LIDOCAINE 75" },
    { title: "PROPOFOL/LIDOCAINE 25" },
    { title: "KETAMINE 60" },
    { title: "PROPOFOL/LIDOCAINE 100" },
    { title: "KEPOFOL 12.5/50/10" },
    { title: "KEPOFOL 75/50/10" }
];
  const POLARITY = [
    { title: "BILATERAL" },
    { title: "BIFRONTAL" },
    { title: "UNILATERAL" },
];

  const POSITION = [
    { title: "TEMPORAL" },
    { title: "FRONTOTEMPORAL" },
    { title: "FRONTAL" },
    { title: "SUPRAORBITAL" },
    { title: "TEMPEROPARIETAL" },
    { title: "PARIETAL" },
    { title: "FRONTOPARIETAL" },
];
  const HANDEDNESS = [
    { title: "RIGHT" },
    { title: "LEFT" },
    { title: "AMBIDEXTROUS" },
];
  const YES_OR_NO = [
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'Yes',
      value: 'YES'
    },
    {
        id: '2',
        label: 'No',
        value: 'NO'
    }
];

const CURRENT_DRUG_TREATMENT = [
  { title: "ANTIPSYCHOTICS" },
  { title: "ANTIPSYCHOTICS, ANTICONVULSANTS" },
  { title: "ANTIDEPRESSANTS, ANTIPSYCHOTICS" },
  { title: "ANTIDEPRESSANTS" },
  { title: "ANTIDEPRESSANTS, ANTIPSYCHOTICS, ANTICONVULSANTS" },
  { title: "ANTIHYPERTENSIVES, ANTIDEPRESSANTS, ANTIPSYCHOTICS" },
  { title: "ANTICONVULSANTS" },
  { title: "ANTIPSYCHOTICS, LITHIUM" },
  { title: "ANTIHYPERTENSIVES, ANTIDEPRESSANTS" },
  { title: "ANTIHYPERTENSIVES, ANTIPSYCHOTICS" },
  { title: "ANTIHYPERTENSIVES, ANTIDEPRESSANTS, ANTICHOLINERGIC" },
  { title: "ANTIHYPERTENSIVES, ANTIPSYCHOTICS, ANTICONVULSANTS" },
  { title: "ANTIDEPRESSANTS, ANTICONVULSANTS" },
  { title: "ANTIHYPERTENSIVES" },
  { title: "ANTIHYPERTENSIVES, ANTIPSYCHOTICS, ANTIANXIOLYTICS" },
  { title: "ANTIPSYCHOTICS, ANTICHOLINERGIC" },
  { title: "LITHIUM" },
  { title: "ANTICHOLINERGIC" },
  { title: "ANTIHYPERTENSIVES, ANTIDEPRESSANTS, ANTIPSYCHOTICS, ANTICONVULSANTS" },
  { title: "ANTIHYPERTENSIVES, ANTIDEPRESSANTS, ANTIPSYCHOTICS, ANTICHOLINERGIC" },
  { title: "ANTIPSYCHOTICS, ANTIANXIOLYTICS" },
  { title: "ANTIDEPRESSANTS, ANTIPSYCHOTICS, ANTIANXIOLYTICS" },
  { title: "ANTIANXIOLYTICS, ANTICONVULSANTS" }
];

const OBSERVATIONS = [
  { title: "DIZZINESS" },
  { title: "DISORIENTATION" },
  { title: "HEADACHES" },
  { title: "NIL" },
  { title: "DISORIENTATION, DIZZINESS" },
  { title: "TARDIVE SEIZURES" },
  { title: "HEADACHES, DIZZINESS" },
  { title: "HEADACHES, DISORIENTATION" },
  { title: "BURNING SENSATIONS" },
  { title: "HEADACHES, TARDIVE SEIZURES" },
  { title: "HEADACHES, DISORIENTATION, DIZZINESS" },
  { title: "BURNING SENSATIONS, DIZZINESS" },
  { title: "BURNING SENSATIONS, DISORIENTATION" },
  { title: "DISORIENTATION, TARDIVE SEIZURES" },
  { title: "BURNS" },
  { title: "DISORIENTATION, DIZZINESS, RESTLESSNESS" },
  { title: "BURNING SENSATIONS, DISORIENTATION, DIZZINESS" }
];

const MEMORY = [
  { title: "1ST TRIAL: FACE VELVET CHURCH DAISY RED, 2ND TRIAL: FACE VELVET CHURCH DAISY RED" },
  { title: "2ND TRIAL: FACE VELVET CHURCH DAISY RED" },
  { title: "1ST TRIAL: FACE VELVET CHURCH DAISY RED" }
];

const CURRENT_DIAGNOSES = [
  { title: "Select", value: 0 },
  { title: "1-3 MONTHS", value: 1 },
  { title: "3-6 MONTHS", value: 2 },
  { title: "6-12 MONTHS", value: 3 },
  { title: "1-3 YRS", value: 4 },
  { title: "3 YRS And Above", value: 5 },
];

const setSex = [
  {
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Male',
    value: 'MALE'
},
{
    id: '2',
    label: 'Female',
    value: 'Female'
}
]

const zeroAndOneData =[
  {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: '0',
      value: '0'
  },
  {
      id: '2',
      label: '1',
      value: '1'
  }
]
export default { TYPE_OF_STIMULATION,OUTCOME,ANAESTHESIA,POLARITY,POSITION,HANDEDNESS,YES_OR_NO,CURRENT_DRUG_TREATMENT,OBSERVATIONS,MEMORY,CURRENT_DIAGNOSES,setSex,zeroAndOneData }