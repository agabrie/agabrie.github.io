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
let btnDarkToggle = $("#hero")
$(document).ready(async ()=>{
	let colorRangeValue = getRandomInteger(0,colorRanges.length)
	let colorRange = colorRanges[colorRangeValue]

	await generateBlobs(colorRange);
	moveBlobs();
	btnDarkToggle.on("click", toggleDarkMode)
})

function toggleDarkMode(){
	darkMode = !darkMode;
	if(darkMode){
		$("body").get(0).style.setProperty("--primary-text", "black");
		$("body").get(0).style.setProperty("--primary", "white");
	}else{
		$("body").get(0).style.setProperty("--primary-text", "white");
		$("body").get(0).style.setProperty("--primary", "black");
	}
}

function generateBlobs(colorRange) {
	return new Promise((resolve, reject)=>{
		let num_blobs = getRandomInteger(10, 30);
		let floating_shapes = $("#floating-shapes");
		for (let i = 0; i <= num_blobs; i++) {
			let x = getRandomInteger(0, 100) - 10;
			let y = getRandomInteger(0, 100) - 10;
			let size = getRandomInteger(5, 40);
			let blob_element = createBlob(x, y, size, colorRange);
			blobs.push({blob_element,x,y,size});
			floating_shapes.append(blob_element);
			if(i==num_blobs){
				resolve();
			}
		}
	})
}
function createBlob(x, y,size, colorRange) {
	let blob_element = $(`<div class="blob"></div>`);
	let rotation = getRandomInteger(0, 360);
	
	let backgroundColor = generateBackgroundColor("hsla", colorRange);
	console.log(backgroundColor)
	let alpha = getRandomInteger(0, 4) / 10;
	let anim_duration = getRandomInteger(3, 10);
	blob_element.css({
		top:`${y}%`,
		left: `${x}%`,
		width : `${size}em`,
		transform : `rotate(${rotation}deg)`,
		boxShadow : `1px 1px 10px rgb(0 0 0 / ${alpha})`,
		backgroundColor : backgroundColor,
		animation : `contort ${anim_duration}s linear -${getRandomInteger(0,anim_duration)}s infinite alternate`,
	})
	
	return blob_element;
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
			blob_element.velocity(
			{
				top:`${getRandomInteger(0,100 )-10}%`,
				left:`${getRandomInteger(0, 100)-10}%`,
				width:`${getRandomInteger(5,40)}em`
			},
			{
				duration:getRandomInteger(5000,10000),
				loop: true
			})
	});
	return Promise.all(promises)
}
function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}