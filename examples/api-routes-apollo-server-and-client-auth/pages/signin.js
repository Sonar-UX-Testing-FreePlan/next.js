import React from 'react'
import Link from 'next/link'
import { withApollo } from '../apollo/client'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import Field from '../components/field'
import { getStatusFrom } from '../lib/form'
import { useRouter } from 'next/router'

const SignInMutation = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      user {
        id
        email
      }
    }
  }
`

function SignIn() {
  const [signIn] = useMutation(SignInMutation)
  const [status, setStatus] = React.useState({})
  const router = useRouter()
  async function handleSubmit(event) {
    event.preventDefault()
    const emailElement = event.currentTarget.elements.email
    const passwordElement = event.currentTarget.elements.password

    try {
      const { data } = await signIn({
        variables: {
          email: emailElement.value,
          password: passwordElement.value,
        },
      })
      if (data.signIn.user) {
        router.push('/')
      }
    } catch (error) {
      setStatus(getStatusFrom(error))
    }
  }

  return (
    <>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        {'' in status ? <p>{status['']}</p> : undefined}
        <Field
          name="email"
          type="email"
          autoComplete="email"
          required
          label="Email"
          status={status.email}
        />
        <Field
          name="password"
          type="password"
          autoComplete="password"
          required
          label="Password"
          status={status.password}
        />
        <button type="submit">Sign in</button> or{' '}
        <Link href="signup">
          <a>Sign up</a>
        </Link>
      </form>
    </>
  )
}

export default withApollo(SignIn)
