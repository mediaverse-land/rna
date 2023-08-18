export const updateImageFormStructure = [
  {
    id: 1,
    placeholder: "Insert asset name",
    labelText: "Asset name",
    name: "name",
    inputMode: "default",
    type: "input",
    validators: {
      required: "This field is required",
    },
  },
  {
    id: 2,
    placeholder: "Insert asset description",
    labelText: "Asset description",
    name: "description",
    inputMode: "default",
    type: "default",
    validators: {
      required: "This field is required",
    },
  },
  {
    id: 3,
    placeholder: "Insert asset price",
    labelText: "Asset price",
    name: "price",
    inputMode: "default",
    type: "numeric",
    validators: {
      required: "This field is required",
    },
  },
  {
    id: 4,
    labelText: "Plan",
    type: "radio-button",
    name: "plan",
    defaultSelected: "ownership",
    options: ["free", "ownership", "subscription"],
  },
  {
    id: 5,
    labelText: "ّForkability status",
    type: "radio-button",
    name: "forkability_status",
    options: [true, false],
  },
 
];
