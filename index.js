document.addEventListener("DOMContentLoaded", () => {
	generateBlobs();
});
function generateBlobs() {
	let num_blobs = getRandomInteger(10, 30);
	let floating_shapes = document.getElementById("floating-shapes");
	for (let i = 0; i <= num_blobs; i++) {
		let x = getRandomInteger(0, 100) - 10;
		let y = getRandomInteger(0, 100) - 10;
		let size = getRandomInteger(5, 40);
		let blob_element = createBlob(x, y, size);
		floating_shapes.appendChild(blob_element);
	}
}
function createBlob(x, y,size) {
	let blob_element = document.createElement("div");
	blob_element.classList.add("blob");
	let rotation = getRandomInteger(0, 360);
	let r = getRandomInteger(0, 255);
	let g = getRandomInteger(0, 255);
	let b = getRandomInteger(0, 255);
	let a = getRandomInteger(1, 9) / 10;
	let alpha = getRandomInteger(0, 4) / 10;
	let anim_duration = getRandomInteger(3, 10);
	blob_element.style.top = `${y}%`;
	blob_element.style.left = `${x}%`;
	blob_element.style.width = `${size}em`;
	blob_element.style.transform = `rotate(${rotation}deg)`;
	blob_element.style.boxShadow = `1px 1px 10px rgb(0 0 0 / ${alpha})`;
	blob_element.style.backgroundColor = `rgba(${r},${g},${b},${a})`;
	blob_element.style.animation = `contort ${anim_duration}s linear 0s infinite alternate`;
	return blob_element;
}
function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
