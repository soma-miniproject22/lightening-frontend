import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Input, Button, Dropdown } from 'semantic-ui-react';
import Api from '../api';
import NavBar from '../components/ListNavBar';
import { UserContext } from '../store/user-context';

const appointmentOptions = [
  {
    key: '1',
    text: '1시간 후',
    value: 1,
  },
  {
    key: '2',
    text: '2시간 후',
    value: 2,
  },
  {
    key: '3',
    text: '3시간 후',
    value: 3,
  },
  {
    key: '4',
    text: '4시간 후',
    value: 4,
  },
];

const postTagOptions = [
  {
    key: '1',
    text: '밥',
    value: 'MEAL',
  },
  {
    key: '2',
    text: '커피',
    value: 'COFFEE',
  },
  {
    key: '3',
    text: '술',
    value: 'ALCOHOL',
  },
  {
    key: '4',
    text: '게임',
    value: 'GAME',
  },
  {
    key: '5',
    text: '기타',
    value: 'ETC',
  },
];

const AddPost = () => {
  const { accessToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    content: '',
    appointmentDate: '',
    postTag: '',
    maxCount: '',
  });

  const handleSubmit = (e) => {
    console.log(e);
    let tempdate = new Date();
    tempdate.setHours(tempdate.getHours() + values.appointmentDate);
    let tempvalue = { ...values };
    tempvalue['appointmentDate'] += '시간 후';
    Api.pushPost(
      {
        ...tempvalue,
        recruitEndDate: tempdate.toISOString().replace('Z', '+09:00'),
      },
      accessToken,
    ).then((res) => {
      navigate('/');
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSearchChange = (e, data) => {
    const { name, value } = data;
    setValues({ ...values, [name]: value });
  };

  return (
    <>
      <NavBar />
      <Container fluid>
        <Input
          fluid
          placeholder="내용"
          name="content"
          onChange={handleChange}
        />
        <Dropdown
          fluid
          selection
          placeholder="약속 시간"
          options={appointmentOptions}
          name="appointmentDate"
          onChange={handleSearchChange}
        />
        {/* <Input
          fluid
          placeholder="약속 시각"
          type="datetime-local"
          id="appointmentDate"
          onChange={handleChange}
        /> */}
        <Dropdown
          fluid
          selection
          placeholder="태그 종류"
          options={postTagOptions}
          name="postTag"
          onChange={handleSearchChange}
        />
        <div>
          <Input
            fluid
            type="number"
            placeholder="모집최대인원"
            name="maxCount"
            min="1"
            max="99"
            onChange={handleChange}
          />
        </div>

        <Button fluid color="blue" onClick={handleSubmit}>
          올리기
        </Button>
      </Container>
    </>
  );
};

export default AddPost;
