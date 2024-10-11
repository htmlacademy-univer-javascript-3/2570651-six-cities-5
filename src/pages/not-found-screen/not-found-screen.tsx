import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function NotFoundScreen(): JSX.Element {
  return (
    <section className="six-cities">
      <Helmet>
        <title>6 cities: page not found</title>
      </Helmet>

      <section className="error__page" style={{textAlign: 'center', marginTop: '15%'}}>
        <h1 className="error__name">Error 404: Page not found</h1>
        <Link to="/">Return to home page</Link>
      </section>
    </section>
  );
}
