import { type FormEvent, useState } from 'react';
import KraftonJungleLogo from '../../../assets/kj-logo.svg?react';
import Input from '../../../components/common/Input';

export default function LoginForm() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ userId, password });
    // TODO: 로그인 API 연동
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="w-[40rem] rounded-md bg-white px-20 py-16">
        <div className="mb-6 flex items-center justify-center gap-4 p-2">
          <KraftonJungleLogo />
          <h1 className="border-l-3 border-gray-700 pl-4 text-3xl font-bold">로그인</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="아이디"
            type="text"
            id="userId"
            name="userId"
            placeholder="아이디"
            value={userId}
            onChange={e => setUserId(e.target.value)}
            required
          />
          <Input
            label="비밀번호"
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="mt-6 w-full cursor-pointer rounded-md bg-green-600 py-2 text-white"
          >
            로그인
          </button>

          <div className="mt-3 text-center">
            <span className="text-gray-700">계정이 없으신가요? </span>
            <a href="/signup" className="font-bold text-blue-500 hover:underline">
              가입하기
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
