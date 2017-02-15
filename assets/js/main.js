require('assets/css/style.scss');
import * as func from 'components/hello.js';
console.log("环境搭建成功");
func.timeout(100).then((value)=> {
    console.log(value);
})

func.getJSON('/post.json').then((json) => {
    console.log('请求成功');
}, (error)=>{
    console.log('出错了', error);
    console.dir(Promise);
});