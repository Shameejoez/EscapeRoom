/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/jsx-closing-bracket-location */
import type { BookingData } from '../types/types';
import {useForm, SubmitHandler} from 'react-hook-form';
import { BookingQuestData } from '../types/types';
import { postBookingQuest } from '../store/action';
import { useAppDispatch } from '../hooks';

type BookingProps = {
  bookingData: BookingData;
  id: string;
  countPeople: number[];
}

function BookingForm ({bookingData, id, countPeople}: BookingProps): JSX.Element | null {
  const dispatch = useAppDispatch();
  const {register, handleSubmit, formState: {errors}} = useForm<BookingQuestData>({mode: 'onChange'});

  const onFormSubmit: SubmitHandler<BookingQuestData> = (data) => {
    const timeDate = data.time.split(' ');
    data.date = timeDate[0];
    data.time = timeDate[1];
    data.placeId = bookingData.id;
    data.peopleCount = Number(data.peopleCount);
    dispatch(postBookingQuest({id:id, ...data}));
  };

  const renderRadioElement = (date: string) => {
    if(date === 'today') {
      return bookingData.slots.today.map((el) => (
        <label key={el.time} className="custom-radio booking-form__date">
          <input type="radio" id={`today${el.time}`} required defaultValue={`today ${el.time}`} disabled={!el.isAvailable} {...register('time') } /* {...register('date', {value: 'today'}) } *//>
          <span className="custom-radio__label" {...register('date')}>{el.time}</span>
        </label>)
      );} else {
      return bookingData.slots.tomorrow.map((el) => (
        <label key={el.time} className="custom-radio booking-form__date">
          <input type="radio" id={el.time} required defaultValue={`tomorrow ${el.time}`} disabled={!el.isAvailable} {...register('time') } />
          <span className="custom-radio__label" {...register('date')}>{el.time}</span>
        </label>));}
  };

  if (!bookingData) {
    return null;
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit(onFormSubmit)}>
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Выбор даты и времени</legend>
        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">Сегодня</legend>
          <div className="booking-form__date-inner-wrapper">
            {renderRadioElement('today')}
          </div>
        </fieldset>
        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">Завтра</legend>
          <div className="booking-form__date-inner-wrapper">
            {renderRadioElement('tomorrow')}
          </div>
        </fieldset>
      </fieldset>
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Контактная информация</legend>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="name">Ваше имя</label>
          <input type="text" id="name" placeholder="Имя"
            {...register('contactPerson', {
              required: 'Имя может состоять из рус. или латин. букв',
              pattern: /[А-Яа-яЁёA-Za-z']{1,}/
            } )}
          />
          {errors?.contactPerson && <div className='input-error-message' style={{height: 40}}>Имя может состоять из рус. или латин. букв</div>}
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
          <input type="tel" placeholder="Телефон"
            {...register('phone', {
              required: true,
              pattern: /[0-{9}]{10,}/
            } )}
          />
          {errors?.phone && <div className='input-error-message' style={{height: 40}}>Введите номер формате: 89181231212</div>}
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="person">Количество участников</label>
          <input type="number" id="person" placeholder="Количество участников" required
            {...register('peopleCount', {
              min: countPeople[0],
              max: countPeople[1]
            })}
          />
          {errors?.peopleCount && <div className='input-error-message' style={{height: 40}}>{`От ${countPeople[0]} до ${countPeople[1]} человек `}</div>}
        </div>
        <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
          <input type="checkbox" id="children" defaultChecked
            {...register('withChildren')}
          />
          <span className="custom-checkbox__icon">
            <svg width={20} height={17} aria-hidden="true">
              <use xlinkHref="#icon-tick" />
            </svg>
          </span><span className="custom-checkbox__label">Со&nbsp;мной будут дети</span>
        </label>
      </fieldset>
      <button className="btn btn--accent btn--cta booking-form__submit" type="submit" >Забронировать</button>
      <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
        <input type="checkbox" id="id-order-agreement" name="user-agreement" required />
        <span className="custom-checkbox__icon">
          <svg width={20} height={17} aria-hidden="true">
            <use xlinkHref="#icon-tick" />
          </svg>
        </span>
        <span className="custom-checkbox__label">Я&nbsp;согласен с
          <a className="link link--active-silver link--underlined" href="#">правилами обработки персональных данных</a>&nbsp;и пользовательским соглашением
        </span>
      </label>
    </form>
  );
}


export default BookingForm;
