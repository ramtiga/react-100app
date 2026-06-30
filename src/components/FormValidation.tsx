import { useState, type ChangeEvent, type FormEvent } from 'react'

type FormData = {
  email: string
  password: string
  confirmedPassword: string
  agreeToTerms: boolean
}

type Errors = {
  email?: string
  password?: string
  confirmedPassword?: string
  agreeToTerms?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const ERROR_MESSAGES = {
  email: {
    required: 'メールアドレスは必須です',
    invalid: '無効なメールアドレスです',
  },
  password: 'パスワードの強度が足りていません',
  confirmedPassword: 'パスワード確認が違います',
  agreeToTerms: '利用規約に同意してください',
} as const

const PASSWORD_PATTERNS = {
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  digit: /[0-9]/,
  special: /[^a-zA-Z0-9]/,
  strength: /(?=.[a-z])(?=.[A-Z])(?=.*[0-9])/,
} as const

export const FormValidation = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmedPassword: '',
    agreeToTerms: false,
  })

  const [passwordStrength, setPasswordStrength] = useState(0)
  const [errors, setErrors] = useState<Errors>({})

  const validationEmail = (email: string): boolean => {
    return EMAIL_REGEX.test(email)
  }

  const checkPasswordStrength = (password: string) => {
    if (password.length === 0) return 0

    let strength = 0
    if (password.length >= 8) strength++
    if (password.length >= 12) strength++

    if (PASSWORD_PATTERNS.lowercase.test(password)) strength++
    if (PASSWORD_PATTERNS.uppercase.test(password)) strength++
    if (PASSWORD_PATTERNS.digit.test(password)) strength++
    if (PASSWORD_PATTERNS.special.test(password)) strength++
    if (PASSWORD_PATTERNS.strength.test(password)) strength++

    if (strength <= 1) return 0
    if (strength <= 3) return 2
    if (strength == 4) return 3
    if (strength == 5) return 4
    if (strength == 6) return 5

    return 5
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: name !== 'agreeToTerms' ? value : e.target.checked,
    }))

    if (name === 'email') {
      if (!validationEmail(value)) {
        if (value.length === 0) {
          setErrors((prev) => ({
            ...prev,
            email: ERROR_MESSAGES.email.required,
          }))
        } else {
          setErrors((prev) => ({
            ...prev,
            email: ERROR_MESSAGES.email.invalid,
          }))
        }
      }
    }

    if (name === 'password') {
      const result: number = checkPasswordStrength(value)
      setPasswordStrength(result)

      if (result < 5) {
        setErrors((prev) => ({
          ...prev,
          password: ERROR_MESSAGES.password,
        }))
      }
    }

    if (name === 'confirmedPassword') {
      if (value !== formData.password) {
        setErrors((prev) => ({
          ...prev,
          confirmedPassword: ERROR_MESSAGES.confirmedPassword,
        }))
      }
    }

    if (errors[name as keyof Errors]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name as keyof Errors]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Errors = {}
    if (!formData.email) {
      newErrors.email = ERROR_MESSAGES.email.required
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = ERROR_MESSAGES.agreeToTerms
    }

    return newErrors
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newErrors: Errors = validateForm()
    setErrors(newErrors)

    if (Object.keys(newErrors)) {
      alert('登録完了です')
      console.log('送信データ:', formData)
    }
  }

  const isFormValid =
    formData.email &&
    formData.password &&
    formData.confirmedPassword &&
    formData.agreeToTerms &&
    Object.keys(errors).length === 0

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>メールアドレス:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <label>パスワード:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <div className="password-strength">
          強度: {'★'.repeat(passwordStrength)}
          {'☆'.repeat(5 - passwordStrength)}
        </div>
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <div>
        <label>パスワード確認:</label>
        <input
          type="password"
          name="confirmedPassword"
          value={formData.confirmedPassword}
          onChange={handleChange}
        />
        {errors.confirmedPassword && (
          <span className="error">{errors.confirmedPassword}</span>
        )}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
          />
          利用規約に同意する
        </label>
        {errors.agreeToTerms && (
          <span className="error">{errors.agreeToTerms}</span>
        )}
      </div>

      <button type="submit" disabled={!isFormValid}>
        登録
      </button>
    </form>
  )
}
