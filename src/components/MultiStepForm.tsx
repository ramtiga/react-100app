import { useState, type FormEvent } from 'react'

type FormData = {
  name: string
  email: string
  address: string
  phone: string
}

type Errors = {
  [key in keyof FormData]?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[0-9]{10,11}$/

export const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    address: '',
    phone: '',
  })

  const [errors, setErrors] = useState<Errors>({})

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const STEP1 = 1
  const STEP2 = 2
  const STEP3 = 3
  const STEP_LIST = [1, 2, 3]

  const validateStep = (step: number): boolean => {
    const newErrors: Errors = {}

    if (step === STEP1) {
      if (!formData.name) {
        newErrors.name = '名前は必須です'
      }
      setErrors(newErrors)
    }

    return Object.keys(newErrors).length === 0
  }

  const handleNext = (step: number) => {
    if (validateStep(step)) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = () => {
    console.log(formData)
    alert('送信完了')
  }

  const renderStep = () => {
    switch (currentStep) {
      case STEP1:
        return (
          <div>
            <h3>Step 1: 基本情報</h3>
            <div className="form-group">
              <label htmlFor="name">
                名前 *
                <input
                  id="name"
                  type="text"
                  className={errors.name ? 'error' : ''}
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </label>
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">
                メールアドレス *
                <input
                  id="email"
                  type="email"
                  className={errors.email ? 'error' : ''}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </label>
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>
          </div>
        )
      case STEP2:
        return (
          <div>
            <h3>Step 2: 詳細情報</h3>
            {/* Step2のフォーム */}
          </div>
        )
      case STEP3:
        return (
          <div>
            <h3>Step 3: 確認</h3>
            {/* 確認画面 */}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="multi-step-form">
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${(currentStep / 3) * 100}%` }}
        />
      </div>

      <div className="step-indicator">
        {STEP_LIST.map((step) => (
          <span key={step} className={step === currentStep ? 'active' : ''}>
            Step {step}
          </span>
        ))}
      </div>

      {renderStep()}

      <div className="navigation">
        <button onClick={handlePrev} disabled={currentStep === 1}>
          前へ
        </button>

        {currentStep < 3 ? (
          <button onClick={() => handleNext(currentStep)}>次へ</button>
        ) : (
          <button onClick={handleSubmit}>送信</button>
        )}
      </div>
    </div>
  )
}
