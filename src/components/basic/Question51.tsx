import { useState } from 'react'

function useForm(initialValues, validate) {
  // values, errors, handleChange, handleSubmit, resetを実装
}

export const Question51 = () => {
  const validate = (values) => {
    const errors = {}
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
