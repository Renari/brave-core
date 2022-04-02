import * as React from 'react'
import { ThemeProvider } from 'styled-components'
import IBraveTheme from 'brave-ui/theme/theme-interface'

export type Props = {
  // `initialThemeType` is not used!
  initialThemeType?: chrome.braveTheme.ThemeType
  dark: IBraveTheme
  light: IBraveTheme
}

export default function LightDarkThemeProvider (props: React.PropsWithChildren<Props>) {
  const darkModeMediaMatcher = React.useMemo(
    () => window.matchMedia('(prefers-color-scheme: dark)'),
    []
  )
  const [isDarkMode, setIsDarkMode] = React.useState(darkModeMediaMatcher.matches)

  React.useEffect(() => {
    darkModeMediaMatcher.addEventListener('change',
      (e) => {
        setIsDarkMode(e.matches)
      }
    )
  }, [])

  const selectedTheme = isDarkMode
    ? props.dark
    : props.light
  return (
    <ThemeProvider theme={selectedTheme}>
      {React.Children.only(props.children)}
    </ThemeProvider>
  )
}
