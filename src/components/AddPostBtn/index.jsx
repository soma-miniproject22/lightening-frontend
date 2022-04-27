import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const AddPostBtn = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    return navigate('/addpost');
  };

  return <i className="plus circle icon" id="add_post" onClick={handleClick} />;
};

export default AddPostBtn;
