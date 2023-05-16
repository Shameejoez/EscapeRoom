import type { QuestCardData } from '../types/types';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../utils/consts';
import { superTranslator } from '../utils/util';
import { useAppDispatch } from '../hooks';
import { deleteBookingQuest, fetchReservedQuests } from '../store/action';

type QuestCardProps = {
  data: QuestCardData;
  place?: string;
  placeId?: string;
}

export function QuestCard ({data, place, placeId}: QuestCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {id, title, previewImg, previewImgWebp, level, peopleMinMax} = data;

  const onClickDeletQuest = () => {
    dispatch(deleteBookingQuest(placeId as string));
    dispatch(fetchReservedQuests());
  };

  return (

    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source type="image/webp" srcSet={previewImgWebp} /><img src={previewImg} srcSet={`${previewImg}x2`} width={344} height={232} alt="Мужчина в клетке в подземелье." />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper"><Link className="quest-card__link" to={`${AppRoutes.Quest}/${id}`}>{title}</Link>
          {place === 'my-quests' && <span className="quest-card__info">[сегодня,&nbsp;17:00. наб. реки Карповки&nbsp;5, лит&nbsp;П<br />м. Петроградская]</span>}
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width={11} height={14} aria-hidden="true">
              <use xlinkHref="#icon-person" />
            </svg>{`${peopleMinMax[0]}-${peopleMinMax[1]}`}&nbsp;чел
          </li>
          <li className="tags__item">
            <svg width={14} height={14} aria-hidden="true">
              <use xlinkHref="#icon-level" />
            </svg>{superTranslator(level)}
          </li>
        </ul>
        {place === 'my-quest' && <button onClick={onClickDeletQuest} className="btn btn--accent btn--secondary quest-card__btn" type="button">Отменить</button>}
      </div>
    </div>
  );
}
