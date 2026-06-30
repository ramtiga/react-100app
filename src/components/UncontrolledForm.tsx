import { useState, useRef, type FormEvent } from 'react'

type FileData = {
  name: string
  size: number
  type: string
}

type SubmittedData = {
  name: string
  email: string
  file: FileData | null
}

export const UncontrolledForm = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null)
  const [fileName, setFileName] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const name = nameRef.current?.value || ''
    const email = emailRef.current?.value || ''
    const file = fileRef.current?.files?.[0]
      ? {
          name: fileRef.current.files[0].name,
          size: fileRef.current.files[0].size,
          type: fileRef.current.files[0].type,
        }
      : null

    setSubmittedData({ name, email, file })
  }

  const handleFileChange = () => {
    const file = fileRef.current?.files?.[0]
    if (file) {
      setFileName(file.name)
    } else {
      setFileName('')
    }
  }

  const focusFirstEmpty = () => {
    if (!nameRef.current?.value) {
      nameRef.current?.focus()
    } else if (!emailRef.current?.value) {
      emailRef.current?.focus()
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>名前:</label>
          <input ref={nameRef} type="text" />
        </div>

        <div>
          <label>メール:</label>
          <input ref={emailRef} type="email" />
        </div>

        <div>
          <label>ファイル:</label>
          <input ref={fileRef} type="file" onChange={handleFileChange} />
          {fileName && <p>選択: {fileName}</p>}
        </div>

        <button type="submit">送信</button>
        <button type="button" onClick={focusFirstEmpty}>
          空欄にフォーカス
        </button>
      </form>

      {submittedData && (
        <div>
          <h4>送信データ:</h4>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
