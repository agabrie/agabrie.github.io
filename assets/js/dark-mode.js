
let $configMenu = $("#config-container")
let $configIcon = $("#icon-menu")
let openMenu = false;

let $btnDarkToggle = $("#config-toggle-dark")
let $darkModeIcon = $("#icon-dark-mode")
let darkMode = true;

$(document).ready(async()=>{
    renderDarkMode()
    $configIcon.on("click", toggleConfigMenu)
    $btnDarkToggle.on("click", toggleDarkMode)
})

function toggleConfigMenu(){
    openMenu = !openMenu;
    $configIcon.toggleClass("fa-beat-fade").attr("style", "--fa-animation-duration: .5s;--fa-beat-fade-scale: 0;"/*"--fa-flip-x: 1; --fa-flip-y: -.35;"*/)
	// setTimeout(()=>{
        $configIcon.toggleClass("fa-bars fa-gear")
        $configMenu.toggleClass("close-menu")
	// },250)
	setTimeout(()=>{
		$configIcon.toggleClass("fa-beat-fade").attr("style","")
	},250)
}


function toggleDarkMode(){
	darkMode = !darkMode;
	$darkModeIcon.toggleClass("fa-beat-fade").attr("style", "--fa-animation-duration: .5s;--fa-beat-fade-scale: 0;"/*"--fa-flip-x: 1; --fa-flip-y: -.35;"*/)
	setTimeout(()=>{
		renderDarkMode();
	},250)
	setTimeout(()=>{
		$darkModeIcon.toggleClass("fa-beat-fade").attr("style","")
	},500)
}
function renderDarkMode(){
	
	$darkModeIcon.children('i').toggleClass("fa-moon fa-sun")
	if(darkMode){
		$("body").get(0).style.setProperty("--primary-text", "var(--white)");
		$("body").get(0).style.setProperty("--primary-bg", `var(--bg-black)`);
		$("body").get(0).style.setProperty("--secondary-bg", `var(--bg-white)`);
	}else{
		$("body").get(0).style.setProperty("--primary-text", "var(--black)");
		$("body").get(0).style.setProperty("--primary-bg", `var(--bg-white)`);
		$("body").get(0).style.setProperty("--secondary-bg", `var(--bg-black)`);
	}
}