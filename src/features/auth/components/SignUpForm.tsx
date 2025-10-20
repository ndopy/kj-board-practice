import { type FormEvent, useState } from 'react';
import Input from '../../../components/common/Input';
import AuthLayout from './AuthLayout';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUpForm() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const url = 'http://localhost:3000/auth/signup';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        password,
        name
      })
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
      }

      alert(`환영합니다, ${data.name}님!`);
      navigate('/login');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthLayout
      title="회원가입"
      footer={
        <>
          <span className="text-gray-700">이미 계정이 있으신가요? </span>
          <Link to="/login" className="font-bold text-blue-500 hover:underline">
            로그인
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
          label="이름"
          type="text"
          id="name"
          name="name"
          placeholder="이름"
          value={name}
          onChange={e => setName(e.target.value)}
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
        <Input
          label="비밀번호 확인"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="mt-6 w-full cursor-pointer rounded-md bg-green-600 py-2 text-white"
        >
          가입하기
        </button>
      </form>
    </AuthLayout>
  );
}
