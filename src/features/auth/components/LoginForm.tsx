import KraftonJungleLogo from '../../../assets/kj-logo.svg?react';

export default function LoginForm() {
  return (
    <>
      <div className={'h-screen w-full flex justify-center items-center bg-gray-100'}>
        <div className={'w-[40rem] flex flex-col gap-2 py-15 px-20 bg-white rounded-md'}>
          <div className={'flex justify-center'}>
            <KraftonJungleLogo />
          </div>
          <h1 className={'flex m-4 justify-center text-3xl font-bold'}>로그인</h1>
          <div className={'flex items-center gap-4'}>
            <label htmlFor="userId" className={'basis-24'}>
              아이디
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              placeholder="아이디"
              className={'p-2 border-gray-200 bg-gray-50 border-1 flex-1 rounded-md'}
            />
          </div>
          <div className={'flex items-center gap-4'}>
            <label htmlFor="password" className={'basis-24'}>
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              className={'p-2 border-gray-200 bg-gray-50 border-1 flex-1 rounded-md'}
            />
          </div>
          <div className={'flex justify-center items-center'}>
            <button
              type="submit"
              className={'w-full mt-6 py-2 bg-green-600 text-white rounded-md cursor-pointer'}
            >
              로그인
            </button>
          </div>
          <div className={'mt-3 flex justify-center items-center'}>
            <span className={'text-gray-700'}>
              계정이 없으신가요?{' '}
              <button className={'font-[700] text-blue-400 hover:underline cursor-pointer'}>
                가입하기
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
