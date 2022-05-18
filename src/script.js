
function formatDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) minutes = "0" + minutes;
  if (hours < 10) hours = "0" + hours;
  let day = days[now.getDay()];
  let currentDate = `${day} ${hours}:${minutes}`;
  return currentDate;
}
let showTime = document.querySelector(".show-time");
showTime.innerHTML = formatDate(new Date());