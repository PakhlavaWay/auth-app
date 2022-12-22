import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const name = useSelector(state => state.name);
  const email = useSelector(state => state.email);
  return (
    <section style={{ fontSize: '1.2rem' }}>
       Welcome, <span style={{color: 'blue'}}>{name}</span>! <br />
       Your email is <span style={{color: 'blue'}}>{email}</span>
    </section>
  )
}

export default Profile