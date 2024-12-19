import { AppRoute, Cities } from '@const';
import { useAppDispatch } from '@hooks/index';
import { changeCity } from '@store/app-data/app-data';
import { memo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Logo(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogoClick = useCallback((evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(changeCity(Cities[0]));
    navigate(AppRoute.Root);
  }, [dispatch, navigate]);

  return (
    <div className="header__left">
      <Link className="header__logo-link" to={AppRoute.Root} onClick={handleLogoClick}>
        <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
      </Link>
    </div>
  );
}

const MemoizedLogo = memo(Logo);
export default MemoizedLogo;

