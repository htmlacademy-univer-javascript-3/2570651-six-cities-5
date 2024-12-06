import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '@const';
import styles from './not-found-screen.module.css';

export default function NotFoundScreen(): JSX.Element {
  return (
    <section className="six-cities">
      <Helmet>
        <title>6 cities: page not found</title>
      </Helmet>

      <section className={styles.error__page}>
        <h1>Error 404: Page not found</h1>
        <Link to={AppRoute.Root}>Return to home page</Link>
      </section>
    </section>
  );
}
