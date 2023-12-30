import Yup from "..";

export const loginSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required("Şifrenizi doğru girdiğinizden emin olun.")
})