import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '@const';
import PrivateRoute from '@components/private-route/private-route';
import LoginScreen from '@pages/login-screen/login-screen';
import MainScreen from '@pages/main-screen/main-screen';
import OfferScreen from '@pages/offer-screen/offer-screen';
import FavoritesScreen from '@pages/favorites-screen/favorites-screen';
import NotFoundScreen from '@pages/not-found-screen/not-found-screen';
import { Offers } from '../../types/offer';
import { OffersInDetails } from '../../types/offerInDetails';
import { Reviews } from '../../types/review';

type AppProps = {
    placesCount: number;
    offers: Offers;
    reviews: Reviews;
    offersInDetails: OffersInDetails;
}

export default function App({placesCount, offers, reviews, offersInDetails}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainScreen placesCount={placesCount} offers={offers}/>}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginScreen />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <FavoritesScreen offers={offers}/>
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:id`}
            element={<OfferScreen offers={offers} offersInDetails={offersInDetails} reviews={reviews}/>}
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
