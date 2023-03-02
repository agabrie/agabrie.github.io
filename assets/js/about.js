import about_items from "../json/about.json" assert {type: 'json'}

const $aboutSection = $("#about-section");
$(document).ready(()=>{
	renderAbout()
})

const renderAbout = ()=>{
	// let random  = Math.floor(Math.random()*about_items.length);
	// select a random index for the about section to display
	about_items[0].forEach((about)=>{
		// let $project_details = $(`<div class="project-details"></div>`)
		let $p = $("<p></p>")
		$p.text(about)
		$aboutSection.append($p);
	})
}