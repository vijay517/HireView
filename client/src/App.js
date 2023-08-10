import HomePage from "./components/pages/HomePage/HomePage";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import UserSignUpPage from "./components/pages/UserSignUpPage/UserSignUpPage"
import UserTransactionPage from "./components/pages/UserTransactionPage/UserTransactionPage";
import UserProfilePage from "./components/pages/UserProfilePage/UserProfilePage";
import UserHomePage from "./components/pages/UserHomePage/UserHomePage";
import RequestQuotationPage from "./components/pages/RequestQuotationPage/RequestQuotationPage";
import Chat from "./components/pages/PostAQuery/PostAQuery";
import { Routes, Route } from 'react-router-dom';
import PAGES from "./components/enums";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path={PAGES["home-page"]} element={<HomePage />} />
      <Route path={PAGES["login-page"]} element={<LoginPage />} />
      <Route path={PAGES["user-home-page"]} element={<UserHomePage />} />
      <Route path={PAGES["user-sign-up-page"]} element={<UserSignUpPage />} />
      <Route path={PAGES["user-profile-page"]} element={<UserProfilePage />} />
      <Route path={PAGES["user-transactions-page"]} element={<UserTransactionPage />} />
      <Route path={PAGES["user-requestion-quotation-page"]} element={<RequestQuotationPage />} />
      <Route path={PAGES["do-it-yourself-page"]} element={<Chat />} />

    </Routes>
  )
}

export default App;