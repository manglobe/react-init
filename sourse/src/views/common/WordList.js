import React, {
  Component
} from 'react';
import {
  List
} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

class WordList extends Component {
  render() {
    return (
      <div>
        <List>
          <Item extra="2017-10-10" multipleLine align="top" wrap>
          标题文字
            <Brief>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae commodi magni sit! Consequuntur sapiente dolorum eveniet placeat unde tempora optio necessitatibus magnam minus! At, fugiat et? Assumenda culpa, repellendus dicta.</Brief>
          </Item>
        </List>
      </div>
    );
  }
}

export default WordList;