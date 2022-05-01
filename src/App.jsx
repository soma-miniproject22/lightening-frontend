import { useEffect, useState } from 'react';
import Api from './api';

import WantedList from './components/WantedList';
import ListNavBar from './components/ListNavBar';

function App() {
  // eslint-disable-next-line no-unused-vars
  let [wantedListData, setWantedListData] = useState([]);
  useEffect(() => {
    Api.getPosts({
      page: 0,
      size: 10,
      sort: 'date', // date ,desc
    }).then((res) => {
      setWantedListData(res.content);
    });
  }, []);
  return (
    <div className="App">
      <ListNavBar />
      <WantedList list={wantedListData} />
    </div>
  );
}

export default App;
