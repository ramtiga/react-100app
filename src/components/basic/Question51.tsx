import { useState, type ChangeEvent, type FormEvent } from 'react'

type FormValues = {
  [key: string]: string | number | boolean
}

type FormErrors = Record<string, string>

type UserForm = FormValues & {
  email: string
  password: string
}

type ValidationFunction<T extends FormValues> = (values: T) => FormErrors

function useForm<T extends FormValues>(
  initialValues: T,
  validate: ValidationFunction<T>,
) {
  // values, errors, handleChange, handleSubmit, resetを実装
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (onSubmit: (values: T) => void) => {
    return (e: FormEvent) => {
      e.preventDefault()

      const validationErrors = validate(values)
      if (Object.keys(validationErrors).length === 0) {
        onSubmit(values)
      }
      setErrors(validationErrors)
    }
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
  }

  return { values, errors, handleChange, handleSubmit, reset }
}

export const Question51 = () => {
  const validate: ValidationFunction<UserForm> = (values: UserForm) => {
    const errors: FormErrors = {}

    if (!values.email) errors.email = 'メールアドレスは必須です'

    if (!values.password) errors.password = 'パスワードは必須です'

    if (values.password && values.password.length < 6) {
      errors.password = 'パスワードは6文字以上で入力してください'
    }
    return errors
  }

  const { values, errors, handleChange, handleSubmit, reset } = useForm(
    { email: '', password: '' },
    validate,
  )

  const onSubmit = () => {
    console.log('Form submitted:', values)
  }

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <input
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
      />

      {errors.email && <span className="form-error">{errors.email}</span>}

      <input
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Password"
      />

      {errors.password && <span className="form-error">{errors.password}</span>}

      <button type="submit">Submit</button>

      <button type="button" onClick={reset}>
        Reset
      </button>
    </form>
  )
}
