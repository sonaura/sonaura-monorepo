'use client';

import React, { PropsWithChildren } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from 'styled-components';
import getTheme from 'theme';

const Page = ({ children }: PropsWithChildren) => {
  return (
    <MuiThemeProvider theme={getTheme()}>
      <ThemeProvider theme={getTheme()}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Paper elevation={0}>{children}</Paper>
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

export default Page;
