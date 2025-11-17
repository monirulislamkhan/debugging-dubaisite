import config from "../postcss.config.mjs";

export const whyApartments = [
  {
    name: "JUMEIRAH VILLAGE",
    Volume: 13637,
    Sales: 11.4,
  },
  {
    name: "DUBAI MARINA",
    Volume: 9793,
    Sales: 37,
  },
  {
    name: "BUSINESS BAY",
    Volume: 8848,
    Sales: 17.1,
  },
  {
    name: "DOWNTOWN DUBAI",
    Volume: 4725,
    Sales: 17.6,
  },
  {
    name: "DUBAI CREEK HARBOUR",
    Volume: 5041,
    Sales: 11.5,
  },
];

export const apartmentCategory = [
  {
    name: "Villa",
    value: 8047308159,
    color: "#3366cc",
  },
  {
    name: "Plot",
    value: 14695176370,
    color: "#dc3912",
  },
  {
    name: "Commercial",
    value: 17994846880,
    color: "#ff9900",
  },
  {
    name: "Apartment",
    value: 599217187,
    color: "#109618",
  },
];

export const villasCategory = [
  {
    name: "Below one M",
    value: 8047308159,
    color: "#3366cc",
  },
  {
    name: "1-2 M",
    value: 14695176370,
    color: "#dc3912",
  },
  {
    name: "2-3 M",
    value: 17994846880,
    color: "#ff9900",
  },
  {
    name: "3-5 M",
    value: 599217187,
    color: "#109618",
  },
  {
    name: "More than 5 M",
    value: 599217187,
    color: "#990099",
  },
];

// Post Page data
export const touristData ={
  config:[
    {"dataKey": "% GDP", "fill": "#3366cc"},
  ],
  data:[
  { "% GDP": 12, "name":"2014" },
  { "% GDP": 9, "name":"2015"},
  { "% GDP": 4, "name":"2016"},
  { "% GDP": 4, "name":"2017"},
  { "% GDP": 4, "name":"2018"},
  { "% GDP": 4, "name":"2019"},
  { "% GDP": -6, "name":"2020"},
  { "% GDP": 4, "name":"2021"},
]} 

export const salesChart = {
  config:[
    { "dataKey": "2024", "fill": "#f0a14c"},
    { "dataKey": "2025", "fill": "#677f08" },
  ],
  data:[
    {
      "2024":19,
      "2025":11,
      name:'Janauary',
    },
    {
      "2024":12,
      "2025":8,
      name:'February'
    },
    {
      "2024": 19,
      "2025": 11,
      name:'March'
    },
  ]
};

export const lineChartData ={
  config:[
    {"dataKey": "% GDP", "fill": "#f0a14c"},
  ],
  data:[
  { "% GDP": 12, "name":"2014" },
  { "% GDP": 9, "name":"2015"},
  { "% GDP": 4, "name":"2016"},
  { "% GDP": 4, "name":"2017"},
  { "% GDP": 4, "name":"2018"},
  { "% GDP": 4, "name":"2019"},
  { "% GDP": -6, "name":"2020"},
  { "% GDP": 4, "name":"2021"},
]}

export const piechartPost1 = {
  config:[
    {color: "#3366cc"},
    {color: "#dc3912"},
    {color: "#ff9900"},
    {color: "#109618"},
    {color: "#ac9618"},
    {color: "#47390b"},
  ],
  data:[
    {
      name: "Greenfield (wholly-owned)",
      value: 53.2,
    },
    {
      name: "New Forms of Investments (NFIs)",
      value: 34.6,
    },
    {
      name: "VC Backed FDI",
      value: 5.7,
    },
    {
      name: "Reinvestment",
      value: 4.5,
    },
    {
      name: "Mergers & Acquisitions (M&As)",
      value: 2,
    },
    {
      name: "Greenfield (JV)",
      value: 0.1,
    },
  ]
}


