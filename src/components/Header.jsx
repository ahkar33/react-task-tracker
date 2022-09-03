import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title }) => {
  const handleClick = () => {
    console.log('click');
  }

  return (
    <header className='header'>
      <h1>{title}</h1>
      <Button color='green' text='Hello' onClick={handleClick} />
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker'
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

// CSS in JS
// const headingStyle = {
//   color: 'red', 
//   backgroundColor: 'black'
// }

export default Header;