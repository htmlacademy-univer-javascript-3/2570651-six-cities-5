import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '@const';
import PrivateRoute from '@components/private-route/private-route';
import LoginScreen from '@pages/login-screen/login-screen';
import MainScreen from '@pages/main-screen/main-screen';
import OfferScreen from '@pages/offer-screen/offer-screen';
import FavoritesScreen from '@pages/favorites-screen/favorites-screen';
import NotFoundScreen from '@pages/not-found-screen/not-found-screen';

type AppProps = {
    placesCount: number;
}

export default function App({placesCount}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainScreen placesCount={placesCount}/>}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginScreen />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NoAuth}
              >
                <FavoritesScreen />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferScreen />}
          />
          <Route
            path='*'
            element={<NotFoundScreen />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
