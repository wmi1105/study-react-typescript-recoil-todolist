import moment from "moment";

//날짜 포맷
export function dateFormat(date, format) {
    if (!date) date = new Date();
    if (!format) format = "YYYY-MM-DD";
  
    return moment(date).format(format);
  }