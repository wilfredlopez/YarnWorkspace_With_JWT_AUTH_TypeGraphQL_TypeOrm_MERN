import React from "react"
import Layout from "../components/Layout"
import { Formik, Field } from "formik"
import TextInputField from "../components/inputFields/TextInputField"
import { RegisterComponent } from "../generated/apolloComponents"
import { useRouter } from "next/router"

interface Props {}

const register: React.FC<Props> = () => {
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
    <Layout title="Register | Wilfred">
      <div>
        <h1> Register</h1>
        <RegisterComponent>
          {register => (
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={async (data, { setErrors }) => {
                try {
                  const res = await register({
                    variables: {
                      firstName: data.firstName,
                      password: data.password,
                      email: data.email,
                      lastName: data.lastName,
                    },
                  })
                  console.log(res)
                  router.push("/check-email")
                } catch (e) {
                  const errors: { [key: string]: string } = {}

                  console.log("Error: ", e.graphQLErrors)
                  console.log(e)

                  e.graphQLErrors[0].validationErrors.forEach(
                    (validationError: any) => {
                      Object.values(validationError.constraints).forEach(
                        (message: any) => {
                          errors[validationError.property] = message
                        },
                      )
                    },
                  )
                  setErrors(errors)
                  console.log(errors)
                }
              }}
              initialValues={{
                email: "",
                password: "",
                lastName: "",
                firstName: "",
              }}
            >
              {({ values, handleSubmit }) => (
                <div className="container__sm">
                  <form onSubmit={handleSubmit}>
                    {TextInputFieldGenerator({
                      name: "firstName",
                      placeholder: "FirstName",
                    })}
                    {TextInputFieldGenerator({
                      name: "lastName",
                      placeholder: "LastName",
                    })}
                    {TextInputFieldGenerator({
                      name: "email",
                      placeholder: "Email",
                    })}
                    {TextInputFieldGenerator({
                      name: "password",
                      placeholder: "Password",
                      type: "password",
                    })}

                    <button type="submit">Register</button>
                  </form>
                </div>
              )}
            </Formik>
          )}
        </RegisterComponent>
      </div>
    </Layout>
  )
}

export default register
