import React, { useState } from "react"
import {
  createGlobalStyle,
  ThemeProvider
} from 'styled-components'

function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

const GlobalStyle = createGlobalStyle `
body {
  background: ${props => props.theme.mode === `light` ? `white !important` : `#232323 !important`};
}
p, h1, footer{
  color: ${props => props.theme.mode === `light` ? `#232323 !important` : `white !important`};
}
`

const defaultContextValue = {
  mode: `light`
}

const Context = React.createContext(defaultContextValue)

export default ({
  children,
}) => {
  const [theme, setTheme] = useLocalStorage('theme', defaultContextValue)

  return (
    <Context.Provider value={{theme, setTheme}}>
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <GlobalStyle/>
          {children}
        </React.Fragment>
      </ThemeProvider>
    </Context.Provider>
  )
}

export {
  Context
 }

