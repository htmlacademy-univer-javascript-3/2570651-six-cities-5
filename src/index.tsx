import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@components/app/app';
import { Setting } from '@const';
import { offers } from '@mocks/offers';
import { reviews } from '@mocks/reviews';
import { offersInDetails } from '@mocks/offersInDetails';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      placesCount={Setting.PlacesCount}
      offers={offers}
      reviews={reviews}
      offersInDetails={offersInDetails}
    />
  </React.StrictMode>
);
