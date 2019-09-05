import React from "react"
import { FieldProps } from "formik"

interface ITextInputFieldProps extends FieldProps {
  // name: string
  // value: string
  // placeholder: string
}

const TextInputField: React.FunctionComponent<ITextInputFieldProps> = ({
  field,
  form,
  ...props
}) => {
  const errorMessage = form.touched[field.name] && form.errors[field.name]

  return (
    <React.Fragment>
      <input {...field} {...props}></input>
      {errorMessage && (
        <div>
          <p style={{ color: "red" }}>{errorMessage}</p>
        </div>
      )}
    </React.Fragment>
  )
}

export default TextInputField
