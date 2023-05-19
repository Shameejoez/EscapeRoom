import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchQuest, fetchBookingInfo } from '../store/action';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getIsQuestLoading, getQuest } from '../store/data-process/data-selectors';
import Spinner from '../components/Spinner';
import { AppRoutes} from '../utils/consts';
import { superTranslator } from '../utils/util';


export function Quest (): JSX.Element | null {
  const dispatch = useAppDispatch();
  const params = useParams();
  const quest = useAppSelector(getQuest);
  const isOfferLoading = useAppSelector(getIsQuestLoading);


  useEffect(() => {
    const {id} = params;

    if (id) {
      dispatch(fetchQuest(id));
      dispatch(fetchBookingInfo(id));
    }
  }, [params, dispatch]);

  if (!quest) {
    return null;
  }

  if (isOfferLoading) {
    return <Spinner />;
  }

  const {id, title, level, type, peopleMinMax, description, coverImg, coverImgWebp } = quest;

  return (
    <main className="decorated-page quest-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source type="image/webp" srcSet={`${coverImgWebp}, ${coverImgWebp}-size-m@2x.webp 2x`} /><img src={coverImg} srcSet={`${coverImg}-size-m@2x.jpg 2x`} width={1366} height={768} alt="" />
        </picture>
      </div>
      <div className="container container--size-l">
        <div className="quest-page__content">
          <h1 className="title title--size-l title--uppercase quest-page__title">{title}</h1>
          <p className="subtitle quest-page__subtitle"><span className="visually-hidden">Жанр:</span>{superTranslator(type)}
          </p>
          <ul className="tags tags--size-l quest-page__tags">
            <li className="tags__item">
              <svg width={11} height={14} aria-hidden="true">
                <use xlinkHref="#icon-person" />
              </svg>{peopleMinMax[0]}–{peopleMinMax[1]}&nbsp;чел
            </li>
            <li className="tags__item">
              <svg width={14} height={14} aria-hidden="true">
                <use xlinkHref="#icon-level" />
              </svg>{superTranslator(level)}
            </li>
          </ul>
          <p className="quest-page__description">{description}
            {/* тест */}
          </p>
          <Link className="btn btn--accent btn--cta quest-page__btn" to={`${AppRoutes.Quest}/${id}${AppRoutes.Booking}`}>Забронировать</Link>
        </div>
      </div>
    </main>
  );
}


