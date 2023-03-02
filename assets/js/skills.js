import skills from "../json/skills.json" assert {type: 'json'}
let $softSkillSection = $("#soft-skill-section");
let $techSkillSection = $("#tech-skill-section");

$(document).ready(()=>{
	renderSkills(skills.technical_skills, $techSkillSection)
	renderSkills(skills.soft_skills, $softSkillSection)
})

const renderSkills=(skillsArray, $section)=>{
	skillsArray.sort((s1, s2)=>s2.proficiency-s1.proficiency).forEach((skill)=>{
		let $skillContainer = $(`<li class="skill-container"></li>`)
		let $skillDescription = $(`<p>Problem solving</p>`)
		// let $skillLogo = $(`<img class="skill-logo" />`)
		// if(skill.logo){
		// 	$skillLogo.attr("alt", skill.description)
		// 	$skillLogo.attr("src", skill.logo)
		// 	$skillContainer.append($skillLogo)
		// }
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

		$section.append($skillContainer)
	})
}