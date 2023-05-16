/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAppDispatch, useAppSelector } from '../hooks';
import { loginUser } from '../store/action';
import {useForm, SubmitHandler} from 'react-hook-form';
import { getUserStatus } from '../store/user-process/user-selectors';
import { AppRoutes, Authorization } from '../utils/consts';
import {Navigate} from 'react-router-dom';

type FormValues = {
  email: string;
  password: string;
}

export function Login (): JSX.Element {
  const {register, handleSubmit, formState: {errors}} = useForm<FormValues>({mode: 'onChange'});

  const dispatch = useAppDispatch();
  const userStatus = useAppSelector(getUserStatus);

  const onFormSubmit: SubmitHandler<FormValues> = (data) => {
    const {email, password} = data;
    dispatch(loginUser({email: email.toLowerCase(), password: password}));

  };


  if (userStatus === Authorization.Auth) {
    return <Navigate to={AppRoutes.Main} />;
  } else {

    return (
      <main className="decorated-page login">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp" srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x" /><img src="img/content/maniac/maniac-size-m.jpg" srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x" width={1366} height={768} alt="" />
          </picture>
        </div>
        <div className="container container--size-l">
          <div className="login__form">
            <form className="login-form"
              onSubmit={handleSubmit(onFormSubmit)}
            >
              <div className="login-form__inner-wrapper">
                <h1 className="title title--size-s login-form__title">Вход</h1>
                <div className="login-form__inputs">
                  <div className="custom-input login-form__input">
                    <label className="custom-input__label" htmlFor="email">E&nbsp;–&nbsp;mail</label>
                    <input type="email" id="email" placeholder="Адрес электронной почты"
                      {...register('email')}
                    />
                  </div>
                  <div className="custom-input login-form__input">
                    <label className="custom-input__label" htmlFor="password">Пароль</label>
                    <input type="password" id="password" placeholder="Пароль"
                      {...register('password', {
                        minLength: {
                          message: 'Минимум 2 символа',
                          value: 2
                        }
                      })}
                    />
                  </div>
                  <div className='input-error-message' style={{height: 40}}>{errors?.password && errors?.password?.message}</div>
                </div>
                <button className="btn btn--accent btn--general login-form__submit" type="submit">Войти</button>
              </div>
              <label className="custom-checkbox login-form__checkbox">
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
          </div>
        </div>
      </main>
    );
  }


}
