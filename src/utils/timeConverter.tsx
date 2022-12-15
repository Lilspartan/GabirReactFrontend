export default function timeConverter(UNIX_timestamp:number) {
  var a = new Date(UNIX_timestamp * 1000);;
	var year = a.getFullYear();
	var month = a.getMonth() + 1 < 10 ? "" + String(a.getMonth() + 1) : String(a.getMonth() + 1);
	var date = "0" + a.getDate();
	var hour = "0" + a.getHours();
	var min = "0" + a.getMinutes();
	var sec = "0" + a.getSeconds();
	var s = `${year}-${month}-${date.substr(-2)}T${hour.substr(-2)}:${min.substr(-2)}:${sec.substr(-2)}-07:00`
	return s
}
