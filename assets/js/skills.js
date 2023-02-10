import skills from "../json/skills.json" assert {type: 'json'}
let $skillSection = $("#skill-section");

$(document).ready(()=>{
	renderSkills()
})

const renderSkills=()=>{
	skills.forEach((skill)=>{
		let $skillContainer = $(`<li class="skill-container"></li>`)
		let $skillDescription = $(`<p>Problem solving</p>`)
		let $skillProficiencyContainer = $(`<div class="proficiency"></div>`)
		let proficiency = ""
		for(let i = 0; i<5; i++){
			// <div class="proficiency">★★★★★</div>
			proficiency+=i<skill.proficiency?"★":"☆"
		}
		$skillProficiencyContainer.text(proficiency)
		$skillDescription.text(skill.description)

		$skillContainer.append($skillDescription)
		$skillContainer.append($skillProficiencyContainer)

		$skillSection.append($skillContainer)
	})
}