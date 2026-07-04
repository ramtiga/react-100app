import { useState } from 'react'

type ToggleReturn = {
  isOn: boolean
  toggle: () => void
  setOn: () => void
  setOff: () => void
}

function useToggle(initialValue = false): ToggleReturn {
  const [isOn, setIsOn] = useState(initialValue)

  const toggle = () => {
    setIsOn((prev) => !prev)
  }

  const setOn = () => {
    setIsOn(true)
  }
  const setOff = () => {
    setIsOn(false)
  }

  return { isOn, toggle, setOn, setOff }
}

export const Question49 = () => {
  const modal = useToggle()
  const sidebar = useToggle(true)
  return (
    <div className="toggle-container">
      <div className="toggle-section">
        <h3>Modal Example</h3>
        <button className="toggle-button" onClick={modal.toggle}>
          {modal.isOn ? 'Close' : 'Open'} Modal
        </button>
        {modal.isOn && (
          <div className="modal-content">
            <h4>Modal Content</h4>
            <button className="modal-close-button" onClick={modal.setOff}>
              Close Modal
            </button>
          </div>
        )}
      </div>

      <div className="toggle-section">
        <h3>Sidebar Example</h3>
        <button className="toggle-button" onClick={sidebar.toggle}>
          Toggle Sidebar
        </button>
        <span className="sidebar-status">
          Status: {sidebar.isOn ? 'ON' : 'OFF'}
        </span>
      </div>
    </div>
  )
}
