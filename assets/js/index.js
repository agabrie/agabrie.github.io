let embed = $("#project-preview");
let btnView = $("#btn-project-view");
let projects = [
	{
		"project_name":"Portfoliio",
		"project_id":"p001",
		"project_thumbnail":"assets/images/portfolio-screenshot.png",
		"hasLiveView":true,
		"github_repository":"",
		"deployed_url":"https://agabrie.github.io/portfolio/",
		"project_description":"This is my first attempt at making a portfolio"
	}
]

// import projects from '../json/projects.json' assert { type: 'JSON' };

$(document).ready(()=>{
	generateProjects()
})

btnView.on('click',showEmbeddedPreview)

function showEmbeddedPreview(){
	let projectParent = $(this).parents(".project-container");
	let projectDescription = projectParent.find(".project-name")
	let url = projectDescription.attr("href");
	embed.attr("src",url);
	embed.removeAttr("hidden")
}

function generateProjects(){
	console.log(projects)
}