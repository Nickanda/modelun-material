import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import 'lazysizes'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import LockIcon from '@material-ui/icons/Lock'
import ResponsiveMenu from 'rmw-shell/lib/containers/ResponsveMenu/ResponsiveMenu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import formatMessage from './messages'
import grey from '@material-ui/core/colors/grey'

const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: {
      main: '#c62828',
    },
  },
})

const isAuthorised = () => {
  try {
    const key = Object.keys(localStorage).find((e) => e.match(/persist:root/))
    const data = JSON.parse(localStorage.getItem(key))
    const auth = JSON.parse(data.auth)

    return auth && auth.isAuthorised
  } catch (ex) {
    return false
  }
}

class LandingPage extends Component {
  companies = React.createRef()
  users = React.createRef()
  about = React.createRef()
  team = React.createRef()
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    transparent: true,
    users: [],
  }

  scroll(name) {
    console.log('name', name)
    console.log('ref', this[name])
    console.log('current', this[name].current)

    this[name] &&
      this[name].current &&
      this[name].current.scrollIntoView({
        behavior: 'smooth',
        alignToTop: true,
      })
  }

  handleScroll = (e) => {
    const { transparent } = this.state
    const scrollTop =
      window.pageYOffset ||
      (document &&
        document.documentElement &&
        document.documentElement.scrollTop)

    if (scrollTop > 50 && transparent) {
      this.setState({ ...this.state, transparent: false })
    }

    if (scrollTop <= 50 && !transparent) {
      this.setState({ transparent: true })
    }
  }

  async componentDidMount() {
    const { history } = this.props

    window.addEventListener('scroll', this.handleScroll)

    if (isAuthorised()) {
      history.push('/signin')
    }
  }

  render() {
    const { history } = this.props
    const { transparent } = this.state

    const sections = [
      {
        isDivider: true,
      },
      {
        name: formatMessage('signin'),
        onClick: () => history.push('/signin'),
        icon: <LockIcon />,
      },
    ]

    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <Helmet>
            <meta
              name="keywords"
              content={
                'react,pwa,material-ui,redux,boilerplate,lighthouse,gdg,react.js'
              }
            />
            <meta
              name="description"
              content={
                'React PWA boilerplate that is using create-react-app, redux and firebase '
              }
            />
            <meta name="theme-color" content={theme.palette.primary.main} />
            <meta
              name="apple-mobile-web-app-status-bar-style"
              content={theme.palette.primary.main}
            />
            <meta
              name="msapplication-navbutton-color"
              content={theme.palette.primary.main}
            />
            <title>Model UN Controller</title>
          </Helmet>

          <AppBar
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: transparent ? 'transparent' : undefined,
              boxShadow: transparent ? 'none' : undefined,
              transition: 'background 1s',
            }}
            position="static"
          >
            <Toolbar disableGutters>
              <div style={{ flex: 1 }} />

              <ResponsiveMenu sections={sections} transparent={transparent} />
            </Toolbar>
          </AppBar>

          <div style={{ width: '100%', height: '100%' }}>
            <div
              style={{
                height: '100%',
                width: '100%',
                backgroundImage: 'url(background.webp)',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <img
                  src={'/rmw.svg'}
                  alt="logo"
                  style={{ height: 180, maxWidth: 320, color: 'red' }}
                />

                <Typography
                  variant="h3"
                  align="center"
                  component="h3"
                  color="inherit"
                  gutterBottom
                  style={{
                    color: 'white',
                    marginTop: 18,
                    textAlign: 'center',
                  }}
                >
                  MODEL UN CONTROLLER
                </Typography>

                <Typography
                  variant="h5"
                  component="h2"
                  color="inherit"
                  gutterBottom
                  style={{ color: 'white', textAlign: 'center' }}
                >
                  {formatMessage('intro')}
                </Typography>

                <Button
                  style={{ margin: 30, borderRadius: '40px' }}
                  variant="contained"
                  color="secondary"
                  name={'signin'}
                  onClick={() => {
                    history.push('/signin')
                  }}
                >
                  {formatMessage('try_it_out')}
                </Button>
              </div>
            </div>
            <AppBar
              position="relative"
              style={{
                withd: '100%',
                padding: 18,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
              }}
              id="footer-text"
            >
              {`View `}<Link to={'https://google.com'}>{'our source code'}</Link>{` and contribute!`}
            </AppBar>
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(LandingPage)
