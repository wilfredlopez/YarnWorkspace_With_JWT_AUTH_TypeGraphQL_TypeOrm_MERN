import React from "react"
import Layout from "../components/Layout"
import { Formik, Field } from "formik"
import TextInputField from "../components/inputFields/TextInputField"
import { ForgotPasswordComponent } from "../generated/apolloComponents"
import { useRouter } from "next/router"

export interface IChangePasswordpageProps {}

export default function ChangePasswordpage(props: IChangePasswordpageProps) {
  const router = useRouter()
  const TextInputFieldGenerator = ({
    placeholder,
    name,
    type = "text",
  }: {
    placeholder: string
    name: string
    type?: string
  }) => {
    return (
      <div className="form-control">
        <label className="form-control-label" htmlFor={name}>
          {placeholder}
        </label>
        <Field
          name={name}
          type={type}
          component={TextInputField}
          placeholder={placeholder}
        />
      </div>
    )
  }

  return (
    <Layout title="Forgot Password | Wilfred">
      <div>
        <h1> Forgot Password</h1>
        <ForgotPasswordComponent>
          {forgotPassword => (
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={async (data, { setErrors }) => {
                try {
                  const res = await forgotPassword({
                    variables: {
                      email: data.email,
                    },
                  })
                  console.log(res)
                  router.push("/check-email")
                } catch (e) {
                  setErrors({
                    email: "Unkown Error...Please try again.",
                  })
                }
              }}
              initialValues={{
                email: "",
              }}
            >
              {({ handleSubmit }) => (
                <div className="container__sm">
                  <form onSubmit={handleSubmit}>
                    {TextInputFieldGenerator({
                      name: "email",
                      placeholder: "Email",
                    })}

                    <button type="submit">Request password reset email</button>
                  </form>
                </div>
              )}
            </Formik>
          )}
        </ForgotPasswordComponent>
      </div>
    </Layout>
  )
}
