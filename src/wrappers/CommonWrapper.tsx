import { Outlet } from 'react-router-dom';
import ErrorModal from '../components/ErrorModal/ErrorModal';
import Header from '../components/Header/Header';
import Loader from '../components/Loader/Loader';
import Sidebar from '../components/Sidebar/Sidebar';

export default function CommonWrapper() {
  return (
    <div className="app-layout">
      <Header />
      <div className="content-layout">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <Loader />
      <ErrorModal />
    </div>
  );
}
