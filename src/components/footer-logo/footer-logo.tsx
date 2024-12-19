import { AppRoute, Cities } from '@const';
import { useAppDispatch } from '@hooks/index';
import { changeCity } from '@store/app-data/app-data';
import { memo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function FooterLogo(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogoClick = useCallback((evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(changeCity(Cities[0]));
    navigate(AppRoute.Root);
  }, [dispatch, navigate]);

  return (
    <footer className="footer container">
      <Link className="footer__logo-link" to={AppRoute.Root} onClick={handleLogoClick}>
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
      </Link>
    </footer>
  );
}

const MemoizedFooterLogo = memo(FooterLogo);
export default MemoizedFooterLogo;
