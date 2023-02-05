import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="container mx-auto flex flex-col h-screen pt-10">
      <Outlet />
      <footer className="text-center font-bold border-t-2 border-t-black mt-auto mb-4">
        <p>Scandiweb Test Assigment</p>
      </footer>
    </div>
  );
};

export default Layout;
