import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/img/Logo-cropped.svg'
import { gsap } from 'gsap'

const NavBar = () => {

  const [added, setAdded] = useState({sidebar: true})
  const menu__list = useRef(null)
  
  const animation = () => {
    const sidebar = [menu__list.current]
    if (!added[sidebar]) {
      gsap.to(sidebar, {
        xPercent: 100,
        duration: 1,
        ease: "easeOut",
      })
    } else {
      gsap.to(sidebar, {
        xPercent: -100,
        duration: 1,
        ease: "easeOut",
      })
    }
    added[sidebar] = !added[sidebar]
    setAdded(prevState => ({ added, ...prevState }))
  }

  function handleResize() {
    const sidebar = [menu__list.current]
    gsap.to(sidebar, {
      xPercent: -100,
      duration: 1,
      ease: "easeOut",
    })
    setAdded({sidebar: true})
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <nav className="navbar">
      <figure>
        <Link to="/">
          <div className='nav__logo'><img src={ Logo } alt="Logo" className='nav__logo__img'/></div>
        </Link>
        <figcaption>Task List.</figcaption>
      </figure>
      {/* <img src={ Menu } alt="Menu" className='menu__img' id='menu__img' onClick={animation} /> */}
      <button class="btn-hamburger" id='menu__img' onClick={animation}>
        <svg class="hamburger" viewBox="0 0 100 100" width="40">
            <rect class="line line__top" width="80" height="10" x="10" y="30" rx="5"></rect>
            <rect class="line line__middle" width="80" height="10" x="10" y="50" rx="5"></rect>
            <rect class="line line__bottom" width="80" height="10" x="10" y="70" rx="5"></rect>
        </svg>
      </button>
      <div className="menu__list" ref={menu__list}>
        <Link className="menu__link" to="/" onClick={animation} >
          <h6>ALL TASKS</h6>
        </Link>
        <Link className='menu__link' to="/?task_state=todo" onClick={animation} >
            <h6>TO DO</h6>
        </Link>
        <Link className='menu__link' to="/?task_state=done" onClick={animation} >
            <h6>DONE</h6>
        </Link>
        <Link className="menu__link" to="/write" onClick={animation} >
          <h6>NEW TASK</h6>
        </Link>
      </div>
      <div className="menu__list2">
        <Link className="menu__link2" to="/" >
          <h6>ALL TASKS</h6>
        </Link>
        <Link className='menu__link2' to="/?task_state=todo" >
            <h6>TO DO</h6>
        </Link>
        <Link className='menu__link2' to="/?task_state=done" >
            <h6>DONE</h6>
        </Link>
        <Link className="menu__link2" to="/write" >
          <h6>NEW TASK</h6>
        </Link>
      </div>
    </nav>
  )
}

export default NavBar