
const Observer = function(data) {
    for (let key in data) {
      defineReactive(data, key);
    }
  }
   
const defineReactive = function(obj, key) {
  const dep = new Dep();
  let val = obj[key];
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log('in get');
      dep.depend();
      return val;
    }, 
    set(newVal) {
      if (newVal === val) {
        return;
      }
      val = newVal;
      dep.notify();
    }
  });
}
  
const observe = function(data) {
  return new Observer(data);
}
  
const Vue = function(options) {
  const self = this;
  if (options && typeof options.data === 'function') {
    this._data = options.data.apply(this);
  }
  
  this.mount = function() {
    new Watcher(self, self.render);
  }
  
  this.render = function() {
    with(self) {
      // ...
    }
  }
  
  observe(this._data);  
}
  
const Watcher = function(vm, fn) {
  const self = this;
  this.vm = vm;
  Dep.target = this;
  
  
  this.addDep = function(dep) {
    dep.addSub(self);
  }
  
  this.update = function() {
    fn();
  }
  
  this.value = fn();
  Dep.target = null;
}
  
const Dep = function() {
  const self = this;
  this.target = null;
  this.subs = [];
  
  this.depend = function() {
    if (Dep.target) {
      Dep.target.addDep(self);
    }
  }
  
  this.addSub = function(watcher) {
    self.subs.push(watcher);
  }
  
  this.notify = function() {
    for (let i = 0; i < self.subs.length; i += 1) {
      self.subs[i].update();
    }
  }
}
  







const vue = new Vue({
  data() {
    return {
      text: 'hello world'
    };
  }
})
  
vue.mount(); // in get
vue._data.text = '123';


`with(this){ 
  return _c("div",{id:"app"},_v("xxxx"+_s(msg)+""+_s(arr)+"helloworld"),_c("p",undefined,_v("helloworld"+_s(age)))) 
}`