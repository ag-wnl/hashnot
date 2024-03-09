import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from "./context/authContext";
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import appTheme from './theme'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme = {appTheme} cssVarsRoot="body">
    <AuthContextProvider>
      <ColorModeScript initialColorMode={appTheme.config.initialColorMode} />
      <App />
    </AuthContextProvider>
  </ChakraProvider>
);

