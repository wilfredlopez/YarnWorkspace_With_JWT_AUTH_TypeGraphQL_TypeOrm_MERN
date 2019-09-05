import React from "react"
import Layout from "../components/Layout"
import { Field, Formik } from "formik"
import TextInputField from "../components/inputFields/TextInputField"
import { useRouter } from "next/router"
import { LoginComponent, MeQuery } from "../generated/apolloComponents"
import Link from "next/link"
import { meQuery } from "../graphql/user/queries/meQuery"
import styled from "styled-components"

const OptionsSection = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  margin: 0.5rem 1rem;
`

interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = props => {
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
    <Layout title="Login">
      <div>
        <h1> Login</h1>
        <LoginComponent>
          {login => (
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={async (data, { setErrors }) => {
                try {
                  const res = await login({
                    variables: {
                      password: data.password,
                      email: data.email,
                    },
                    update: (cache, { data }) => {
                      if (!data || !data.login) {
                        return
                      }

                      cache.writeQuery<MeQuery>({
                        query: meQuery,
                        data: {
                          __typename: "Query",
                          me: data.login as any,
                        },
                      })
                    },
                  })

                  console.log(res)

                  if (res && res.data && !res.data.login) {
                    setErrors({
                      email: "Invalid Login",
                    })
                    return
                  }

                  router.push("/")
                } catch (e) {
                  setErrors({
                    email: "Invalid Login ;(",
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
                      name: "email",
                      placeholder: "Email",
                    })}
                    {TextInputFieldGenerator({
                      name: "password",
                      placeholder: "Password",
                      type: "password",
                    })}
                    <button type="submit">Login</button>
                  </form>
                </div>
              )}
            </Formik>
          )}
        </LoginComponent>
        <div>
          <OptionsSection>
            <div style={{ padding: "1rem" }}>
              <Link href="/forgot-password">
                <a>Forgot Password</a>
              </Link>
            </div>
            <div style={{ padding: "1rem" }}>
              <Link href="/register">
                <a>Register</a>
              </Link>
            </div>
          </OptionsSection>
        </div>
      </div>
    </Layout>
  )
}

export default LoginPage
