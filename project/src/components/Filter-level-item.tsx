import { FilterItemComplexity } from '../utils/consts';
import { useAppDispatch } from '../hooks';
import { setLevel } from '../store/site-procces/site-slicer';
import { useCallback } from 'react';


type filterItemProps = {
    filterItemName: string;
   }


export function FilterLevelItem ({filterItemName}: filterItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleCurrentLevel = useCallback(() => {
    const currentLevel = FilterItemComplexity.filter((el) => el === filterItemName);
    const typeLevel = currentLevel[0];

    return dispatch(setLevel(typeLevel));
  }, [filterItemName, dispatch]);


  return (
    <li className="filter__item">
      <input type="radio" name="level" id={filterItemName} defaultChecked={filterItemName === 'Любой'} onClick={handleCurrentLevel}/>
      <label className="filter__label" htmlFor={filterItemName}><span className="filter__label-text">{filterItemName}</span>
      </label>
    </li>

  );
}
