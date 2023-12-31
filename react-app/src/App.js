import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ProtectedRoute from './components/auth/ProtectedRoute';
import { LandingPage } from './components/pins/LandingPage/LandingPage';
import { PinDetail } from "./components/pins/PinDetail"
import { UserBoards } from './components/boards/UserBoards/UserBoards';
import { BoardLandingPage } from './components/boards/UserBoards/BoardLandingPage/BoardLandingPage';
import { UserPins } from './components/pins/UserPins';
import { AllComments } from "./components/comments/AllComments";
import { SearchResultsPage } from "./components/pins/SearchResultsPage";
import CreatePinModal from "./components/pins/CreatePinModal";
import { Footer } from "./components/Navigation/Footer/Footer";
import { ExploreBoards } from "./components/boards/ExploreBoards/ExploreBoards";
import  UserProfilePage  from "./components/auth/User/UserProfilePage";

function App() {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/login' exact={true}>
            <LoginFormPage />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignupFormPage />
          </Route>
          <Route exact path="/boards/:boardId">
            <BoardLandingPage />
          </Route>
          <Route exact path="/boards">
            <UserBoards />
          </Route>
          <Route exact path="/comments">
            <AllComments />
          </Route>
          <Route exact path="/pins/current">
            <UserPins />
          </Route>
          <Route exact path="/pins/new">
            <CreatePinModal />
          </Route>
          <Route exact path="/explore">
            <ExploreBoards />
          </Route>
          <Route exact path="/pins/:pinId">
            <PinDetail />
          </Route>
          <Route exact path="/pins/search/:searchInput">
            <SearchResultsPage />
          </Route>
          <Route exact path="/profile">
            <UserProfilePage />
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <ProtectedRoute path='/' exact={true} >
            <h1>My Home Page</h1>
          </ProtectedRoute>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
