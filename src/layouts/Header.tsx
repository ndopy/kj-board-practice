import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          MyBoard
        </Link>
        <nav>
          <Link to="/posts" className="text-gray-600 hover:text-gray-900 px-3">
            게시판
          </Link>
        </nav>
      </div>
    </header>
  );
}
