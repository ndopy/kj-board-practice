import { Link } from 'react-router-dom';

import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/16/solid';

import KraftonJungleLogo from '@/assets/kj-logo.svg?react';

export default function Header() {
  const handleLogout = () => {
    // TODO: 로그아웃 로직 구현
    console.log('Logout clicked');
  };

  return (
    <header className="sticky top-0 left-0 right-0 h-16 bg-white shadow-md z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/posts" className="flex items-center">
          <KraftonJungleLogo className="w-28" />
        </Link>
        <nav className="flex items-center space-x-4">
          <button
            type="button"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 cursor-pointer"
            onClick={handleLogout}
          >
            <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
          </button>
        </nav>
      </div>
    </header>
  );
}
