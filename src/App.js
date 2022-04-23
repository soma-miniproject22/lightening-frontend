import './App.css';
import WantedList from './components/WantedList';

// 이미지는 추후 백엔드/CDN에서 이미지 주소를 전달 받아야.
import coffee from './assets/img/coffee.png';
import kSoup from './assets/img/k-soup.png';

const tempOriginal = [
  {
    thumbnailImage: kSoup,
    authorName: '김성빈',
    messageBody: `나는 배가 고프다 ! 나는 배가 고프다 ! 나는 배가 고프다 ! 나는 배가
    고프다 ! 나는 배가 고프다 ! 나는 배가 고프다 ! 나는 배가 고프다 !
    나는 배가 고프다 ! 나는 배가 고프다 ! 나는 배가 고프다 ! 나는 배가
    고프다 ! 나는 배가 고프다 ! 나는 배가 고프다 ! 나는 배가 고프다 !
    나는 배가 고프다 ! 나는 배가 고프다 ! 나는 배가 고프다 ! 나는 배가
    고프다 ! 나는 배가 고프다 ! 나는 배가 고프다 ! 나는 배가 고프다 !
    나는 배가 고프다 ! 나는 배가 고프다 ! 나는 배가 고프다 ! 나는 배가
    고프다 !`,
    beginAt: '오늘 오후 1시',
  },
  {
    id: 2,
    thumbnailImage: coffee,
    authorName: '김성빈',
    messageBody: '소마 센터 주변에 맛있는 카페 탐방하러 가요',
    beginAt: '다음 주 수요일(4/27) 오후 2시',
  },
  {
    id: 3,
    thumbnailImage: coffee,
    authorName: '김성빈',
    messageBody: "카페에서 객체지향 얘기하실 분 구합니다 '-'",
    beginAt: '상시 예약 문의',
  },
];

// 대충 늘리기 위함 ㅠㅠ
const tempWantedListData = [
  ...tempOriginal,
  ...tempOriginal.map((e) => ({ ...e, id: e.id * 2 })),
  ...tempOriginal.map((e) => ({ ...e, id: e.id * 3 })),
  ...tempOriginal.map((e) => ({ ...e, id: e.id * 4 })),
  ...tempOriginal.map((e) => ({ ...e, id: e.id * 5 })),
];

function App() {
  return (
    <div className="App">
      <WantedList list={tempWantedListData} />
    </div>
  );
}

export default App;
