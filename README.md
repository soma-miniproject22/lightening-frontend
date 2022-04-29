# 소마 번개 프론트엔드 [LIVE](https://unique-tartufo-15163a.netlify.app/)

## [ver 0.0.1]

사용 중인 리소스:

- Semantic UI
- IBM Plex Sans (Google Web Fonts)
- icongr.am: https://icongr.am/ - 아이콘 하나 단위로 이미지로 가져오는 사이트
- Font Awesome 5 (`/css`, `/webfonts`)

### TODO

- [x] 글쓰기 페이지
- [ ] 스와이프 UX ( 스와이프 애니메이션, 배경 그레디언트, 아이콘 표시, 토글 가능 )
- [ ] 헤더에 로그인 버튼 배치 및 API 연동
- [ ] 헤더에서 로그인 여부에 따라 분기 - (버튼 | 사용자 이름+프사) 배치

### Additional TODO

- [ ] FAB 버튼 상태의 전역 관리 필요 (Context ?)
- [ ] (스와이프 구현 이후) 스와이프 UX의 분기 필요 (closed된 경우 이미 신청했던 걸 취소만 가능)
- [ ] 필터바 개발
- [ ] 글쓰기 페이지 UX 개선
- [ ] 페이지 간 트랜지션 ( 관련 Lib 사용 )
- [ ] 로그인 상태 영구 보관/하이드레이션 필요 ( redux-persist 같이, 최소한 JWT 세션 동안은 로그인 유지 + 탭 간 유지 가능해야 )
- [ ] 로그아웃 제공 필요할듯
- [ ] 알람 기능 연동 필요

### 페이지 흐름도

소셜 로그인 페이지 > 목록 페이지(+필터) > 상세 페이지

### API

- 소셜 로그인
- 글쓰기
- 글 목록 조회 (필터, 페이지네이션)
- 관심/참여 toggle
- My Info API / Redirect QueryString
  ```java
   private String nickname; // 사용자 이름
   private String thumbnailURL; // 섬네일 경로
   private String providerId; // oauth2 id (그냥 유니크)
  ```
  리다이렉션 예시
  `ex) http://{API_SERVER}/redirect?access_token=fooooooo&redirect=http://{FRONT_SERVER}`

### 기본 기능

로그인

글 CRUD

- 필터링 포함 - 전체(필터x), 마감된 거 숨기기(기본), 종류,
- 목록 조회 시 사진(섬네일) 표시 - (`WantedList` 컴포넌트)

댓글 CRUD (QnA)

- (ex) `제가 5분 정도 늦을 것 같아요 ㅠㅠ`

참석 여부 표시

- :white_check_mark: : 참석
- :eyes: : 관심

### 게시글 필드 정리

- 내용: string
- [UI 표시o] 약속 시각(required): (enum(Dropdown - 프론트 only) | dattime(Picker)) -> string
- [UI 노출x] 게시 종료 시각(required):datetime -> 마감 시각 -> datetime [보관만 하면 됨!]
- 종류(required): string - enum(밥|커피|술|게임|기타) - 기본값 - '밥'
- 모집 최대 인원(required): number - 기본은 제한 없음(1024) - 제한이 없으면 표시는 x. 제한 있으면 손바닥 옆에.
- 모집 상태(계산된 필드): enum(모집중|모집완료) - 모집 인원이 차거나 약속 시간이 지나면 '모집 완료'로 자동으로 변경
- '관심(=좋아요)' 인원 목록 (id, name)
- '참여' 인원 목록 (id, name)

### 지금은 없는 거

- 글 수정
- 댓글
- 글 삭제 ---> 운영자에게 문의...
- 내가 쓴 글 표시
- 친구 이름 표시

### 기타 결정 내용

- Mobile UI 먼저 만들기
- 글 작성 시 Placeholder 제공하기 (ex: `이렇게 글을 쓰면 더 좋아요!`)
- 추후 PWA 기반 알림을 제공할 수 있음
- 스와이핑 넣는다면, 튜토리얼 overlay 이미지 보여주기 (첫 방문 시)
- 사진은 프사로.
