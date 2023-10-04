import * as Yup from "yup";

export const initialValues = () => {
  return {
    lastname: "",
  };
};

export const validationSchema = () => {
  return Yup.object({
    lastname: Yup.string().required(true),
  });
};
