# 소마 번개 프론트엔드

## [ver 0.0.1]

사용 중인 리소스:

- Emoji CSS: https://ionicabizau.github.io/emoji.css/
- Semantic UI
- IBM Plex Sans (Google Web Fonts)

### TODO

화면 레이아웃 초안 만들기

API 초안 작성하기

### 페이지 흐름도

소셜 로그인 페이지 > 목록 페이지(+필터) > 상세 페이지

### 기본 기능

로그인

글 CRUD

- 필터링 포함
- 목록 조회 시 사진(섬네일) 표시 - (`WantedList` 컴포넌트)

댓글 CRUD (QnA)

- (ex) `제가 5분 정도 늦을 것 같아요 ㅠㅠ`

참석 여부 표시

- :white_check_mark: : 참석
- :eyes: : 관심

### 게시글 필드 정리

- 제목: string
- 장소(optional): string - 추후 지도 상의 위치로 변경될 수 있음
- 약속 시각: datetime
- 종류: enum(밥|커피|술)
- 모집 인원: number
- 모집 상태: enum(모집중|모집완료) - 모집 인원이 차거나 약속 시간이 지나면 '모집 완료'로 자동으로 변경

### 기타 결정 내용

- Mobile UI 먼저 만들기
- 글 작성 시 Placeholder 제공하기 (ex: `이렇게 글을 쓰면 더 좋아요!`)
- 추후 PWA 기반 알림을 제공할 수 있음
