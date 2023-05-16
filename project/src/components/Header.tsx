import { Link, Outlet } from 'react-router-dom';
import { getUserStatus } from '../store/user-process/user-selectors';
import { useAppSelector, useAppDispatch } from '../hooks';
import { ActivePlaceName, AppRoutes, Authorization } from '../utils/consts';
import { logout } from '../store/user-process/user-slicer';
import { checkUserAuth } from '../store/action';
import { Footer } from './Footer';
import { useState } from 'react';


export function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getUserStatus);
  const [currentPage, setCurrentPage] = useState<ActivePlaceName>();

  const handlCurrentPage = (data: ActivePlaceName) => {
    setCurrentPage(data);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    dispatch(checkUserAuth);
  };

  return (
    <>
      <header className="header">
        <div className="container container--size-l">
          <Link className="logo header__logo" to={AppRoutes.Main} aria-label="Перейти на Главную">
            <svg width={134} height={52} aria-hidden="true">
              <use xlinkHref="#logo" />
            </svg>
          </Link>
          <nav className="main-nav header__main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item">
                <Link className={`link ${currentPage === ActivePlaceName.Quests ? 'active' : ''}` }to={AppRoutes.Main} onClick={() =>handlCurrentPage(ActivePlaceName.Quests)}>Квесты</Link>
              </li>
              <li className="main-nav__item">
                <Link className={`link ${currentPage === ActivePlaceName.Contacts ? 'active' : ''}` } to={`${AppRoutes.Contacts}`} onClick={() =>handlCurrentPage(ActivePlaceName.Contacts)}>Контакты</Link>
              </li>
              {isAuth === Authorization.Auth &&
              <li className="main-nav__item">
                <Link className={`link ${currentPage === ActivePlaceName.MyQuests ? 'active' : ''}` } to={AppRoutes.MyQusets} onClick={() =>handlCurrentPage(ActivePlaceName.MyQuests)}>Мои бронирования</Link>
              </li>}
            </ul>
          </nav>
          <div className="header__side-nav">
            {isAuth === Authorization.Auth ?
              <Link className="btn btn--accent header__side-item" to="#" onClick={handleLogoutClick}>Выйти</Link> :
              <Link className="btn header__side-item header__login-btn" to={AppRoutes.Login} onClick={handleLogoutClick}>Вход</Link>}
            <Link className="link header__side-item header__phone-link" to="#">8 (000) 111-11-11</Link>
          </div>
        </div>
      </header>
      {/* Место для отрисовки страниц */}
      <Outlet />
      <Footer />
    </>
  );
}
