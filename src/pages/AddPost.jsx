import React from 'react';
import { Container, Input, Button } from 'semantic-ui-react';
import Api from '../Api';
import NavBar from '../components/ListNavBar';

const AddPost = () => {
  const handleSubmit = () => {
    Api.pushPost('input 정보');
  };

  return (
    <>
      <NavBar />
      <Container fluid>
        <Input fluid placeholder="내용" />
        <Input fluid placeholder="약속 시각" />
        <Input fluid placeholder="종류" />
        <Input fluid placeholder="모집최대인원" />

        <Button fluid color="blue" onClick={handleSubmit}>
          올리기
        </Button>
      </Container>
    </>
  );
};

export default AddPost;
