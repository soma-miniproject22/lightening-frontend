import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const AddPost = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    return navigate('/add-post');
  };

  return <i className="plus circle icon" id="add_post" onClick={handleClick} />;
};

export default AddPost;
