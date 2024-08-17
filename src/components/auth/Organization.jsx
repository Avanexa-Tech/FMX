import React from 'react';
import StyledInput from '../common/StyledInput';
import { Button, Divider } from 'antd';

const Organization = () => {
    const orgList = [
        "Manufacturing",
        "hospitality",
        "Wholesale Distribution",
        "Public sector",
        "Healthcare",
        "Property Management",
        "Personal use",
        "Other"];
    
  return (
      <div className='org-container'>
          <b className='title'>Time to set up your organization</b>
          <StyledInput label={"Organization Name"} />
          <div className='list'>
              <b className='title'>Industry</b>
              <div className='container'>
                  {orgList.map((org, ind) => <div className='item' key={ind}>{org}</div>)}
              </div>
          </div>
          <Divider/>
          <Button className='submit' type='primary'> Continue</Button>
    </div>
  )
}

export default Organization