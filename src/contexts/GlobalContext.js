import React, { useState, createContext } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';
import { CustomProvider } from 'rsuite';
import Alert from '@material-ui/lab/Alert';
import {
  Snackbar,
  Dialog,
  DialogTitle,
  // DialogContent,
  // DialogActions,
  IconButton,
  Typography,
  // Button
  // DialogContentText
} from '@material-ui/core'

import Close from '@material-ui/icons/Close';

import { lighten_palette, dark_palette } from "../customTheme";

import i18n from '../i18n';

import "../style/normalize.css";
import 'rsuite/dist/rsuite.min.css';

const light = createTheme({
  dark: false,
  palette: lighten_palette
})

const dark = createTheme({
  dark: true,
  palette: dark_palette
})

const GlobalContext = createContext();

function GlobalProvider({ children, ...rest }) {
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'zh-TW');
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const [snackBar, setSnackBar] = useState({
    open: false,
    severity: 'info',
    message: ''
  })

  const [dialog, setDialog] = useState({
    title: "",
    open: false,
    section: <></>
  })
  // console.log(typeof dialog.onConfirm === "function")

  const dialogStyle = theme === "dark" ? dark_palette.paper : lighten_palette.paper

  const changeTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem('theme', theme)
  };

  const changeLocale = (locale) => {
    setLocale(locale);
    localStorage.setItem('locale', locale)
  };

  const openDialog = (_dialog) => {
    setDialog({
      open: true,
      ..._dialog
    })
  }

  const closeDialog = () => {
    setDialog({
      ...dialog,
      open: false,
    })
  }

  const openSnackbar = (_snackbar) => {
    setSnackBar({
      open: true,
      ..._snackbar
    })
  }

  const value = {
    locale,
    t: i18n(locale),
    changeLocale,
    changeTheme,
    openDialog,
    closeDialog,
    openSnackbar,
    theme
  };

  return <GlobalContext.Provider
    value={value}
    {...rest}
  >
    <CustomProvider theme={theme}>
      <ThemeProvider theme={theme === "dark" ? dark : light}>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={snackBar.open}
          autoHideDuration={3000}
          onClose={() => setSnackBar({
            ...snackBar,
            open: false,
          })}>
          <Alert
            elevation={6}
            variant="filled"
            onClose={() => setSnackBar({
              ...snackBar,
              open: false,
            })} severity={snackBar.severity}>
            {snackBar.message}
          </Alert>
        </Snackbar>
        <Dialog
          onClose={() => setDialog({ ...dialog, open: false })}
          open={dialog.open}
        >
          <DialogTitle
            disableTypography
            style={{
              backgroundColor: dialogStyle.background,
              color: dialogStyle.color
            }}
          ><Typography variant="h6">{dialog.title}</Typography>
            <IconButton style={{
              color: dialogStyle.color,
              position: 'absolute',
              right: 8,
              top: 8,
            }} onClick={() => setDialog({ ...dialog, open: false })}>
              <Close />
            </IconButton>
          </DialogTitle>
          {dialog.section}
        </Dialog>
        {children}
      </ThemeProvider>
    </CustomProvider>
  </GlobalContext.Provider>;
}

export { GlobalContext, GlobalProvider };