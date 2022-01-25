import logo from '../images/logo.svg'
import { useLocation, Link } from 'react-router-dom';
import React from 'react';

function Header(props) {
  const { pathname } = useLocation();

    return(
        <header className="header">
          <a target="_self" href="https://github.com/maxh1337/mesto" className="logo header__logo">
            <img className="logo__img" alt="Mesto" src={logo} />
          </a>
          {props.loggedIn ? (
            <div className="header__content">
              <p className="header__email">{props.email}</p>
              <Link className="header__link header__link_signout" to="/sign-in" onClick={props.onSignOut}>Выйти</Link>
            </div>            
          ) : (
            <>
            {pathname === "/sign-in" ?
              <Link className="header__link" to="/sign-up">Регистрация</Link> :
              <Link className="header__link" to="/sign-in">Войти</Link>
            }
          </>
          )
          }
      </header>
    );
};
export default Header;