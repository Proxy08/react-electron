/* eslint-disable no-console */
/* eslint-disable react/sort-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import {
  Button, Form, Grid, Image, Message, Segment,
} from 'semantic-ui-react'
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'
import axios from 'axios'
import logo from '../../assets/img/logo.svg'
import loginI from '../../assets/img/login.jpeg'

const storage = window.localStorage

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = { email: '', pass: '', errorMessage: '' }

    const that = this

    // this.handleChange = this.handleChange.bind(this)
    // this.handleLogin = this.handleLogin.bind(this)
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     // User is signed in.
    //     console.log(user)
    //     that.props.history.push({ pathname: '/', state: { nav: true } })
    //     // ...
    //   } else {
    //     // User is signed out.
    //     // ...
    //   }
    // })
  }

  // eslint-disable-next-line class-methods-use-this
  // eslint-disable-next-line react/sort-comp
  // eslint-disable-next-line class-methods-use-this
  forgotPassword() {

  }

  handleChange =(event) => {
    console.log(event)
    const { target } = event
    const value = target.type === 'checkbox' ? target.checked : target.value
    const { name } = target

    console.log(event)

    this.setState({
      [name]: value,
    })

    console.log(this.state, this.props)
  }

    handleLogin =(event) => {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
      const body = {
        email: this.state.email,
        password: this.state.pass,
      }

      axios.post('https://jiffeo.tv/mobile/api/login', body, headers,
      //  body: JSON.stringify({ email: this.state.email, password: this.state.password }),
        // headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json'
        //     }
      // eslint-disable-next-line function-paren-newline
      )

        .then(({ data }) => {
          console.log('user', data.user)
          storage.setItem('user', JSON.stringify(data.user))
        })
        .catch((error) => {
          console.log(error)
          const errorCode = error.code
          const errorMessage = error.message

          console.log(error)
          this.setState({ errorMessage: error.message })
        })
    }

    render() {
      return (
        <div
          style={{
            backgroundImage: `url(${loginI})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            textAlign: 'center',
            position: 'fixed',
            top: '0',
            bottom: '0',
            right: '0',
            left: '0',
          }}
          className="login-form"
        >
          {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
          <style>
            {`
            
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 200%;
        align-content: center;
      }
    `}

          </style>
          <Grid
            textAlign="center"
            style={{
              height: '100%',
              right: 0,
              left: 0,
              top: 0,
              bottom: 0,
            }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <center>
                <Image src={logo} className="App-logo" />
              </center>
              {/* <Header as="h2" color="teal" textAlign="center">

                {' '}
Log-in to your account
              </Header> */}
              {this.state.errorMessage
                            && (
                            <Message negative>
                              <Message.Header>We hit a snag logging you in:</Message.Header>
                              <p>
                                {' '}
                                {this.state.errorMessage}
                                {' '}
                              </p>
                            </Message>
                            )
                        }
              <Form size="large" onSubmit={this.handleLogin}>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address"
                    name="email"
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    name="pass"
                    onChange={this.handleChange}
                  />

                  <Button type="submit" color="teal" fluid size="large">Login</Button>
                  <br />
                  <p>
                    {' '}
                    <a href="#"> Forgot your password? </a>
                    {' '}
                  </p>
                </Segment>

              </Form>
              <Segment>
                            New to us?
                {' '}
                <Link to="/register">Sign Up</Link>
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
      )
    }
}

export default Login
