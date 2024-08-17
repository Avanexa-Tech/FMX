import React, { useState } from 'react'
import StyledInput from '../common/StyledInput';
import { Button } from 'antd';

const SignUp = () => {
const [signUp, setSignUp] = useState({});
  return (
      <div className='auth-container'>
          <div className='content'> 
              <div className='title'>Sign up for free</div>
              <div className='inputs'>
                  <StyledInput label={"Full Name"}/>
                  <StyledInput label={"Work Email"}/>
                  <StyledInput label={"Phone Number"}/>
              </div>
              <Button className="submit" type='primary'>Next</Button>
              <div className='foot'>Already have an account? <a>Log in</a></div>
          </div>
      </div>
  )
}

export default SignUp;