import { useId } from 'react'

type InputFieldProps = {
  label: string
  type: string
  placeholder: string
  required: boolean
}

function InputField({ label, ...restProps }: InputFieldProps) {
  const id = useId()
  return (
    <div className="input-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...restProps} />
    </div>
  )
}

export default InputField
