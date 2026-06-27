import { useState, type ChangeEvent } from 'react'

function RegistrationForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleChangeAge = (e: ChangeEvent<HTMLInputElement>) => {
    setAge(Number(e.target.value))
  }

  const handleClear = () => {
    setName('')
    setEmail('')
    setAge(0)
    setSubmitted(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="なまえ"
            value={name}
            onChange={handleChangeName}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={handleChangeEmail}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="年齢"
            value={age}
            onChange={handleChangeAge}
          />
        </div>

        <button type="submit">送信する</button>
        <button type="button" onClick={handleClear}>
          全てクリア
        </button>
      </form>
      {submitted && (
        <div>
          <div>なまえ：{name}</div>
          <div>メールアドレス：{email}</div>
          <div>年齢：{age}</div>
        </div>
      )}
    </div>
  )
}

export default RegistrationForm
