import React from 'react';
import { List } from 'semantic-ui-react';

const WantedList = ({ list }) => {
  return (
    <List divided relaxed>
      {list.map(({ id, thumbnailImage, authorName, messageBody, beginAt }) => {
        // 각 라인 별 더미 데이터 생성 로직
        const isEyesSelected = authorName !== '김성빈' && Math.random() > 0.5;
        const isParticipating = isEyesSelected && Math.random() > 0.5;
        const eyesCount =
          Math.floor(Math.random() * 5) + (isEyesSelected ? 1 : 0);
        const handsCount =
          Math.floor(Math.random() * 10) + (isParticipating ? 1 : 0);
        const _names = '이상빈 김민겸 김수홍 이형창'
          .split(' ')
          .slice(0, Math.min(handsCount, 3)) // 3 혹은 카운터 이상으로 표시 x
          .map((e) => (Math.random() > 0.5 ? e : '')) // 50% 확률로 선택
          .filter((e) => !!e) // 빈 값 제외
          .join(' '); // 문자열로 반환

        const names =
          _names + (_names.length > 0 && handsCount > 1 ? ' ...' : '');

        return (
          <List.Item className="b-list-item" key={id}>
            <div className="thumb-container">
              <img src={thumbnailImage} className="thumb" alt="thumbnail" />
            </div>
            <List.Content className="b-list-item-content">
              <List.Header className="b-list-item-header">
                {authorName}
              </List.Header>
              <List.Description className="b-list-item-body">
                {messageBody}
              </List.Description>
              <List.Description className="b-list-item-date">
                {beginAt}
              </List.Description>
              <List.Description className="b-list-item-emoji-root-container">
                <div
                  className={`b-list-item-emoji-each-container${
                    isEyesSelected ? '-selected' : ''
                  }`}
                >
                  <span className="ec ec-eyes"></span>
                  <span>{eyesCount}</span>
                </div>
                <div
                  className={`b-list-item-emoji-each-container${
                    isParticipating ? '-selected' : ''
                  }`}
                >
                  <span className="ec ec-raised-hand-with-fingers-splayed"></span>
                  <span>
                    {handsCount} {names}
                  </span>
                </div>
              </List.Description>
            </List.Content>
          </List.Item>
        );
      })}
    </List>
  );
};

export default WantedList;
