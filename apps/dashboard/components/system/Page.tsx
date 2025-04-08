import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from 'styled-components';
import AOS from 'aos';
import getTheme from 'theme';
import DashboardMain from 'layouts/DashboardMain';

interface Props {
  children: React.ReactNode;
}

const Page: React.FC<Props> = ({ children }) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }

    AOS.init({
      once: true,
      delay: 50,
      duration: 500,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <MuiThemeProvider theme={getTheme()}>
      <ThemeProvider theme={getTheme()}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Paper elevation={0}>
          <DashboardMain>{children}</DashboardMain>
        </Paper>
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

export default Page;
