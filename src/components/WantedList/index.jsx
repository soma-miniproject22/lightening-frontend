import './index.css';

import React, { useEffect, useContext, useState } from 'react';
import { List, Popup, Segment, Button } from 'semantic-ui-react';
import Api from '../../api';
import { UserContext } from '../../store/user-context';

import interesting from '../../assets/icons/thinkspin.gif';
import thinkSpin from '../../assets/icons/thinkspin.gif';
import handWave from '../../assets/icons/hand_wave.gif';

// const CURRENT_CATEGORY = '정렬: 기본'; // MEAL, COFFEE, ALCOHOL, GAME, ETC
const MAX_NAMES_TO_DISPLAY = 2;

const WantedList = () => {
  const { userInfo, accessToken } = useContext(UserContext);
  const [category, setCategory] = useState('ALL');
  let [wantedListData, setWantedListData] = useState([]);

  useEffect(() => {
    Api.getPosts({
      tag: category === 'ALL' ? null : category,
      page: 0,
      size: 1000,
      sort: 'date,desc', // date ,desc
    }).then((res) => {
      setWantedListData(res.content);
    });
  }, [category]);
  // eslint-disable-next-line no-unused-vars
  const toggleEye = (postId) => {
    Api.toggleEye(
      {
        postId: postId,
        type: 'WILLING',
      },
      accessToken,
    ).then((res) => {
      if (res) console.log('toggle handle success'); // TODO: update handle
    });
  };
  // eslint-disable-next-line no-unused-vars
  const toggleHand = (postId) => {
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

  const toggleFilter = (e) => {
    setCategory(e.target.name);
  };
  // 스와이프 이벤트 등록
  // Only once
  // HammerJs가 React ^16.0 이어서 이게 최선...
  useEffect(() => {
    if (!wantedListData || wantedListData.length === 0) return;

    // 그냥 closed 도 되게 함.
    // 어차피 신청한 경우도 뺄 수 있어야 하니까.
    const items = Array.from(document.querySelectorAll('.b-list-item.fg'));

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
        this.toggleEye(e.target.name);
        console.log('swiped [right->left] dragged from right: ', e);
      });
      fg.on('swiperight', (e) => {
        this.toggleHand(e.target.name);
        // console.log('swiped [left->right] dragged from left: ', e);
      });
    });
  }, [wantedListData]);

  return (
    <List divided relaxed className="b-list-root">
      <div className="b-list-root-category-title">    
        <Segment>
          <Button.Group fluid>
            <Button toggle name="ALL" active={ "ALL" == category } onClick={toggleFilter}>
              ALL
            </Button>
            <Button toggle name="MEAL" active={ "MEAL" == category } onClick={toggleFilter}>
              MEAL
            </Button>
            <Button toggle name="COFFEE" active={ "COFFEE" == category } onClick={toggleFilter}>
              COFFEE
            </Button>
            <Button toggle name="ALCOHOL" active={ "ALCOHOL" == category } onClick={toggleFilter}>
              ALCOHOL
            </Button>
            <Button toggle name="GAME" active={ "GAME" == category } onClick={toggleFilter}>
              GAME
            </Button>
            <Button toggle name="ETC" active={ "ETC" == category } onClick={toggleFilter}>
              ETC
            </Button>
          </Button.Group>
        </Segment>
      </div>
      {wantedListData.map(
        ({
          postId,
          accountImage,
          nickname,
          postContent,
          meetDate,
          emotions,
          recruitEndDate
        }) => {
          // 각 라인 별 더미 데이터 생성 로직
          const isEyesSelected =
            emotions.filter(
              (i) =>
                i.username === userInfo.username && i.emotionType === 'WILLING',
            ).length > 0;
          const isParticipating =
            emotions.filter(
              (i) =>
                i.username === userInfo.username &&
                i.emotionType === 'PARTICIPATE',
            ).length > 0;
          const eyesCount = emotions.filter(
            (i) => i.emotionType === 'WILLING',
          ).length;
          const handsCount = emotions.filter(
            (i) => i.emotionType === 'PARTICIPATE',
          ).length;
          const _names = emotions
            .filter((i) => i.emotionType === 'PARTICIPATE')
            .slice(0, Math.min(handsCount, MAX_NAMES_TO_DISPLAY)) // MAX 혹은 카운터 이상으로 표시 x
            .map((i) => i.nickname)
            // .map((e) => (Math.random() > 0.5 ? e : '')) // 50% 확률로 선택
            // .filter((e) => !!e) // 빈 값 제외
            .join(' '); // 문자열로 반환

          const names =
            _names + (_names.length > 0 && handsCount > 1 ? ' ...' : '');

          const isClosed = new Date() < recruitEndDate;

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
                        onClick={toggleEye.bind(this, postId)}
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
                          content={emotions
                            .filter((i) => i.emotionType === 'WILLING')
                            .map((i) => i.nickname)
                            .join(' ')}
                          inverted
                        />
                      </div>
                      <div
                        className={
                          'b-list-item-emoji-each-container' +
                          (isParticipating ? ' selected' : '')
                        }
                        onClick={toggleHand.bind(this, postId)}
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
                          content={emotions
                            .filter((i) => i.emotionType === 'PARTICIPATE')
                            .map((i) => i.nickname)
                            .join(' ')}
                          inverted
                        />
                      </div>
                    </div>
                  </List.Description>
                </List.Content>
              </List.Item>
            </div>
          );
        },
      )}
    </List>
  );
};

export default WantedList;
