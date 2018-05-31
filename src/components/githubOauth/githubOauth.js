import React from 'react'

const GithubOauth = () => {
  return (
    <div>
      <a className='button' href='https://github.com/login/oauth/authorize?client_id=5a57bd199dea74e2f36f' >
        <span className='icon'>
          <i className='fab fa-github' />
        </span>
        <span style={{fontFamily: 'Roboto,arial,sans-serif', fontSize: 13, color: '#757575', fontWeight: 500}}>Sign in</span>
      </a>
    </div>
  )
}

export default GithubOauth
