import './background-blobs.js'
import './deployment-date.js'
import './dark-mode.js'
import './skills.js'
import './projects.js'
import './about.js'
$(document).ready(()=>{
	let vh = window.innerHeight * 0.01;
	// Then we set the value in the --vh custom property to the root of the document
	document.documentElement.style.setProperty('--vh', `${vh}px`);
})