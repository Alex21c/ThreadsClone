export default class Utils{
  constructor(){

  }

  static debouce(func, delay){
    let timeOutId = null;
    return function(...args){
      if(timeOutId){
        clearTimeout(timeOutId)
      }
      timeOutId = setTimeout(()=>{
        func.apply(this, args)
      }, delay);
    }
  }
}