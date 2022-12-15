let embed = $("#project-preview");

let btnView = $("#btn-project-view");

btnView.on('click',showEmbeddedPreview)

function showEmbeddedPreview(){
	let projectParent = $(this).parents(".project-container");
	let projectDescription = projectParent.find(".project-name")
	let url = projectDescription.attr("href");
	embed.attr("src",url);
	embed.removeAttr("hidden")
}