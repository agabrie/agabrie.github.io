import projects from "../json/projects.json" assert {type: 'json'}
let $embed = $("#project-preview");
let $projectSection = $("#project-section");

$(document).ready(()=>{
	renderProjects()
})

const showEmbeddedPreview=()=>{
	let $projectParent = $(this).parents(".project-container");
	let $projectDescription = $projectParent.find(".project-name")
	let url = $projectDescription.attr("href");
	$embed.attr("src",url);
	$embed.removeAttr("hidden")
}

const renderProjects = ()=>{
	projects.forEach((project)=>{
		let $project_container = $(`<article class="project-container"></article>`)
		$project_container.attr('id',project.project_id)
		let $project_thumbnail = $(`<div class="project-thumbnail"></div>`)
		let $project_img = $(`<img class="project-image">`)
		$project_img.on("click",()=>{
			window.open(project.deployed_url,"__blank");
		})
		$project_img.attr("src",project.project_thumbnail)
		$project_thumbnail.append($project_img);
		if(project.hasLiveView){
			let $live_btn = $(`<button id="btn-project-view" class="btn-view-live">live</button>`)
			// live_btn.attr("src",project.github_repository)
			$live_btn.on("click",showEmbeddedPreview)
			$project_thumbnail.append($live_btn)
		}

		let $project_details = $(`<div class="project-details"></div>`)
		let $project_name = $(`<a class="project-name" target="__blank"></a>`)
		$project_name.attr("href", project.github_repository)
		$project_name.text(project.project_name)
		$project_details.append($project_name)
		
		let $project_description = $(`<p class="project-description"></p>`)
		$project_description.text(project.project_description)
		$project_details.append($project_description)

		$project_container.append($project_thumbnail)
		$project_container.append($project_details)
		$projectSection.append($project_container)
	})
}

