import type { ReactNode } from 'react';
import KraftonJungleLogo from '../../../assets/kj-logo.svg?react';

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
  footer: ReactNode;
}

export default function AuthLayout({ title, children, footer }: AuthLayoutProps) {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="w-[40rem] rounded-md bg-white px-20 py-16">
        <div className="mb-6 flex items-center justify-center gap-4 p-2">
          <KraftonJungleLogo />
          <h1 className="border-l-2 border-gray-300 pl-4 text-3xl font-bold">{title}</h1>
        </div>
        {children}
        <div className="mt-4 text-center">{footer}</div>
      </div>
    </div>
  );
}
