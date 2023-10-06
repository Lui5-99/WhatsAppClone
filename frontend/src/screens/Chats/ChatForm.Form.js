import * as Yup from "yup";

export const initialValues = () => {
  return {
    message: "",
  };
};

export const validationSchema = () => {
  return Yup.object({
    message: Yup.string().required(true),
  });
};
