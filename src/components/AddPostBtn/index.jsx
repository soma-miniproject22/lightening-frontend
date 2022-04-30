import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.css';

const AddPostBtn = () => {
  // Router와 Active 상태를 활용해 Toggle 및 이동 구현
  // 이 버튼은 '쓰기' 아이콘과 'X' 아이콘 간의 트랜지션이 있음!
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(false);

  const toggle = () => {
    if (location.pathname === '/') navigate('/addpost');
    else navigate('/');

    setActive((active) => {
      return !active;
    });
  };

  return (
    <div
      className={
        'fixed-action-btn horizontal click-to-toggle spin-close' +
        (active ? ' active' : '')
      }
    >
      <div className="btn-floating btn-large red" onClick={toggle}>
        {/* 번개 모양 아이콘! */}
        {/* emoji --> Font Awesome으로 변경 */}
        <i className="fas fa-bolt"></i>
      </div>
    </div>
  );
};

export default AddPostBtn;
