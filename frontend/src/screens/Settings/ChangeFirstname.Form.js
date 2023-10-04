import * as Yup from "yup";

export const initialValues = () => {
  return {
    firstname: "",
  };
};

export const validationSchema = () => {
  return Yup.object({
    firstname: Yup.string().required(true),
  });
};
