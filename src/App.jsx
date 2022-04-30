import { useEffect } from 'react';
// import Api from './api';

import WantedList from './components/WantedList';
import ListNavBar from './components/ListNavBar';

// 이미지는 추후 백엔드/CDN에서 이미지 주소를 전달 받아야.
import coffee from './assets/img/coffee.png';
import kSoup from './assets/img/k-soup.png';
import board2 from './assets/img/board2.jpg';
import subway from './assets/img/subway.png';
import walk from './assets/img/walk.jpg';

const tempOriginal = [
  {
    id: 1,
    thumbnailImage: kSoup,
    authorName: '김수홍',
    messageBody: `없어서 만드는 뜨끈한 국밥 팟`,
    beginAt: '오늘 오후 1시',
  },
  {
    id: 2,
    thumbnailImage: subway,
    authorName: '이상빈',
    messageBody: '바로 앞 서브웨이',
    beginAt: '오늘 저녁',
  },
  {
    id: 3,
    thumbnailImage: coffee,
    authorName: '이형창',
    messageBody: '스벅에 같이 커피 뽑으러 가실분',
    beginAt: '지금',
  },
  {
    id: 4,
    thumbnailImage: board2,
    authorName: '김민겸',
    messageBody: '보드게임 4~8인 파티 (초보만)',
    beginAt: '오늘 저녁 먹고',
  },
  {
    id: 5,
    thumbnailImage: walk,
    authorName: '김성빈',
    messageBody: '선릉 한바퀴 산책',
    beginAt: '오늘 중',
  },
];

// 대충 늘리기 위함 ㅠㅠ
const tempWantedListData = [0, 1, 2, 3, 4, 5].reduce((prev, idx) => {
  const t = tempOriginal.map((e) => ({
    ...e,
    id: e.id + (tempOriginal.length + 1) * idx,
  }));
  return [...prev, ...t];
}, []);

function App() {
  useEffect(() => {
    // console.log(Api.getPosts()); // TODO: Post 업데이트
  }, []);
  return (
    <div className="App">
      <ListNavBar />
      <WantedList list={tempWantedListData} />
    </div>
  );
}

export default App;
