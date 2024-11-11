import { AppRoute } from '@const';

export default function FooterLogo(): JSX.Element {
  return (
    <footer className="footer container">
      <a className="footer__logo-link" href={AppRoute.Root}>
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
      </a>
    </footer>
  );
}
