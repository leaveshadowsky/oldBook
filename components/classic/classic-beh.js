// 定义behavior行为，和定义组件没什么区别，只是关键字不同，作用是抽象出组件公用的properties，
// function，data和生命周期钩子,
//其他组件继承了behavior后可以复用behavior中的各种属性,behavior是多继承特性
//如behaviors:[beh1,beh2,...hehx]，这就是多继承，如果遇到重名变量，则子组件会优先覆盖
//behavior，若子没定义，则数组最后一个优先级最高
//如果是生命周期钩子，则不会覆盖，会按照数组的开始执行，一直到子组件最后调用完毕
const classicBeh = Behavior({
  properties: {
    img: String,
    content: String,
    //绑定hidden，让自定义组件可以使用hidden属性
    hidden: Boolean
  },
  data: {

  },
  methods: {

  }
})

export {
  classicBeh
}