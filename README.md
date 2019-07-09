# taro-city
把3个文件放入一个文件夹，  

例如 放入一个叫 cityPicker的文件




```javascript
引入文件
import Citypicker from "../../components/cityPicker"
使用 
<Citypicker Division=" - " getCity={this.cityEnd.bind(this)}></Citypicker>

Division  是这两个地址之间分割的方式
getCity  进入时返回一次数据 确定时放回一次数据

第一个参数就是返回的地址 带有你的分隔符
  cityEnd(city){
    console.log(city)
  }


```

