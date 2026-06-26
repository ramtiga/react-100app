type Props = {
  name: string
  age: number
  isActive: boolean
}

const UserCard = (props: Props) => {
  return (
    <div className="user-card">
      なまえ：{props.name} 年齢：{props.age}{' '}
      {props.isActive ? 'アクティブ' : '非アクティブ'}
    </div>
  )
}

export default UserCard
