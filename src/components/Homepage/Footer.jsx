import React from 'react'

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
    const footerStyle = {
      fontSize : "14px",
      color: "#9ad3bc"
    }
  return (
    <div style={footerStyle}>©{year}</div>
  )
}

export default Footer