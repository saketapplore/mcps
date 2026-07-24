import { ThemeContext } from '../context/ThemeContext.jsx';
import { useContext } from 'react';

const useTheme = () => {
    return useContext(ThemeContext);
}

export default useTheme;