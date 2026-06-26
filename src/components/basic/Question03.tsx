import UserCard from './UserCard'

const Question03 = () => {
  const users = [
    { name: 'たなか', age: 21, isActive: true },
    { name: 'やまだ', age: 43, isActive: false },
  ]
  return (
    <div>
      {users.map((user) => (
        <UserCard {...user} />
        //<UserCard name={user.name} age={user.age} isActive={user.isActive} />
      ))}
    </div>
  )
}

export default Question03
