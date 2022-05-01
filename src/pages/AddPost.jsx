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
  {
    key: '5',
    text: '5시간 후',
    value: 5,
  },
  {
    key: '6',
    text: '6시간 후',
    value: 6,
  },
  {
    key: '7',
    text: '7시간 후',
    value: 7,
  },
  {
    key: '8',
    text: '8시간 후',
    value: 8,
  },
  {
    key: '9',
    text: '9시간 후',
    value: 9,
  },
  {
    key: '10',
    text: '10시간 후',
    value: 10,
  },
  {
    key: '11',
    text: '11시간 후',
    value: 11,
  },
  {
    key: '12',
    text: '12시간 후',
    value: 12,
  },
  {
    key: '13',
    text: '13시간 후',
    value: 13,
  },
  {
    key: '14',
    text: '14시간 후',
    value: 14,
  },
  {
    key: '15',
    text: '15시간 후',
    value: 15,
  },
  {
    key: '16',
    text: '16시간 후',
    value: 16,
  },
  {
    key: '17',
    text: '17시간 후',
    value: 17,
  },
  {
    key: '18',
    text: '18시간 후',
    value: 18,
  },
  {
    key: '19',
    text: '19시간 후',
    value: 19,
  },
  {
    key: '20',
    text: '20시간 후',
    value: 20,
  },
  {
    key: '21',
    text: '21시간 후',
    value: 21,
  },
  {
    key: '22',
    text: '22시간 후',
    value: 22,
  },
  {
    key: '23',
    text: '23시간 후',
    value: 23,
  },
  {
    key: '24',
    text: '24시간 후',
    value: 24,
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
        recruitEndDate: new Date(
          tempdate - tempdate.getTimezoneOffset() * 60 * 1000,
        )
          .toISOString()
          .replace('Z', '+09:00'), //TODO: Fix TImeZone
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
