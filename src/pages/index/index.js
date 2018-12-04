import Taro, { Component, getLocation } from '@tarojs/taro'
import { Map, View, CoverView, CoverImage } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { wxmap_reverseGeocoder } from '../../libs/wxmap_api'
import Utils from '../../utils'
import { pileService } from '../../services'
import userIconImage from '../../assets/user-icon.png'
import locationIcon from '../../assets/location-icon.png'
import centerIcon from '../../assets/center-icon.png'
import findPileIcon from '../../assets/find-pile.png'
import findIcon from '../../assets/find-icon.png'
import startIcon from '../../assets/start-icon.png'
import endIcon from '../../assets/end-icon.png'

import './index.less';

class Index extends Component {
  constructor() {
    super();
    this.mapCtx = Taro.createMapContext('map');
    this.state = {
      longitude: '',    // 经度
      latitude: '',     // 纬度
      nowCity: '北京',
      address: '',      // 当前位置名称
    }
  }

  // config = {
  //   navigationBarTitleText: '首页'
  // }

  async componentDidMount () {
    await this.nowLocation();
    const res = await pileService.fectchPileList({})
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  /**
   * 获取当前位置
   */
  async nowLocation () {
    const { dispatch } = this.props;
    let res;
    // 获取当前位置坐标
    try {
      res = await getLocation({type: 'gcj02'});
    } catch (err) {
      console.log('indexPage nowLocation error', err);
      return;
    }
    // 获取当前位置名称
    const address = await this.getNowLocationAddress(res.longitude, res.latitude);
    this.setState({
      longitude: res.longitude,
      latitude: res.latitude,
      address
    })
    const payload = {
      longitude: res.longitude,
      latitude: res.latitude
    }
    // 保存到location
    Utils.setStorage({ key: 'youke_test', data: payload})
    // 保存当前位置到store
    dispatch({ type: 'SET_LOCATION_WATCH', payload })
  }

  /**
   * 获取当前位置名称
   */
  async getNowLocationAddress (longitude, latitude) {
    let res;
    try {
      res = await wxmap_reverseGeocoder({location: {
        latitude,
        longitude
      }})
    } catch (err) {
      console.log('indexPage getNowLocationAddress error', err);
      return;
    }
    return res.result.address;
  }

  /**
   * 地图视野回到当前定位点
   */
  moveToLoaction () {
    this.mapCtx.moveToLocation();
  }

  navigateToSeek () {
    console.log('navigateToSeek');
  }

  /**
   * 点击标记点 
   */ 
  async onClickMarkerTap () {
    console.log('标记点')
  }

  /**
   * 地图视野发生变化时
   */
  onChangeRegion () {
    // console.log('视野变化')
  }

  render () {
    const { longitude, latitude, nowCity, address } = this.state;
    return (
      <View>
        <Map
          id='map' 
          longitude={longitude}
          latitude={latitude} 
          scale='14' 
          // markers={markers}
          onmarkertap={this.onClickMarkerTap.bind(this)}
          onregionchange={this.onChangeRegion.bind(this)}  
          show-location
          className='index-map'
        >
          <CoverView className='cover-view-top'>
            <CoverView className='cover-view-top-city'>{nowCity}</CoverView>
            <CoverImage 
              className='cover-view-top-icon' 
              src={userIconImage} 
              // bindtap='navigateToMine'
            />
          </CoverView>
          <CoverImage className='cover-view-location-icon' src={locationIcon} />
          <CoverImage 
            className='cover-view-center-icon'
            src={centerIcon}
            onClick={this.moveToLoaction.bind(this)}
          />
          <CoverView className='cover-view-find' bindtap='navigateToFind'>
            <CoverView className='cover-view-top-txt'>
              <CoverImage className='cover-view-find-pile-icon' src={findPileIcon} />
              <CoverView className='cover-view-find-pile-txt'>发现新电桩了吗？向我们上报吧~</CoverView> 
            </CoverView>
            <CoverImage className='cover-view-find-icon' src={findIcon} />
          </CoverView>
          <CoverView className='cover-view-address'>
            <CoverView className='cover-view-address-center'>
              <CoverView className='cover-view-address-start'>
                <CoverImage className='cover-view-address-start-icon' src={startIcon} />
                <CoverView className='cover-view-address-start-txt'>{address}</CoverView>
              </CoverView>
              <CoverView className='cover-view-address-line'></CoverView>
              <CoverView className='cover-view-address-end' onClick={this.navigateToSeek.bind(this)}>
                <CoverImage className='cover-view-address-end-icon' src={endIcon} />
                <CoverView className='cover-view-address-end-txt'>您要去哪</CoverView>
              </CoverView>
            </CoverView>
          </CoverView>
        </Map>
      </View>
    )
  }
}

function mapStateToProps({ AppStore }) {
  return {
    AppStore,
  };
}
const mapDispatchToProps = (dispatch) => ({dispatch});
export default connect(mapStateToProps, mapDispatchToProps)(Index);
