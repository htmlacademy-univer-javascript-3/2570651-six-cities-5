type PlaceCardProps = {
  isPremium: boolean;
  imagePath: string;
  priceValue: number;
  isActive: boolean;
  cardName: string;
  starsCount: number;
  cardType: string;
}

function PlaceCard({isPremium, imagePath, priceValue, isActive, cardName, starsCount, cardType}: PlaceCardProps): JSX.Element {
  return (
    <article className="cities__card place-card">
      {isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        :
        null}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={imagePath} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{priceValue}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          {isActive ?
            <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">In bookmarks</span>
            </button>
            :
            <button className="place-card__bookmark-button button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>}
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `calc(100% / 5 * ${starsCount}`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{cardName}</a>
        </h2>
        <p className="place-card__type">{cardType}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
