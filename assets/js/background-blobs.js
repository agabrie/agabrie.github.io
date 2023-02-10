let blobs = []
let darkMode = true;
let colorRanges = [
	{color:"red",low:0,high:10}, 
	{color:"red-orange",low:10,high:20}, 
	{color:"orange",low:20,high:40}, 
	{color:"orange-yellow",low:40,high:50}, 
	{color:"yellow",low:50,high:60}, 
	{color:"yellow-green",low:60,high:80}, 
	{color:"green",low:80,high:140}, 
	{color:"green-cyan",low:140,high:170}, 
	{color:"cyan",low:170,high:200}, 
	{color:"cyan-blue",low:200,high:220}, 
	{color:"blue",low:220,high:240}, 
	{color:"blue-magenta",low:240,high:280}, 
	{color:"magenta",low:280,high:320}, 
	{color:"magenta-pink",low:320,high:330}, 
	{color:"pink",low:330,high:345}, 
	{color:"pink-red",low:345,high:355}, 
	{color:"red",low:355,high:360}, 
	{color:"all",low:0,high:360}, 
]
let btnDarkToggle = $("#dark-toggle")
let toggleIcon = $("#toggle-icon")
$(document).ready(async ()=>{
	renderDarkMode()
	let colorRangeValue = getRandomInteger(0,colorRanges.length-1)
	let colorRange = colorRanges[colorRangeValue]
	await generateBlobs(colorRange);
	// console.log(blobs)
	setTimeout(async ()=>{
		await moveBlobs();

	}, 500)
	setInterval(async()=>{
		await moveBlobs();
	},10000)
	btnDarkToggle.on("click", toggleDarkMode)
	setInterval(()=>{updateBlobColor()},getRandomInteger(5, 10)*1000)
})

function toggleDarkMode(){
	darkMode = !darkMode;
	toggleIcon.toggleClass("fa-beat-fade").attr("style", "--fa-animation-duration: .5s;--fa-beat-fade-scale: 0;"/*"--fa-flip-x: 1; --fa-flip-y: -.35;"*/)
	setTimeout(()=>{
		renderDarkMode();
	},250)
	setTimeout(()=>{
		toggleIcon.toggleClass("fa-beat-fade").attr("style","")
	},500)
	// updateBlobColor();
}
function renderDarkMode(){
	
	toggleIcon.toggleClass("fa-moon fa-sun")
	// toggleIcon.toggle("fa-sun")
	// toggleIcon.toggle("fa-sun",!darkMode)
	if(darkMode){
		// toggleIcon.text("☾")
		$("body").get(0).style.setProperty("--primary-text", "white");
		$("body").get(0).style.setProperty("--primary", "black");
	}else{
		// toggleIcon.text("❂")
		$("body").get(0).style.setProperty("--primary-text", "black");
		$("body").get(0).style.setProperty("--primary", "white");
	}
}

function generateBlobs(colorRange) {
	// console.log(colorRange.color)
	let promises = []
	let num_blobs = getRandomInteger(10, 20);
	let floating_shapes = $("#floating-shapes");
	for (let i = 0; i <= num_blobs; i++) {
		 promises.push(new Promise((resolve, reject)=>{
			let x = getRandomInteger(0, 100) - 10;
			let y = getRandomInteger(0, 100) - 10;
			let size = getRandomInteger(5, 40);
			let blob_element = createBlob(x, y, size, colorRange);
			
			let blob = {blob_element,x,y,size}
			blobs.push(blob);
			floating_shapes.append(blob_element);
			// if(i==num_blobs){
				resolve(blob);
			// }
		}))
	}
	return Promise.all(promises)
}
function createBlob(x, y,size, colorRange) {
	let blob_element = $(`<div class="blob"></div>`);
	let rotation = getRandomInteger(0, 360);
	let duration = getRandomInteger(5,10)
	let backgroundColor = generateBackgroundColor("hsla", colorRange);
	// console.log(backgroundColor)
	let alpha = getRandomInteger(0, 4) / 10;
	let anim_duration = getRandomInteger(3, 10);
	blob_element.css({
		top:`${y}%`,
		left: `${x}%`,
		width : `${size}em`,
		transform : `rotate(${rotation}deg)`,
		boxShadow : `1px 1px 10px rgb(0 0 0 / ${alpha})`,
		backgroundColor : backgroundColor,
		transition:`transform ${duration}s ease-in-out,background-color ${duration}s ease-in-out, top ${duration}s ease-in-out, left ${duration}s ease-in-out, width ${duration}s ease-in-out`,
		animation : `contort ${anim_duration}s linear -${getRandomInteger(0,anim_duration)}s infinite alternate`,
	})
	
	return blob_element;
}
function updateBlobColor(){
	let colorRangeValue = getRandomInteger(0,colorRanges.length-1)
	let colorRange = colorRanges[colorRangeValue]
	blobs.forEach((blob)=>{
		// console.log(blob)
		let blobEl = blob.blob_element; 
		let backgroundColor = generateBackgroundColor("hsla", colorRange)
		blobEl.css({backgroundColor:backgroundColor})
	})
}
function generateBackgroundColor(algorithm = "rgba", colorRange=null){
	if(algorithm == "rgba"){
		let r = getRandomInteger(0, 255);
		let g = getRandomInteger(0, 255);
		let b = getRandomInteger(0, 255);
		let a = getRandomInteger(1, 5) / 10;
		return `rgba(${r},${g},${b},${a})`
	}else{
		let h;
		if(colorRange){
			h = getRandomInteger(colorRange.low, colorRange.high)
		}else{
			h = getRandomInteger(0, 360);
		}
		let s = getRandomInteger(80	, 100);
		let l = getRandomInteger(40, 80);
		let a = getRandomInteger(1, 5) / 10;
		return `hsla(${h},${s}%,${l}%,${a})`
		// return "blue";
	}
}
function moveBlobs(){
	let promises = []
	blobs.forEach(({blob_element,x,y,size}) => {
		promises.push( new Promise((resolve, reject) => {
			let rotation = getRandomInteger(0, 360);
			let movementconfig = {
				transform : `rotate(${rotation}deg)`,
				top:`${getRandomInteger(10,100 )-10}%`,
				left:`${getRandomInteger(10, 100)-10}%`,
				width:`${getRandomInteger(5,40)}em`,
			}
			let	timingconfig = {
				easing:"easeInOut",
				// duration:5000,
				duration:getRandomInteger(5,10)*1000,
				// loop: true,
				queue:false,
			}
			blob_element.css(movementconfig)
			// console.log(movementconfig, timingconfig)
			// blob_element.velocity(movementconfig,timingconfig)
			resolve(blob_element)
		}))
	});
	return Promise.all(promises)
}
function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}