import './App.css'
import { UserList, PostDetail } from './components/basic/Question55'

function App() {
  return (
    <div>
      <UserList />
      <PostDetail postId={1} />
    </div>
  )
}

export default App
