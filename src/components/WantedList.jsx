import React from 'react';
import { List } from 'semantic-ui-react';

const WantedList = ({ list }) => {
  return (
    <List divided relaxed>
      {list.map(({ id, thumbnailImage, authorName, messageBody, beginAt }) => {
        return (
          <List.Item className="b-list-item" key={id}>
            <div className="thumb-container">
              <img src={thumbnailImage} className="thumb" alt="thumbnail" />
            </div>
            <List.Content className="b-list-item-content">
              <List.Header className="b-list-item-header">
                {authorName}
              </List.Header>
              <div>{messageBody}</div>
              <List.Description>{beginAt}</List.Description>
            </List.Content>
          </List.Item>
        );
      })}
    </List>
  );
};

export default WantedList;
