import { useState } from 'react'

type Field = 'name' | 'email' | 'phone'

type FormData = {
  name: string
  email: string
  phone: string
}

type Errors = {
  name?: string
  email?: string
  phone?: string
}

const MIN_NAME_LENGTH = 3

const ErrorMessages = {
  name: `名前は${MIN_NAME_LENGTH}文字以上で入力してください！`,
}

const validateField = (field: Field, value: string): boolean => {
  switch (field) {
    case 'name':
      if (value.length < MIN_NAME_LENGTH) {
        return false
      }
      break
    default:
      return true
  }
  return true
}

const getErrorMessage = (field: Field): string => {
  switch (field) {
    case 'name':
      return ErrorMessages.name
    default:
      return ''
  }
}

export const ControlledForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
  })

  const [errors, setErrors] = useState<Errors>({})

  const handleChange = (field: Field, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (!validateField(field, value)) {
      if (field === 'name') {
        setErrors((prev) => ({
          ...prev,
          [field]: getErrorMessage('name'),
        }))
      }
    } else {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }))
    }
  }

  return (
    <form>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          名前:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </label>
        {errors.name && (
          <span
            style={{
              color: 'red',
              display: 'block',
              fontSize: '12px',
            }}
          >
            {errors.name}
          </span>
        )}
      </div>

      {/* 他のフィールドも実装 */}

      <div
        style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
        }}
      >
        <h4>入力内容:</h4>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </form>
  )
}
