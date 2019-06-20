import Vue from 'vue';

/**
 * @description 事件总线，在使用时先注册事件，不需要时注销事件
 */
class EventBus {
    constructor() {
        this.vm = new Vue();
        this.eventNames = [];
    }
    // 注册事件
    register(eventname) {
        if(this.eventNames.includes(eventname))
            console.warn(`register error: 已存在的事件名${eventname}`);
        else
            this.eventNames.push(eventname);
    }
    // 注销事件，当cb不传时清除所有的该事件名下的监听器
    off(eventname, cb) {
        
        if(this.eventNames.includes(eventname)) {
            this.vm.$off(eventname, cb);
            const index = this.eventNames.indexOf(eventname);
            this.eventNames.splice(index, 1);
        }
        else
            throw(`off error: 未注册的事件${eventname}`);
    }
    // 监听时间
    on(eventname, cb) {
        if(this.eventNames.includes(eventname))
            this.vm.$on(eventname, cb);
        else 
            throw(`on error: 未注册的事件${eventname}`);
    }
    // 发射事件
    emit(eventname, ...value) {
        if(this.eventNames.includes(eventname))
            this.vm.$emit(eventname, ...value);
        else 
            throw(`emit error: 未注册的事件${eventname}`);
    }   
}

export default EventBus;