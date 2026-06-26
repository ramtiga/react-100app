type Props = {
  name: string
}

const Greeting = ({ name }: Props) => {
  return <div>こんにちは、{name}さん</div>
}

export default Greeting
