//id获取函数
function getId(id){
	return document.getElementById(id);
}

//随机函数
function randomNum (m,n) { 
	return Math.floor(Math.random() * (n - m + 1) + m); 
	}


//获取元素
var pipe = getId('pipe');
var bird = getId('bird');
var wrap = getId('wrap');
var startMenu = getId('startMenu');
var tips = getId('tips');
var score = getId('score');
var back = getId('back');

//启动
startMenu.onclick = function(){
	startMenu.style.display = 'none';
	pipe.style.display = 'block';
	score.style.display = 'block';

	//小鸟下落
	flyBirdInterval =setInterval(flyBird,30);
	//定时循环生成管道
	creatPipeInterval = setInterval(creatPipe,4000);

	//操作小鸟
	wrap.onclick = function(){
		speed = -6;
	};
	
	var iscrash = setInterval(function(){
		var lis = pipe.getElementsByClassName('pipe');
		for(var i = 0, len = lis.length;i < len;i++){
			if(bird.offsetLeft < lis[i].offsetLeft + lis[i].offsetWidth){
				var up_pipe = lis[i].firstElementChild;
				var down_pipe = lis[i].lastElementChild;
				if(crash(bird,up_pipe) || crash(bird,down_pipe)){
					gameover();
				}
			}
		}
	},15);

};






//小鸟下落函数
var speed = 0; //下落速度
var flyBirdInterval;//小鸟定时器 
function flyBird(){
	speed += 0.5;
	if(speed>6){
		speed = 6;
	}
	var birdTop = bird.offsetTop + speed;
	bird.style.top = birdTop + 'px';
	//小鸟掉地上游戏结束
	if(birdTop>600){
		gameover();
	}
}

//生成单管道
var creatPipeInterval; //管道计时器
function creatPipe(){
	var li = document.createElement('li');
	li.className = 'pipe';
	li.style.left = pipe.offsetWidth + 'px'; 
	pipe.appendChild(li); 
	//随机上管道的高度 
	var topHeight = randomNum(50,250); 
	//下管道的高度 
	var downHeight = li.offsetHeight - topHeight - 120; 
	//alert(li.offsetHeight) 
	//创建上.下管道 
	var top_pipe = document.createElement('div'); 
	var down_pipe = document.createElement('div'); 
	top_pipe.className = 'up'; 
	down_pipe.className = 'down'; 
	top_pipe.style.height = topHeight + 'px'; 
	down_pipe.style.height = downHeight + 'px'; 
	li.appendChild(top_pipe); 
	li.appendChild(down_pipe);
	//管道移动 
	var distance = pipe.clientWidth; 
	var pipeMoveTimer = setInterval (function () { 
	distance--; 
	li.style.left = distance + 'px'; 
	//当管道出屏幕时 
	if(distance < -li.offsetWidth) {
	 clearInterval(pipeMoveTimer); 
	 //清除管道(减少内存) 
	 pipe.removeChild(li); }
	 //得分 
	 if (distance === 270){
	  		changeScore();
	  } 
	  },15);
}


//碰撞检测
function crash(obj1,obj2) {
	//获取obj1的左右边距和宽高
	var top1 = obj1.offsetTop;
	var left1 = obj1.offsetLeft;
	var w1 = obj1.offsetWidth;
	var h1 = obj1.offsetHeight;

	//获取obj2的左右边距和宽高
	var top2 = obj2.offsetTop;
	var left2 = obj2.parentElement.offsetLeft;
	var w2 = obj2.offsetWidth;
	var h2 = obj2.offsetHeight;

	//碰撞检测
	if(left1 + w1 < left2 || left1 > left2 + w2 || top1 + h1 < top2 || top1 > top2 + h2) {
		return false;
	}else{
		return true;
	}
}

//游戏结束
function gameover(){
	tips.style.display = 'block';
	back.style.display = 'block';
	back.onclick = function () {
		tips.style.display = 'none';
		back.style.display = 'none';
		resert();
	};
	var end = setInterval(function () {

	},1000);
	for( var i = 1 ; i < end; i++ ){
		clearInterval(i);
	}
}

function changeScore() {
	var oldscore = Number(score.innerHTML);
	score.innerHTML = oldscore + 5 ;
}

//复位
function resert(){
	location.reload();
}
