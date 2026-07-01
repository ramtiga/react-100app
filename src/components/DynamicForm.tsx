import { useState, useRef, type FormEvent, type FormEventHandler } from 'react'

type Skill = {
  id: number
  name: string
  level: string
}

export const DynamicForm = () => {
  const [skills, setSkills] = useState<Skill[]>([
    { id: 1, name: '', level: 'beginner' },
  ])

  const nextIdRef = useRef(2)

  const addSkill = () => {
    const newId = nextIdRef.current
    setSkills([...skills, { id: newId, name: '', level: 'beginner' }])
    nextIdRef.current++
  }

  const removeSkill = (id: number) => {
    setSkills((prev) => {
      if (prev.length == 1) return prev
      return skills.filter((skill) => skill.id !== id)
    })
  }

  const updateSkill = (id: number, field: keyof Skill, value: string) => {
    setSkills((prev) =>
      prev.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill,
      ),
    )
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validateSkills = skills.filter((skill) => skill.name.trim())
    if (validateSkills.length === 0) {
      alert('スキル名を入力してください')
      return
    }
    console.log(validateSkills)
    alert('送信完了！')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>スキル一覧</h3>

      {skills.map((skill) => (
        <div
          key={skill.id}
          className="skill-row"
          style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '10px',
          }}
        >
          <input
            type="text"
            placeholder="スキル名"
            value={skill.name}
            onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
          />

          <select
            value={skill.level}
            onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
            style={{ padding: '8px' }}
          >
            <option value="beginner">初級</option>
            <option value="intermediate">中級</option>
            <option value="advanced">上級</option>
          </select>

          <button
            type="button"
            onClick={() => removeSkill(skill.id)}
            disabled={false}
            style={{
              padding: '8px 12px',
              backgroundColor: skills.length <= 1 ? '#ccc' : '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: skills.length <= 1 ? 'not-allowed' : 'pointer',
            }}
          >
            削除
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addSkill}
        disabled={skills.length >= 5}
        style={{
          padding: '8px 16px',
          backgroundColor: skills.length >= 5 ? '#ccc' : '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: skills.length >= 5 ? 'not-allowed' : 'pointer',
          marginRight: '10px',
        }}
      >
        スキルを追加
      </button>

      <button
        type="submit"
        style={{
          padding: '8px 16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        送信
      </button>

      <div
        style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
        }}
      >
        <h4>送信データ:</h4>
        <pre>
          {JSON.stringify(
            skills.filter((skill) => skill.name.trim()),
            null,
            2,
          )}
        </pre>
      </div>
    </form>
  )
}
