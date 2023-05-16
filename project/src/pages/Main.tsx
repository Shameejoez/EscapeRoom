import { QuestCard } from '../components/Quest-card';
import { FilterLevelItem } from '../components/Filter-level-item';
import { FilterTypeItem } from '../components/Filter-type-item';
import { FilterItemComplexity, FilterThemesIcon } from '../utils/consts';
import { useAppSelector } from '../hooks';
import { questsSelector } from '../store/data-process/data-selectors';

export function Main (): JSX.Element {
  const quests = useAppSelector(questsSelector);

  return (
    <main className="page-content">
      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="subtitle page-content__subtitle">квесты в Санкт-Петербурге
          </h1>
          <h2 className="title title--size-m page-content__title">Выберите тематику</h2>
        </div>
        <div className="page-content__item">
          <form className="filter" action="#" method="get">
            <fieldset className="filter__section">
              <legend className="visually-hidden">Тематика</legend>
              <ul className="filter__list">
                {/* Filter-Item Темы квестов */}
                { FilterThemesIcon.map((el) => <FilterTypeItem key={el.name} filterItemName={el.name} filterItemIcon={el.icon}/> )}
              </ul>
            </fieldset>
            <fieldset className="filter__section">
              <legend className="visually-hidden">Сложность</legend>
              <ul className="filter__list">
                {/* Filter-Item Сложность */}
                { FilterItemComplexity.map((el) => <FilterLevelItem key={el} filterItemName={el} />)}
              </ul>
            </fieldset>
          </form>
        </div>
        <h2 className="title visually-hidden">Выберите квест</h2>
        <div className="cards-grid">
          {quests.map((el) => <QuestCard data={el} key={el.id} />)}
        </div>
      </div>
    </main>

  );
}
