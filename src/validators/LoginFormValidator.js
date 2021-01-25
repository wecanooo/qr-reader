import * as yup from 'yup'

const InvalidLogin = '로그인 이름은 반드시 입력되어야 합니다'
const InvalidPassword = '비밀번호를 넣으세요'

export const LoginFormValidator = yup.object().shape({
  email: yup
    .string()
    .min(3, InvalidLogin)
    .max(32, InvalidLogin)
    .required(),
  password: yup
    .string()
    .min(4, InvalidPassword)
    .max(32, InvalidPassword)
    .required(),
})