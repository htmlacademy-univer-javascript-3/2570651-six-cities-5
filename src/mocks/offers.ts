import { Offers } from '../types/offer';

export const offers: Offers = [
  {
    'id': '6af6f711-c28d-4121-82cd-e0b462a27f00',
    'title': 'Beautiful & luxurious studio at great location',
    'type': 'apartment',
    'price': 120,
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.35514938496378,
        'longitude': 4.673877537499948,
        'zoom': 8
      }},
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.673877537499948,
      'zoom': 8
    },
    'isFavorite': true,
    'isPremium': false,
    'rating': 4,
    'previewImage': 'img/apartment-01.jpg'
  },
  {
    'id': 'e50c65bc-1822-4ae8-9807-bb050b84e4fb',
    'title': 'Wood and stone place',
    'type': 'room',
    'price': 286,
    'previewImage': 'img/room.jpg',
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.37454,
        'longitude': 4.897976,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 52.370540000000005,
      'longitude': 4.9099759999999995,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 5
  },
  {
    'id': '8ac1d09e-81da-444c-b8c4-04b2a4c3219a',
    'title': 'Canal View Prinsengracht',
    'type': 'apartment',
    'price': 169,
    'previewImage': 'img/apartment-02.jpg',
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.37454,
        'longitude': 4.897976,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 52.36354,
      'longitude': 4.911976,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 4.3
  },
  {
    'id': '5589a300-6208-4f52-908b-b8d348b0844e',
    'title': 'Nice, cozy, warm big bed apartment',
    'type': 'apartment',
    'price': 469,
    'previewImage': 'img/apartment-03.jpg',
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.37454,
        'longitude': 4.897976,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 52.385540000000006,
      'longitude': 4.886976,
      'zoom': 16
    },
    'isFavorite': true,
    'isPremium': false,
    'rating': 3.8
  },
  {
    'id': 'f3dac69d-8e54-44c7-b749-91e2be54559b',
    'title': 'Amazing and Extremely Central Flat',
    'type': 'room',
    'price': 225,
    'previewImage': 'https://14.design.htmlacademy.pro/static/hotel/16.jpg',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 48.87561,
      'longitude': 2.375499,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 3.3
  },
  {
    'id': '8c7bdf08-58e7-4e41-834f-76abbabf0f72',
    'title': 'Beautiful & luxurious apartment at great location',
    'type': 'hotel',
    'price': 442,
    'previewImage': 'https://14.design.htmlacademy.pro/static/hotel/19.jpg',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 48.85761,
      'longitude': 2.358499,
      'zoom': 16
    },
    'isFavorite': true,
    'isPremium': true,
    'rating': 3
  },
];
