let latest_date = "2022-12-14T08:49:35Z"
$(document).ready(async ()=>{
	getLatestDeployment("portfolio").then((data)=>{
		showLatestDeployment()
	})
})

function showLatestDeployment(){
	let $dateContainer = $("#last-date");
	$dateContainer.text(new Date(latest_date).toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" }));
}

function getLatestDeployment(repository_name){
	var settings = {
		"url": `https://agabrie-github-deployment-api.onrender.com/api/deployment/latest/${repository_name}`,
		"method": "GET",
		"timeout": 0
	};

	return $.ajax(settings)
	.done(response=>response)
	.then(result => {
		latest_date = result.updated_at;
		return result
	})
	.catch(error => console.log('error', error));
}