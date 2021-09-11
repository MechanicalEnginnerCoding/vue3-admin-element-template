var e=Object.defineProperty,a=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,r=(a,t,s)=>t in a?e(a,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):a[t]=s;import{_ as i}from"./index.52e00964.js";import{_ as o}from"./index.f854f60c.js";import{al as n,an as l,$ as c,a0 as p,a2 as x,o as d,a as m,a3 as y,a7 as u,ae as h,b}from"./vendor.dc16c2e2.js";const g={components:{Descrition:i,Echarts:o},setup(){const e=n({xAxis:{type:"category",data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},yAxis:{type:"value"},series:[{data:[120,200,150,80,70,110,130],type:"bar"}],tooltip:{trigger:"axis"},calculable:!0,xAxis2:[{type:"category",data:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]}],yAxis2:[{type:"value"}],series2:[{name:"蒸发量",type:"bar",data:[2,4.9,7,23.2,25.6,76.7,135.6,162.2,32.6,20,6.4,3.3],markPoint:{data:[{type:"max",name:"最大值"},{type:"min",name:"最小值"}]},markLine:{data:[{type:"average",name:"平均值"}]}},{name:"降水量",type:"bar",data:[2.6,5.9,9,26.4,28.7,70.7,175.6,182.2,48.7,18.8,6,2.3],markPoint:{data:[{name:"年最高",value:182.2,xAxis:7,yAxis:183},{name:"年最低",value:2.3,xAxis:11,yAxis:3}]},markLine:{data:[{type:"average",name:"平均值"}]}}],grid:{top:"24px",right:"18px",left:0,bottom:0,containLabel:!0}});return((e,i)=>{for(var o in i||(i={}))t.call(i,o)&&r(e,o,i[o]);if(a)for(var o of a(i))s.call(i,o)&&r(e,o,i[o]);return e})({},l(e))}};c("data-v-40b281d7");const f={class:"echarts-container"},A=h(" Vue3-admin 推荐使用 "),v=b("a",{href:"https://echarts.apache.org/examples/zh/index.html#chart-type-line",target:"_blank"},"Echarts",-1),_=h(" 作为图表库 ");p(),g.render=function(e,a,t,s,r,i){const o=x("Descrition"),n=x("Echarts"),l=x("el-col"),c=x("el-row");return d(),m("div",f,[y(o,{title:"柱状图 Bar"},{descrition:u((()=>[A,v,_])),_:1}),y(o,{title:"演示",showDesc:!1}),y(c,{gutter:10},{default:u((()=>[y(l,{xs:24,sm:24,md:24,lg:12,xl:12},{default:u((()=>[y(n,{title:"基础柱状图 Basic Bar",headerIcon:"chart-histogram",style:{height:"280px"},options:{series:e.series,xAxis:e.xAxis,yAxis:e.yAxis}},null,8,["options"])])),_:1}),y(l,{xs:24,sm:24,md:24,lg:12,xl:12},{default:u((()=>[y(n,{index:1,title:"某地区蒸发量和降水量",headerIcon:"chart-histogram",style:{height:"280px"},options:{dataset:e.dataset,series:e.series2,xAxis:e.xAxis2,yAxis:e.yAxis2,calculable:e.calculable,grid:e.grid}},null,8,["options"])])),_:1})])),_:1})])},g.__scopeId="data-v-40b281d7";export{g as default};
