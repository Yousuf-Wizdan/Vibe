import React from 'react'
import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
  // const [email , setEmail] = useState("");
  // const [oauthloading , SetOauthLoading] = useState<string | undefined>('false')
  return (
    <div>
      <SignIn />
    </div>
  )
}

export default SignInPage
