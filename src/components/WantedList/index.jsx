import './index.css';

import React, { useEffect, useContext } from 'react';
import { List, Popup } from 'semantic-ui-react';
import Api from '../../api';
import { UserContext } from '../../store/user-context';

import interesting from '../../assets/icons/thinkspin.gif';
import thinkSpin from '../../assets/icons/thinkspin.gif';
import handWave from '../../assets/icons/hand_wave.gif';

const CURRENT_CATEGORY = '정렬: 기본'; // MEAL, COFFEE, ALCOHOL, GAME, ETC
const MAX_NAMES_TO_DISPLAY = 2;

const WantedList = ({ list }) => {
  const { userInfo, accessToken } = useContext(UserContext);
  const handleEye = (postId, e) => {
    Api.toggleHand(
      {
        postId: postId,
        type: 'WILLING',
      },
      accessToken,
    ).then((res) => {
      if (res) console.log('toggle handle success'); // TODO: update handle
    });
  };

  const handleHand = (postId, e) => {
    Api.toggleHand(
      {
        postId: postId,
        type: 'PARTICIPATE',
      },
      accessToken,
    ).then((res) => {
      if (res) console.log('toggle handle success'); // TODO: update handle
    });
  };

  // 스와이프 이벤트 등록
  // Only once
  // HammerJs가 React ^16.0 이어서 이게 최선...
  useEffect(() => {
    const items = Array.from(
      document.querySelectorAll('.b-list-item.fg:not(.closed)'),
    );

    items.forEach((fgElem) => {
      /* eslint-disable */
      const fg = new Hammer(fgElem);

      fg.on('panmove', (e) => {
        fgElem.style.transitionDuration = '5ms';
        fgElem.style.transitionTimingFunction = 'ease-in-out';
        fgElem.style.transform = `translateX(${e.deltaX}px)`;
      });

      fg.on('panend', () => {
        // console.log('Pan-end evt!');
        fgElem.style.transitionDuration = '500ms';
        fgElem.style.transform = 'translateX(0px)';
      });

      fg.on('swipeleft', (e) => {
        // console.log('swiped [right->left] dragged from right: ', e);
      });
      fg.on('swiperight', (e) => {
        // console.log('swiped [left->right] dragged from left: ', e);
      });
    });
  }, []);

  return (
    <List divided relaxed className="b-list-root">
      <div className="b-list-root-category-title">{CURRENT_CATEGORY}</div>

      {list.map(({ postId, accountImage, nickname, postContent, meetDate, emotions }) => {
        // 각 라인 별 더미 데이터 생성 로직
        const isEyesSelected = emotions.filter( i => i.username === userInfo.username && i.emotionType === 'WILLING').length > 0;
        const isParticipating = emotions.filter( i => i.username === userInfo.username && i.emotionType === 'PARTICIPATE').length > 0;
        const eyesCount = emotions.filter( i => i.emotionType === 'WILLING').length;
        const handsCount = emotions.filter( i => i.emotionType === 'PARTICIPATE').length;
        const _names = emotions.filter( i => i.emotionType === 'PARTICIPATE')
          .slice(0, Math.min(handsCount, MAX_NAMES_TO_DISPLAY)) // MAX 혹은 카운터 이상으로 표시 x
          .map(i=>i.nickname)
          // .map((e) => (Math.random() > 0.5 ? e : '')) // 50% 확률로 선택
          // .filter((e) => !!e) // 빈 값 제외
          .join(' '); // 문자열로 반환

        const names =
          _names + (_names.length > 0 && handsCount > 1 ? ' ...' : '');

        const isClosed = Math.random() < 0.25;

        return (
          <div className="b-list-fg-bg-container" key={postId}>
            <List.Item
              className={'b-list-item bg' + (isClosed ? ' closed' : '')}
            >
              <div>
                <img src={thinkSpin} alt="think spin" className="bg-emoji" />
                <span className="bg-emoji-text">관심!</span>
              </div>
              <div>
                <img src={handWave} alt="hand wave" className="bg-emoji" />
                <span className="bg-emoji-text">참여!</span>
              </div>
            </List.Item>
            <List.Item
              className={'b-list-item fg' + (isClosed ? ' closed' : '')}
              key={postId}
              id="fg"
            >
              <img
                src={accountImage}
                className="b-list-item-thumb"
                alt="thumbnail"
              />
              <List.Content className="b-list-item-content">
                <List.Header className="b-list-item-header">
                  {nickname}
                </List.Header>
                <List.Description className="b-list-item-body">
                  {postContent}
                </List.Description>
                <List.Description className="b-list-footer">
                  <div className="b-list-item-date">{meetDate}</div>
                  <div className="b-list-item-emoji-root-container">
                    <div
                      className={
                        'b-list-item-emoji-each-container' +
                        (isEyesSelected ? ' selected' : '')
                      }
                      onClick={handleEye.bind(this,postId)}
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
                        content={emotions.filter( i => i.emotionType === 'WILLING').map(i=>i.nickname).join(' ')}
                        inverted
                      />
                    </div>
                    <div
                      className={
                        'b-list-item-emoji-each-container' +
                        (isParticipating ? ' selected' : '')
                      }
                      onClick={handleHand.bind(this,postId)}
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
                        content={emotions.filter( i => i.emotionType === 'PARTICIPATE').map(i=>i.nickname).join(' ')}
                        inverted
                      />
                    </div>
                  </div>
                </List.Description>
              </List.Content>
            </List.Item>
          </div>
        );
      })}
    </List>
  );
};

export default WantedList;
