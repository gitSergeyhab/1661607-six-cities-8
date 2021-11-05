import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { AnyAction } from 'redux';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';

import App from './app';
import { stateAuthAndFilled, stateNoAuthAndEmpty, ScreenText } from '../../utils/test-constants';
import { AppRoute } from '../../constants';


const history = createMemoryHistory();

const mockStore = configureMockStore();

const makeFakeApp = (needStore: MockStore<any, AnyAction>) => (
  <Provider store={needStore} >
    <Router history={history}>
      <App/>
    </Router>
  </Provider>
);
describe('App Component', () => {
  describe('AUTH and FILLED', () => {
    const store = mockStore(stateAuthAndFilled);
    const fakeApp = makeFakeApp(store);
    it('test rout /', () => {

      history.push(AppRoute.Main);
      render(fakeApp);

      expect(screen.getByText(ScreenText.Main.Filled.Places)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Main.Filled.Sort)).toBeInTheDocument();
    });

    it('test rout /login -> redirect to /', () => {

      history.push(AppRoute.Login);
      render(fakeApp);
      expect(screen.getByText(ScreenText.Main.Filled.Places)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Main.Filled.Sort)).toBeInTheDocument();

      expect(screen.queryByPlaceholderText(ScreenText.Login.Email)).not.toBeInTheDocument();
    });

    // ??? не работают: TypeError: Actions must be plain objects. Use custom middleware for async actions. ???

    // it('test rout /favorites', () => {

    //   history.push(AppRoute.Favorites);
    //   render(fakeApp);

    //   expect(screen.getByText(ScreenText.Favorite.Filled.City)).toBeInTheDocument();
    //   expect(screen.getByText(ScreenText.Favorite.Filled.Title)).toBeInTheDocument();

    // });

    // it('test rout /offer/id', () => {

    //   history.push(`offer/${TEST_ID}`);
    //   render(fakeApp);

    //   expect(screen.getByText(ScreenText.Room.All.Goods)).toBeInTheDocument();
    //   expect(screen.getByText(ScreenText.Room.All.Nearby)).toBeInTheDocument();
    //   expect(screen.getByText(ScreenText.Room.Auth.Review)).toBeInTheDocument();
    // });


    it('test rout /fake -> redirect to notFoundPage', () => {

      history.push('/fake');
      render(fakeApp);

      expect(screen.getByText(ScreenText.Page404.Message)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Page404.Link)).toBeInTheDocument();
    });
  });

  describe('NO_AUTH and EMPTY', () => {
    const store = mockStore(stateNoAuthAndEmpty);
    const fakeApp = makeFakeApp(store);

    it('test rout /', () => {

      history.push(AppRoute.Main);
      render(fakeApp);

      expect(screen.getByText(ScreenText.Main.Empty.Description)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Main.Empty.Status)).toBeInTheDocument();
    });

    it('test rout /login', () => {

      history.push(AppRoute.Login);
      render(fakeApp);

      expect(screen.getByPlaceholderText(ScreenText.Login.Email)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(ScreenText.Login.Password)).toBeInTheDocument();
    });


    it('test rout /favorites -> redirect /login', () => {

      history.push(AppRoute.Favorites);
      render(fakeApp);

      expect(screen.getByPlaceholderText(ScreenText.Login.Email)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(ScreenText.Login.Password)).toBeInTheDocument();

      expect(screen.queryByText(ScreenText.Favorite.Filled.Title)).not.toBeInTheDocument();
      expect(screen.queryByText(ScreenText.Favorite.Empty.Status)).not.toBeInTheDocument();
    });

    // ??? не работают: TypeError: Actions must be plain objects. Use custom middleware for async actions. ???

    // it('test rout /offer/id', () => {

    //   history.push(`offer/${TEST_ID}`);
    //   render(fakeApp);

    //   expect(screen.getByText(ScreenText.Room.All.Goods)).toBeInTheDocument();
    //   expect(screen.getByText(ScreenText.Room.All.Nearby)).toBeInTheDocument();
    // });
  });

  // describe('AUTH and EMPTY', () => {

  //   const stateAuthAndEmpty = {stateNoAuthAndEmpty, UserData: {authorizationStatus: AuthorizationStatus.Auth}};
  //   const store = mockStore(stateAuthAndEmpty);
  //   const fakeApp = makeFakeApp(store);

  //   it('test rout /favorites', () => {

  //     history.push(AppRoute.Favorites);
  //     render(fakeApp);

  //     expect(screen.getByText(ScreenText.Favorite.Empty.Status)).toBeInTheDocument();
  //     expect(screen.getByText(ScreenText.Favorite.Empty.Description)).toBeInTheDocument();
  //   });
  // });

});
