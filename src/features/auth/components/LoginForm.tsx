import { type FormEvent, useState } from 'react';
import Input from '../../../components/common/Input';
import AuthLayout from './AuthLayout';
import { Link } from 'react-router-dom';

export default function LoginForm() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ userId, password });
    // TODO: 로그인 API 연동
  };

  return (
    <AuthLayout
      title="로그인"
      footer={
        <>
          <span className="text-gray-700">계정이 없으신가요? </span>
          <Link to="/signup" className="font-bold text-blue-500 hover:underline">
            가입하기
          </Link>
        </>
      }
    >
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
      </form>
    </AuthLayout>
  );
}
