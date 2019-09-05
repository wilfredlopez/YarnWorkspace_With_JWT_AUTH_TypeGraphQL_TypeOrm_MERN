import React from "react"
import Layout from "../components/Layout"
import { Field, Formik } from "formik"
import TextInputField from "../components/inputFields/TextInputField"
import { useRouter } from "next/router"
import { ChangePasswordComponent } from "../generated/apolloComponents"
import Link from "next/link"

import { NextPageContext } from "next"

interface IChangePasswordPage extends NextPageContext {
  token: string
}
const ChangePasswordPage = ({ token }: IChangePasswordPage) => {
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
    <Layout title="Change Password">
      <div>
        <h1> Change Password</h1>
        <ChangePasswordComponent>
          {changePassword => (
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={async (data, { setErrors }) => {
                try {
                  const res = await changePassword({
                    variables: {
                      password: data.password,
                      token: token,
                      //TODO: PROVIDE TOKEN
                    },
                  })

                  console.log(res)

                  if (res && res.data && !res.data.changePassword) {
                    setErrors({
                      password: "Invalid Password",
                    })
                    return
                  }

                  router.push("/")
                } catch (e) {
                  setErrors({
                    password: "Invalid Password ;(",
                  })
                }
              }}
              initialValues={{
                email: "",
                password: "",
              }}
            >
              {({ handleSubmit }) => (
                <div className="container__sm">
                  <form onSubmit={handleSubmit}>
                    {TextInputFieldGenerator({
                      name: "password",
                      placeholder: "Password",
                      type: "password",
                    })}
                    <button type="submit">Change Password</button>
                  </form>
                </div>
              )}
            </Formik>
          )}
        </ChangePasswordComponent>
        <div>
          <Link href="/forgot-password">
            <a>Forgot Password</a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

ChangePasswordPage.getInitialProps = ({
  query: { token },
}: IChangePasswordPage) => {
  return {
    token: token,
  }
}

export default ChangePasswordPage
