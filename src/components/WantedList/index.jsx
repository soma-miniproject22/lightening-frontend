import './index.css';

import React from 'react';
import { List, Popup } from 'semantic-ui-react';
import Api from '../../api';
import interesting from '../../assets/icons/thinkspin.gif';
import handWave from '../../assets/icons/hand_wave.gif';

const CURRENT_CATEGORY = '모두 표시'; // MEAL, COFFEE, ALCOHOL, GAME, ETC
const MAX_NAMES_TO_DISPLAY = 2;

const WantedList = ({ list }) => {
  const handleEye = () => {
    Api.toggleEye().then((res) => {
      if (res) console.log('toggle eye success'); // TODO: update Eye
    });
  };

  const handleHand = () => {
    Api.toggleHand().then((res) => {
      if (res) console.log('toggle handle success'); // TODO: update handle
    });
  };

  return (
    <List divided relaxed className="b-list-root">
      <div className="b-list-root-category-title">{CURRENT_CATEGORY}</div>

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
          .slice(0, Math.min(handsCount, MAX_NAMES_TO_DISPLAY)) // MAX 혹은 카운터 이상으로 표시 x
          .map((e) => (Math.random() > 0.5 ? e : '')) // 50% 확률로 선택
          .filter((e) => !!e) // 빈 값 제외
          .join(' '); // 문자열로 반환

        const names =
          _names + (_names.length > 0 && handsCount > 1 ? ' ...' : '');

        const isClosed = Math.random() < 0.25;

        return (
          <List.Item
            className={'b-list-item' + (isClosed ? ' b-list-item-closed' : '')}
            key={id}
          >
            <img
              src={thumbnailImage}
              className="b-list-item-thumb"
              alt="thumbnail"
            />
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
                  className={
                    'b-list-item-emoji-each-container' +
                    (isEyesSelected ? ' selected' : '')
                  }
                  onClick={handleEye}
                >
                  <Popup
                    trigger={
                      <div>
                        <img
                          className="b-list-item-emoji-interest"
                          src={interesting}
                          alt="interesting"
                        />
                        <span className="b-list-item-emoji-counter">
                          {eyesCount}
                        </span>
                      </div>
                    }
                    content="김성빈 이형창"
                    inverted
                  />
                </div>
                <div
                  className={
                    'b-list-item-emoji-each-container' +
                    (isParticipating ? ' selected' : '')
                  }
                  onClick={handleHand}
                >
                  <Popup
                    trigger={
                      <div>
                        <img
                          className="b-list-item-emoji-handwave"
                          src={handWave}
                          alt="hand wave"
                        />
                        <span className="b-list-item-emoji-counter">
                          {handsCount} {names}
                        </span>
                      </div>
                    }
                    content="김성빈 이형창"
                    inverted
                  />
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
