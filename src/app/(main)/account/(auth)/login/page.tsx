import LoginTemplate from "@modules/account/templates/login-template"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your PrintInc account.",
}

export default function Login() {
  return <LoginTemplate />
}
