export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  views: number;
}

export const mockPostsData: Post[] = [
  {
    id: 1,
    title: '리액트(React) 상태 관리 라이브러리 비교',
    content:
      'Zustand, Recoil, Jotai의 장단점을 심도 있게 분석해봅니다. 어떤 프로젝트에 어떤 라이브러리가 적합할까요?',
    createdAt: '2023-10-27 10:30:15',
    updatedAt: '2023-10-27 11:05:00',
    author: '김민준',
    likes: 128,
    comments: 16,
    isLiked: true,
    views: 1532
  },
  {
    id: 2,
    title: 'Next.js 14 버전, 주요 변경점 정리',
    content:
      '이번에 새로 릴리즈된 Next.js 14의 주요 기능과 변경점을 정리했습니다. 서버 액션이 더욱 강력해졌네요!',
    createdAt: '2023-10-26 18:45:30',
    updatedAt: '2023-10-26 18:45:30',
    author: '이서아',
    likes: 256,
    comments: 32,
    isLiked: false,
    views: 3128
  },
  {
    id: 3,
    title: '타입스크립트(TypeScript) 제네릭, 언제 사용해야 할까?',
    content:
      '타입스크립트의 꽃, 제네릭에 대해 알아봅니다. 재사용 가능한 컴포넌트와 함수를 만드는 비법!',
    createdAt: '2023-10-26 14:20:00',
    updatedAt: '2023-10-27 09:10:25',
    author: '박지훈',
    likes: 98,
    comments: 12,
    isLiked: false,
    views: 1245
  },
  {
    id: 4,
    title: '오늘 점심 메뉴 추천 받습니다',
    content: '회사 근처 맛집 아시는 분? 매일 점심 메뉴 고르는 게 일이네요. ㅠㅠ',
    createdAt: '2023-10-25 11:50:45',
    updatedAt: '2023-10-25 11:50:45',
    author: '최유나',
    likes: 5,
    comments: 22,
    isLiked: true,
    views: 354
  },
  {
    id: 5,
    title: 'CSS Grid와 Flexbox, 이제는 둘 다 알아야 합니다',
    content:
      'Flexbox는 1차원, Grid는 2차원 레이아웃을 위해 사용됩니다. 두 가지를 조합하여 복잡한 레이아웃을 쉽게 만들어보세요.',
    createdAt: '2023-10-24 22:10:10',
    updatedAt: '2023-10-24 22:10:10',
    author: '김민준',
    likes: 77,
    comments: 8,
    isLiked: false,
    views: 988
  },
  {
    id: 6,
    title: 'Vite 번들러, 정말 빠를까? Webpack과 비교 후기',
    content:
      '프로젝트에 Vite를 도입해본 후기입니다. 개발 서버 구동 속도가 정말 신세계네요. HMR(Hot Module Replacement) 속도도 만족스럽습니다.',
    createdAt: '2023-10-23 16:00:05',
    updatedAt: '2023-10-23 16:00:05',
    author: '이서아',
    likes: 150,
    comments: 25,
    isLiked: true,
    views: 2241
  },
  {
    id: 7,
    title: 'useEffect의 무한 루프에서 탈출하기',
    content:
      '의존성 배열(dependency array)을 잘못 관리하면 발생하는 무한 루프! 흔히 하는 실수와 해결 방법을 공유합니다.',
    createdAt: '2023-10-22 13:30:00',
    updatedAt: '2023-10-22 15:00:40',
    author: '박지훈',
    likes: 201,
    comments: 41,
    isLiked: true,
    views: 2876
  },
  {
    id: 8,
    title: '요즘 개발자 노트북 뭐 쓰시나요?',
    content: 'M2 맥북 에어와 그램 사이에서 고민 중입니다. 선배님들의 조언을 구합니다!',
    createdAt: '2023-10-21 09:05:12',
    updatedAt: '2023-10-21 09:05:12',
    author: '최유나',
    likes: 33,
    comments: 50,
    isLiked: false,
    views: 768
  },
  {
    id: 9,
    title: 'Tailwind CSS, 호불호가 갈리는 이유',
    content:
      'HTML이 지저분해진다는 단점에도 불구하고 왜 많은 개발자들이 Tailwind CSS를 선택할까요? 생산성 측면에서 고찰해봅니다.',
    createdAt: '2023-10-20 17:55:00',
    updatedAt: '2023-10-20 17:55:00',
    author: '김민준',
    likes: 89,
    comments: 19,
    isLiked: false,
    views: 1102
  },
  {
    id: 10,
    title: '첫 프로젝트 배포 후기 (feat. Vercel)',
    content:
      '드디어 첫 토이 프로젝트를 Vercel로 배포했습니다. 클릭 몇 번으로 배포가 되다니 정말 편리하네요. 다음 목표는 AWS에 직접 배포해보기입니다.',
    createdAt: '2023-10-19 23:40:21',
    updatedAt: '2023-10-19 23:40:21',
    author: '정다은',
    likes: 312,
    comments: 60,
    isLiked: true,
    views: 5420
  }
];
