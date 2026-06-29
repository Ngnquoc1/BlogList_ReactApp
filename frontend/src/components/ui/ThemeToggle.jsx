import { Form } from "react-bootstrap";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <Form.Check
      type="switch"
      id="theme-switch"
      aria-label="Toggle dark mode"
      label={isDark ? <FiMoon /> : <FiSun />}
      checked={isDark}
      onChange={toggleTheme}
    />
  );
};

export default ThemeToggle;
