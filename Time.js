const message = document.getElementById("greeting");
let msg = "";
let time = new Date().getHours();

if (time<12){
    msg = "Good Morning Madam ji 🌅"
}else if(time<17){
    msg = "Good Afternoon Madam ji 🌞"
}else if(time<21){
    msg = "Good Evening Madam ji 🌆"
}else {
    msg = "Good Night Madam ji 🌃"
}

message.textContent = msg;

//  function delayedRedirect() {
//       setTimeout(function() {
//         window.location.href = "http://192.168.1.9:5500/Html/index2.html";
//       }, 50); 
//     }

document.querySelectorAll('.transition-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = this.href;
    }, 2000); // Match the CSS transition duration
  });
});

window.addEventListener('pageshow', () => {
  document.body.classList.remove('fade-out');
});
