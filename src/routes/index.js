/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Login from '../pages/login/login.js'
import Register from '../pages/register/register.js'
import Streamer from '../pages/streamer/streamer.js'
import PasswordForget from '../pages/passwordForget/password.js'

const routes = [
  { path: '/login', component: Login },
  { path: '/', component: Streamer },
  { path: '/streamer', component: Streamer },
  { path: '/register', component: Register },
  { path: '/passwordForget', component: PasswordForget },
]

export default routes
