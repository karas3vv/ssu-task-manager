import { Outlet } from 'react-router-dom';
import ErrorModal from '../components/ErrorModal/ErrorModal';
import Header from '../components/Header/Header';
import Loader from '../components/Loader/Loader';

export default function CommonWrapper() {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content main-content--full">
        <Outlet />
      </main>
      <Loader />
      <ErrorModal />
    </div>
  );
}
