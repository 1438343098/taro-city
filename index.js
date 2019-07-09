import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import dataCity from "./dataCity"
import './index.less'
let shen = []
let shi = []
let qu = []
 // 市
 for(let is in dataCity[340000]){
    shi.push(dataCity[340000][is])
}
// 区
for(let is in dataCity[340100]){
    qu.push(dataCity[340100][is])
}
// 省
dataCity[86].map(item=>{
    shen.push(item.address)
})
// 当前省
let indexsheng = '340000'
// 当前市
let indexshi = '340100'

export default class PagePicker extends Component {
    
    state = {
      selector: [shen,shi,qu],
      selectorChecked: ['安徽'+this.props.Division,"合肥"+this.props.Division,"瑶海"],
    }
    
    onChange = e => {

        this.setState({
          selectorChecked: [this.state.selector[0][e.detail.value[0]]+this.props.Division,this.state.selector[1][e.detail.value[1]]+this.props.Division,this.state.selector[2][e.detail.value[2]]]
        },()=>{
            this.props.getCity(this.state.selectorChecked);
        })
      }
      onColumnChange = e => {
        let indexVal = e.detail
        // 如果为第一个把后面两个改变,最后一个选第二个的第一个，第一个继承之前的
        // 如果为第二个则把最后一个改变，第一个第二继承之前的
        // 如果为第三个则不作任何改变
        
        
        if(indexVal.column == 0){
            let code = dataCity[86][indexVal.value].code
            indexsheng = code;
            let shi = []
            let qu = []
            let one=0
            let codes=""
            for(let is in dataCity[code]){
                if(one == 0){
                    codes = is
                    indexshi = is
                    one++
                }
                shi.push(dataCity[code][is])
            }
            for(let is in dataCity[codes]){
                qu.push(dataCity[codes][is])
            }
            this.setState(old=>{
                return {
                    selector:[old.selector[0],shi,qu] 
                }
            })
        }else if(indexVal.column == 1){
            let shi = []
            let qu = []
            for(let is in dataCity[indexsheng]){
                shi.push(is)
                indexshi=shi[indexVal.value]
            }
            for(let is in dataCity[indexshi]){
                qu.push(dataCity[indexshi][is])
            }
            this.setState(old=>{
                return {
                    selector:[old.selector[0],old.selector[1],qu] 
                }
            })
        }
      }
      componentDidMount(){
        this.props.getCity(this.state.selectorChecked);
      }
  render () {
      return (
          <View>
            <Picker mode='multiSelector'  range={this.state.selector} onColumnChange={this.onColumnChange} onChange={this.onChange}>
                <View className='pickerCity'>
                  <Text>地址</Text> <Text>{this.state.selectorChecked}</Text>
                </View>
              </Picker>
          </View>
      )
    }
}