class Vue{
    constructor(options){
        // 保存数据
        this.$options = options;
        this.$data = options.data;
        this.$el = options.el;
        
        // 将data添加到响应式系统中
        new Observer(this.$data);
        
        // 代理this.$data的数据
        Object.keys(this.$data).foreach(key => {
            this._proxy(key)
        })
        
        // 处理el
        new Compiler(this.$el, this)
    }
    _proxy(key){
        Object.defineProperty(this, key,{
            configurable:true,
            enumerable:true,
            set(newValue){
                this.$data[key] = newValue
            },
            get(){
                return this.$data[key]
            }
        })
    }
}
   
class Observer{
    constructor(data){
        this.data = data;
        // 遍历data中的数据
        Object.keys(data).forEach(key => {
            this.defineReactive(this.data, key, data[key])
        })
    }
    // 定义响应式，添加get和set方法
    defineReactive(data,key,val){
        //一个属性对应一个Dep对象
        const dep = new Dep()
        Object.defineProperty(data, key, {
            configurable:true,
            enumerable:true,
            set(newValue){
                if(newValue === val)
                    return
                val = newValue
                //如何不一样，通知订阅者
                dep.notify()
            },
            get(){
                if(Dep.target){
                    //添加订阅者
                    dep.addSub(Dep.target)
                }
                return val
            }
        })
    }
}

// 依赖者类，订阅者
class Dep{
    constructor(){
        this.subs = []
    }
    
    addSub(sub){
        this.subs.push(sub)
    }
    
    notity(){
        //遍历所有的订阅者，通知更新
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

class Watcher{
    constructor(node, name, vm){
        this.node = node
        this.name = name
        this.vm = vm
        Dep.target = this;
        this.update()
        Dep.target =  null  
        //置空，防止每次调用get的时候重复添加订阅者
    }
    
    update(){
        this.node.nodeValue = this.vm[this.name]
    }
}
// 文本节点{{}}匹配正则表达式
// . 匹配任何内容（除了特殊字符） * 0个或多个  + 1个或多个
const reg = /\{\{(.+)\}\}/
class Compiler{
    // el:app    vm:Vue
    constructor(el, vm){
        this.el = document.querySelector(el)
        this.vm = vm
        
        this.frag = this._createFragment()
        this.el.appendChild(this.frag)
    }
    _createFragment(){
        const frag = document.createDocumentFragment()
        let child
        // 遍历 this.el中的每一个子节点
        while(child = this.el.firstChild){
            this._compile(child)  //编译每一个node节点
            frag.appendChild(child)
        }
        return frag
    }
    
    _compile(node){
        //nodeType = 1 标签节点 
        if(node.nodeType === 1){
            const attrs = node.attributes
            if(attrs.hasOwnProperty('v-model')){
                const name = attrs['v-model'].nodeValue
                node.addEventListener('input', e => {
                    this.vm[name] = e.target.value
                })
            }
        }
        //nodeType = 3 文本节点
        if(node.nodeType === 3){
            if(reg.test(node.nodeValue)){
                const name = RegExp.$1.trim()
                new Watcher(node,name,this.vm)
            }
        }
    }
}

const app = new Vue({
    el:'#app',
    data:{
        message:'你好啊'
    }
})