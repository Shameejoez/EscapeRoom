import { FilterThemesIcon, IconSize} from '../utils/consts';
import type { FilterItemData } from '../types/types';
import { useAppDispatch } from '../hooks';
import { setType } from '../store/site-procces/site-slicer';
import { useCallback } from 'react';

 type filterItemProps = {
  filterItemName: FilterItemData['name'];
  filterItemIcon: FilterItemData['icon'];
 }


export function FilterTypeItem ({filterItemName, filterItemIcon}: filterItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  // для поиска по тематике
  const handleCurrentType = useCallback(() => {
    const currentType = FilterThemesIcon.filter((el) => el.name === filterItemName);
    const typeQuest = currentType[0];

    return dispatch(setType(typeQuest['name']));
  }, [filterItemName, dispatch]);


  return (
    <li className="filter__item">
      <input type="radio" name="type" id={filterItemName} defaultChecked={filterItemName === 'Все квесты'} onClick={handleCurrentType}/>
      <label className="filter__label" htmlFor={filterItemName}>
        <svg className="filter__icon" width={IconSize[filterItemName].width} height={IconSize[filterItemName].heigth} aria-hidden="true">
          <use xlinkHref={filterItemIcon} />
        </svg>
        <span className="filter__label-text">{filterItemName}</span>
      </label>
    </li>
  );
}
