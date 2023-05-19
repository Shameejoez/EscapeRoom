import { unstable_HistoryRouter as HistoryRouter, Routes, Route,} from 'react-router-dom';
import { AppRoutes } from '../../utils/consts';
import { Header } from '../Header';
import { Main } from '../../pages/Main';
import { Login } from '../../pages/Login';
import { Contacts } from '../../pages/Contacts';
import { Quest } from '../../pages/Quest';
import { MyBookings } from '../../pages/MyBookings';
import { Booking } from '../../pages/Booking';
import history from '../../history';
import NotFound from '../Not-found';
import PrivateRoute from '../Private-route';
import Error from '../Error';
import CancelQuest from '../Сancel-quest';


function App(): JSX.Element {
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path={AppRoutes.Main} element={<Header />}>
          <Route index element={<Main />}/>
          <Route path={AppRoutes.Login} element={<Login />}/>
          <Route path={`${AppRoutes.Contacts}`} element={<Contacts />}/>
          <Route path={'/*'} element={<NotFound/>}/>
          <Route path={`${AppRoutes.Quest}/:id`} element={<Quest />}/>
          <Route path={AppRoutes.Error} element={<Error />}/>
          <Route path={AppRoutes.CancelQuest} element={<CancelQuest />}/>
          <Route path={`${AppRoutes.Quest}/:id${AppRoutes.Booking}`}
            element={
              <PrivateRoute >
                <Booking />
              </PrivateRoute>
            }
          />
          <Route path={AppRoutes.MyQusets} element={
            <PrivateRoute>
              <MyBookings />
            </PrivateRoute>
          }
          />
        </Route>
      </Routes>
    </HistoryRouter>


  );
}

export default App;
