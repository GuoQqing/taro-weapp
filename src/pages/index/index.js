import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import './index.less';

class Index extends Component {

    config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  add() {
    const { dispatch } = this.props;
    dispatch({type:'ADD_SAGA', payload: { a:1 }});
  }

  dec() {
    const { dispatch } = this.props;
    dispatch({type:'MINUS_SAGA', payload: { a:1 }});
  }

  render () {
    return (
      <View className='index'>
        <Button className='add_btn' onClick={this.add}>+</Button>
        <Button className='dec_btn' onClick={this.dec}>-</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>Hello, World</Text></View>
      </View>
    )
  }
}

function mapStateToProps({ counter }) {
  return {
    counter,
  };
}
export default connect(mapStateToProps, (dispatch) => ({dispatch}))(Index);
