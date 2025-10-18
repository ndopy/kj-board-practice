import Header from './Header.tsx';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto py-4">
        <Outlet />
      </main>
    </div>
  );
}
