import React from 'react'
import Logo from '../assets/img/Logo-cropped.svg'
import moment from 'moment'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer__container">
        <div className='foot__logo'><img src={Logo} alt="Logo" className='foot__logo__img'/></div>
        <div className="copyright"><p>Handcrafted by <Link to="https://github.com/marcello-concu">Marcello Concu</Link> © {moment(Date.now()).format("YYYY")}</p></div>
      </div>
    </div>
  )
}

export default Footer