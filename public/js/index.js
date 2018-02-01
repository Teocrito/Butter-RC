var subs = false;

function load(){
	if (localStorage.getItem('ip')){
		butter_remote.opt.ip = localStorage.getItem('ip');
		butter_remote.opt.port = localStorage.getItem('port');
		butter_remote.opt.username = localStorage.getItem('user');
		butter_remote.opt.password = localStorage.getItem('pass');
		butter_remote.opt.subs = localStorage.getItem('subs');
	}
	butter_remote.init();
	butter_remote.getplaying(togglePlayButton);
}

function toggleSubs(){
	if (subs){
		butter_remote.setsubtitle(['none']);
	}else{
		butter_remote.setsubtitle([butter_remote.opt.subs]);
	}
}

function togglePlayButton(data){
	var playBtn = document.getElementById('play');
	console.log(data.result.playing);
	if (data.result.playing){
		playBtn.setAttribute('src','public/img/pause.svg');
	}else{
		playBtn.setAttribute('src','public/img/play.svg');
	}
}

function togglePlay(){
	butter_remote.toggleplaying();
	butter_remote.getplaying(togglePlayButton);
}

function ok(){
	butter_remote.enter();
	butter_remote.getplaying(togglePlayButton);
}

function toggleOption(elmnt,op){
	switch(op){
		case 1:
			document.getElementsByClassName('active')[0].classList.remove('active');
			elmnt.classList.add('active');
			hideSettings();
			hideCredits();
			butter_remote.movieslist();
		break;
		case 2:
			document.getElementsByClassName('active')[0].classList.remove('active');
			elmnt.classList.add('active');
			hideSettings();
			hideCredits();
			butter_remote.showslist();
		break;
		case 3:
			showSettings();
			document.getElementsByClassName('active')[0].classList.remove('active');
			elmnt.classList.add('active');
		break;
		default:
		break;
	}
}

function notif(txt){
	var not = document.getElementById('notif');
	not.innerHTML = txt;
	not.style.display = "block";
	setTimeout(closeNotif,2000);
}

function closeNotif(){
	var not = document.getElementById('notif');
	not.style.display = "none";
}

function saveSettings(){
	var ip = document.getElementById('ip').value;
	var port = document.getElementById('port').value;
	var user = document.getElementById("user").value;
	var pass = document.getElementById('pass').value;
	var subtitlesSelect = document.getElementById('subs');
	var subs = subtitlesSelect.options[subtitlesSelect.selectedIndex].innerHTML;

	localStorage.setItem('ip',ip);
	localStorage.setItem('port',port);
	localStorage.setItem('user',user);
	localStorage.setItem('pass',pass);
	localStorage.setItem('subs',subs);

	notif("Settings saved!!!!!")
	load();
}

function showSettings(){
	document.getElementById('ip').value = butter_remote.opt.ip;
	document.getElementById('port').value = butter_remote.opt.port;
	document.getElementById("user").value = butter_remote.opt.username;
	document.getElementById('pass').value = butter_remote.opt.password;
	document.getElementById('subs').value = butter_remote.opt.subs;

	document.getElementById("settings").style.display = "block";
}

function hideSettings(){
	document.getElementById("settings").style.display = "none";
}

function showCredits(){
	document.getElementById("about").style.display = "block";
}

function hideCredits(){
	document.getElementById("about").style.display = "none";
}

function qrScan(){
	var vid = document.getElementById('scan');
	let scanner = new Instascan.Scanner({ video: vid, continuous: true});
	scanner.addListener('scan', function (content) {
	   
	   butter_remote.opt.ip = content.ip;
	   butter_remote.opt.port = content.port;
	   butter_remote.opt.username = content.username;
	   butter_remote.opt.password = content.password;
	   
	   showSettings();
	   saveSettings();
	   window.navigator.vibrate(300);
	   vid.style.display = "none";
	});
	Instascan.Camera.getCameras().then(function (cameras) {
	  if (cameras.length > 0) {
	    scanner.start(cameras[0]);
	  } else {
	    notif('No cameras found.');
	    closeScan();
	  }
	}).catch(function (e) {
	  notif(e);
	  closeScan();
	});	
	vid.style.display = "block";
}

function closeScan(){
	document.getElementById('scan').style.display = "none";
}

function key(event){
	if (event.keyCode == 13){
		search();
	}
}

function search(){
	var search = document.getElementById('searchTxt').value;
	if (search != ""){
		butter_remote.filtersearch([search]);
	}else{
		butter_remote.clearsearch();
	}
	
}