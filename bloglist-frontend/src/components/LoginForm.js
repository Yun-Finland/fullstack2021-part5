import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ setUser, setMessage }) => {

  const [ username, setUsername ] = new useState('')
  const [ password, setPassword ] = new useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {

      const user = await loginService.login({
        username, password,
      })

      setUsername('')
      setPassword('')

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)

    }catch (exception){
      setMessage({ content: 'wrong username or password', style: 'error' })
      setTimeout( () => {
        setMessage({ content: null, style: null })
      },5000)
    }

  }

  return (
    <div>
      <form onSubmit = {handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="username"
            onChange = {({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type ="text"
            value = {password}
            name = "password"
            onChange = {({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type ="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
