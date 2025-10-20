import { type ChangeEvent, type FormEvent, useState } from 'react';
import Input from '../../../components/common/Input';
import AuthLayout from './AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.tsx';

export default function LoginForm() {
  const { login } = useAuth();
  const [form, setForm] = useState({
    userId: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // 이전 에러 메시지 초기화

    const url = 'http://localhost:3000/auth/login';
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(form)
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        // 서버에서 내려주는 에러 메시지를 사용하거나 기본 메시지를 표시합니다.
        // alert(data.message || '로그인에 실패했습니다.');
        throw new Error(data.message || '로그인에 실패했습니다.');
      }

      login(data);
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
      console.error(err);
    }
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
          value={form.userId}
          onChange={handleChange}
          required
        />
        <Input
          label="비밀번호"
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

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
