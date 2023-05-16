import { useEffect } from 'react';
import { QuestCard } from '../components/Quest-card';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchReservedQuests } from '../store/action';
import { getReservedQuests } from '../store/data-process/data-selectors';

export function MyBookings (): JSX.Element {
  const dispatch = useAppDispatch();
  const INT_FOR_KEY = 3242;
  const myQuest = useAppSelector(getReservedQuests);
  const myCardQuest = myQuest.map(({quest, id}) => ({placeId: id, card: quest }));
  const randomKey = (max: number) =>(Math.random() * max);

  useEffect(() => {
    dispatch(fetchReservedQuests());

  }, [dispatch]);

  const renderMyQuest = () =>
    myCardQuest.map((card) => <QuestCard place={'my-quest'} key={`${randomKey(INT_FOR_KEY)}${card.placeId}`} data={card.card} placeId={card.placeId}/>);

  return (
    <main className="page-content decorated-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source type="image/webp" srcSet="img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x" /><img src="img/content/maniac/maniac-bg-size-m.jpg" srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x" width={1366} height={1959} alt="" />
        </picture>
      </div>
      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="title title--size-m page-content__title">Мои бронирования</h1>
        </div>
        <div className="cards-grid">
          {renderMyQuest()}
        </div>
      </div>
    </main>

  );
}
