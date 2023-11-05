export const loginFormStructure = [
    {
      id: 1,
      placeholder: "Insert cellphone...",
      labelText: "+33",
      required: true,
      name: "cellphone",
      type: "numeric",
      validators: {
        required: "This field is required",
      },
    },
    {
      id: 4,
      placeholder: "Insert password...",
      labelText: "Password",
      name: "password",
      validators: {
        required: "This field is required",
        minLength: {
          message: "Password should be at least 8 characters",
          value: 8,
        },
      },
    },
  ];