import {format} from 'date-fns';

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

  static getRelativeTime(timestamp){
    const now = new Date();
    const postDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now - postDate) / 1000);
  
    const minuteInSeconds = 60;
    const hourInSeconds = 3600;
    const dayInSeconds = 86400;
  
    if (diffInSeconds < minuteInSeconds) {
      return `${diffInSeconds}s ago`;
    } else if (diffInSeconds < hourInSeconds) {
      const minutes = Math.floor(diffInSeconds / minuteInSeconds);
      return `${minutes}m ago`;
    } else if (diffInSeconds < dayInSeconds) {
      const hours = Math.floor(diffInSeconds / hourInSeconds);
      return `${hours}h ago`;
    } else if (diffInSeconds < dayInSeconds * 5) {
      const days = Math.floor(diffInSeconds / dayInSeconds);
      return `${days}d ago`;
    } else {
      return format(postDate, 'EEEE, dd-MMMM-yyyy');
    }
  };
}