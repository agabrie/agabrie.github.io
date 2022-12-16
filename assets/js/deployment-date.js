let latest_date = "2022-12-14T08:49:35Z"
let api_token = process.env.GITHUB_API_TOKEN;
$(document).ready(async ()=>{
	getLatestDeployment("portfolio").then((data)=>{
		showLatestDeployment()
	})
})

function showLatestDeployment(){
	let dateContainer = $("#last-date");
	dateContainer.text(new Date(latest_date).toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" }));
}

function getLatestDeployment(repository_name){
	var settings = {
		"url": `https://api.github.com/repos/agabrie/${repository_name}/deployments`,
		"method": "GET",
		"timeout": 0,
		"headers": {
			"Accept": "application/vnd.github+json",
			"Authorization": `Bearer ${api_token}`,
		},
	};

	return $.ajax(settings)
	.done(response=>response)
	.then(result => {
		latest_date = result[0].updated_at;
		return result[0]
	})
	.catch(error => console.log('error', error));
}