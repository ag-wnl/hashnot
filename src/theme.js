import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,  
}

const styles = {
    global : {
        body : {
            fontFamily: 'InterVariable, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',

            background : 'linear-gradient(to bottom, #000000, #070d3d, #020621, #0e1657, #000000)'
        }
    }
}

const theme = extendTheme({ config, styles })
export default theme;