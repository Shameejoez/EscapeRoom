import BookingForm from '../components/Booking-form';
import Spinner from '../components/Spinner';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getBookingsInfo, getIsBookingsInfoLoading, getQuest } from '../store/data-process/data-selectors';
import { Map } from '../components/Map';
import { useState, useEffect } from 'react';
import { DefaultCenterMap } from '../utils/consts';
import { useParams } from 'react-router-dom';
import { fetchBookingInfo, fetchQuest } from '../store/action';

export function Booking(): JSX.Element | null {
  const params = useParams();
  const dispatch = useAppDispatch();
  const bookingInfo = useAppSelector(getBookingsInfo);

  const isBookingInfoLoading = useAppSelector(getIsBookingsInfoLoading);
  const quest = useAppSelector(getQuest);
  const defaultAdress = bookingInfo.map((el) => el.location.address);


  const [currentAdress, setCurrentAdress] = useState<number[]>();


  useEffect(() => {
    const {id} = params;

    if (id) {
      dispatch(fetchQuest(id));
      dispatch(fetchBookingInfo(id));


    }

  }, [params, dispatch, ]);

  if (!quest) {
    return null;
  }
  const onMarkerClick = (coords: number[]): void => {
    setCurrentAdress(coords);
  };
  const {id, title, coverImg, coverImgWebp, peopleMinMax } = quest;
  const currentEvent = bookingInfo.filter((el) => el.location.coords === currentAdress);

  const coordinats = bookingInfo.map(({id: eventId, location: eventLoc }) => ({id: eventId, location: eventLoc.coords}));


  if (!bookingInfo) {
    return null;
  }

  if (isBookingInfoLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <main className="page-content decorated-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp" srcSet={`${coverImgWebp}, ${coverImgWebp}-size-m@2x.webp 2x`} /><img src={coverImg} srcSet={`${coverImg}-size-m@2x.jpg 2x`} width={1366} height={1959} alt="" />
          </picture>
        </div>
        <div className="container container--size-s">
          <div className="page-content__title-wrapper">
            <h1 className="subtitle subtitle--size-l page-content__subtitle">Бронирование квеста
            </h1>
            <p className="title title--size-m title--uppercase page-content__title">{title}</p>
          </div>
          <div className="page-content__item">
            <div className="booking-map">
              <div className="map">
                <div className="map__container">
                  <Map center={DefaultCenterMap} onClickCurrent={onMarkerClick} location={coordinats} activeAdress={currentAdress}/>
                </div>
              </div>
              <p className="booking-map__address">{currentEvent[0] ? currentEvent[0].location.address : defaultAdress[0]}</p>
            </div>
          </div>
          <BookingForm bookingData={currentEvent[0] ? currentEvent[0] : bookingInfo[0]} id={id} countPeople={peopleMinMax}/>
        </div>
      </main>
    </div>
  );
}
