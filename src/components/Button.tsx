type ButtonProps = {
  size?: 'small' | 'medium' | 'large'
  color?: string
  text?: string
}

function Button({
  size = 'medium',
  color = 'blue',
  text = 'Click me',
}: ButtonProps) {
  const buttonStyle = {
    padding:
      size === 'small'
        ? '5px 10px'
        : size === 'large'
          ? '15px 30px'
          : '10px 20px',
    backgroundColor: color,
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }

  return <button style={buttonStyle}>{text}</button>
}

export default Button
