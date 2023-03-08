import Template1 from "../Templates/Template1";
import Template2 from "../Templates/Template2";
import Template3 from "../Templates/Template3";
import Template4 from "./Template4";

export const Templates = [
  {
    title: "Template 1",
    component: <Template1/>,
    div: "divToPrint1"
  },
  {
    title: "Template 3",
    component: <Template3/>,
    div: "divToPrint3"
  },
  {
    title: "Template 2",
    component: <Template2/>,
    div: "divToPrint2"
  }, 
  {
    title: "Template 4",
    component: <Template4/>,
    div: "divToPrint4"
  },
];
