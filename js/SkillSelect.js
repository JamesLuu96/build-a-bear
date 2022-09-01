class SkillSelect {
    constructor() {
        this.selectedSkill;
        this.isSelected = false
        this.skillPoints = 20
        this.level = 20
        this.strength = 20
        this.vitality = 20
        this.agility = 0
        this.intelligence = 0
        this.actions = {}
        this.type = "power"
    }

    skillAvailable(skill){
        if(!this.skillPoints) return false
        const yourSkill = this.actions[skill.skillName]
        if(yourSkill){
            if(yourSkill.maxLevel === yourSkill.level){
                return false
            }else{
                return this.checkRequirements(yourSkill.requires[yourSkill.level + 1])
            }
        }else{
            return this.checkRequirements(skill.requires[1])
        }
    }

    checkRequirements(requirements){
        if(!requirements) return false
        const keys = Object.keys(requirements)
        for(let i = 0; i < keys.length; i++){
            if(keys[i] === "level"){
                if(this.level < requirements[keys[i]]){
                    return false
                }
            }else if(keys[i] === "action"){
                if(requirements[keys[i]].every(name=>!this.actions[name])){
                    return false
                }
            }else if(keys[i] === "strength"){
                if(this.strength < requirements[keys[i]]){
                    return false
                }
            }else if(keys[i] === "vitality"){
                if(this.vitality < requirements[keys[i]]){
                    return false
                }
            }else if(keys[i] === "intelligence"){
                if(this.intelligence < requirements[keys[i]]){
                    return false
                }
            }
        }
        return true
    }

    
    hasAction(skill){
        return this.actions[skill.skillName] ? true : false
    }
  
    
    updateElement(){
        if(!this.element.querySelector('.left-side')){
            this.leftSideEl = document.createElement('div')
            this.leftSideEl.classList.add('left-side')
            this.element.append(this.leftSideEl)
            this.rightsideEl = document.createElement('div')
            this.rightsideEl.classList.add('right-side')
        }
        
        this.element.querySelector('.left-side').innerHTML = `
        <div class="skill-icon">
                <img src="./assets/img/skills/slash.png" alt="">
        </div>
        <div class="all-skills">
            ${Object.keys(classSkills[this.type]).map(className => {
                return `
                <div class="skill-container">
                    <div class="skill-grid">
                    ${Object.values(classSkills[this.type][className]).map(x=>`
                        <div class="skill-icon ${this.skillAvailable(x) ? "available" : ""} ${this.hasAction(x) ? "" : ""}" data-skillname="${x.skillName}" data-class="${className}" data-level="${this.hasAction(x) ? this.actions[x.skillName].level : ""}" data-max-level="${this.hasAction(x) ? this.actions[x.skillName].maxLevel : ""}">
                            <img src="./assets/img/skills/${className}/${x.icon}.png" alt="">
                        </div>
                    `).join("")}
                        
                    </div>
                    <p>${className[0].toUpperCase()}${className.slice(1)}</p>
                </div>
                `
            }).join("")}
        </div>
        `
        if(this.selectedSkill){
            this.selectedSkill = this.element.querySelector(`.skill-icon[data-skillname="${this.selectedSkill.getAttribute('data-skillname')}"]`)
            this.selectedSkill.classList.add('selected')
            console.log(this.selectedSkill)
        }
        this.element.querySelectorAll('.skill-icon').forEach(skillEl=>{
            skillEl.addEventListener('click', (e)=>{
                const skillName = skillEl.getAttribute("data-skillname")
                const className = skillEl.getAttribute("data-class")
                const obj = classSkills[this.type][className][skillName]
                if(!this.isSelected){
                    this.isSelected = true
                    skillEl.classList.add('selected')
                    this.selectedSkill = skillEl
                    this.element.append(this.rightsideEl)
                    this.toggleDesc(obj)
                }else{
                    if(skillEl === this.selectedSkill){
                        this.isSelected = false
                        skillEl.classList.remove('selected')
                        this.rightsideEl.remove()
                    }else{
                        this.selectedSkill.classList.remove('selected')
                        skillEl.classList.add('selected')
                        this.selectedSkill = skillEl
                        this.toggleDesc(obj)
                    }
                }
            })
        })
    }

    toggleDesc(obj){
        let description = obj.description
        if(obj.skillObj){
            Object.keys(obj.skillObj).forEach(key=>{
                description = description.replace(`{${key}}`, obj.skillObj[key][this.hasAction(obj) ? this.actions[obj.skillName].level : 1])
            })
        }
        if(this.hasAction(obj)) console.log(this.actions[obj.skillName])
        this.rightsideEl.innerHTML = `
            <div class="skill-icon">
                <img src="./assets/img/skills/${obj.className}/${obj.icon}.png" alt="">
            </div>
            <p>${obj.name}</p>
            <p class="desc">${description}</p>
            <div class="requirements"></div>
        `
        
        if(this.skillAvailable(obj)){
            const learnEl = document.createElement('button')
            learnEl.classList.add('learn')
            learnEl.textContent = "Learn"
            this.rightsideEl.append(learnEl)
            this.rightsideEl.querySelector('.learn').addEventListener('click', ()=>{
                if(this.skillPoints){
                    this.skillPoints--
                    // remove later
                    this.level++
                    console.log(`level: ${this.level}`)
                    if(this.hasAction(obj)){
                        this.actions[obj.skillName].level++
                    }else{
                        this.actions[obj.skillName] = {...obj, level: 1}
                    }
                    this.updateElement()
                    this.toggleDesc(obj)
                }
            })
        }

        this.rightsideEl.querySelector('.requirements').innerHTML = ""
        if(this.hasAction(obj)){
            if(this.actions[obj.skillName].level !== this.actions[obj.skillName].maxLevel){
                this.stringifyRequirements(this.actions[obj.skillName], this.rightsideEl.querySelector('.requirements'))
                if(!this.actions[obj.skillName].skillObj)return
                const divEl = document.createElement('div')
                const currentLevel = this.actions[obj.skillName].level
                Object.values(this.actions[obj.skillName].skillObj).forEach(x=>{
                    if(x[currentLevel] === x[currentLevel + 1]){
                        return
                    }
                    const pEl = document.createElement('p')
                    pEl.classList.add('desc')
                    pEl.textContent = `${x.name}: ${x.percent ? `${x[currentLevel]}%` : x[currentLevel]} => ${x.percent ? `${x[currentLevel + 1]}%` : x[currentLevel + 1]}`
                    divEl.appendChild(pEl)
                })
                this.rightsideEl.append(divEl)
            }
        }else{
            this.stringifyRequirements(obj, this.rightsideEl.querySelector('.requirements'))
        }

    }

    stringifyRequirements(skill, container){
        let level = skill.level
        if(!level){
            level = 1
        }else if(level < skill.maxLevel){
            level++
        }
        const requirements = skill.requires[level]
        if(requirements.level){
            const pEl = document.createElement('p')
            pEl.textContent = `Requires level ${requirements.level}`
            if(requirements.level > this.level){
                pEl.classList.add('red')
            }
            container.append(pEl)
        }
        if(requirements.actions){
            const realNames = requirements.actions.map(z=>classSkills[skill.typeName][skill.className][z].name)
            const pEl = document.createElement('p')
            pEl.textContent = `Requires ${realNames.join(' or ')}`
            if(requirements.actions.every(name=>!this.actions[name])){
                pEl.classList.add('red')
            }
            container.append(pEl)
        }
        if(requirements.strength){
            const pEl = document.createElement('p')
            pEl.textContent = `Requires ${requirements.strength} strength`
            if(requirements.strength > this.strength){
                pEl.classList.add('red')
            }
            container.append(pEl)
        }
        if(requirements.agility){
            const pEl = document.createElement('p')
            pEl.textContent = `Requires ${requirements.agility} agility`
            if(requirements.agility > this.agility){
                pEl.classList.add('red')
                
            }
            container.append(pEl)
        }
        if(requirements.intelligence){
            const pEl = document.createElement('p')
            pEl.textContent = `Requires ${requirements.intelligence} intelligence`
            if(requirements.intelligence > this.intelligence){
                pEl.classList.add('red')
                
            }
            container.append(pEl)
        }
        if(requirements.vitality){
            const pEl = document.createElement('p')
            pEl.textContent = `Requires ${requirements.vitality} vitality`
            if(requirements.vitality > this.vitality){
                pEl.classList.add('red')
            }
            container.append(pEl)
        }
        
    }
    

    init(container) {
        this.element = document.createElement("div");
        this.element.classList.add("SkillSelect");
        this.updateElement();
        container.appendChild(this.element);
    }
  
  }