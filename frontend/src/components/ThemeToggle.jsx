import { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { FiSun, FiMoon } from 'react-icons/fi'

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    if (theme === 'dark') {
      setDarkMode(true)
      document.body.setAttribute('data-bs-theme', 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !darkMode
    setDarkMode(newTheme)
    document.body.setAttribute('data-bs-theme', newTheme ? 'dark' : 'light')
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  return (
    <Form.Check
      type="switch"
      id="theme-switch"
      label={darkMode ? <FiMoon /> : <FiSun />}
      checked={darkMode}
      onChange={toggleTheme}
      className="text-light"
    />
  )
}

export default ThemeToggle