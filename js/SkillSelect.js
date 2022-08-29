class SkillSelect {
    constructor() {
        this.selectedSkill;
        this.isSelected = false
        this.skillPoints = 20
        this.level = 20
        this.strength = 20
        this.vitality = 0
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
  
    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("SkillSelect");
        this.element.innerHTML = (`
        <div class="left-side">
            <div class="skill-icon">
                <img src="./assets/img/skills/slash.png" alt="">
            </div>
            <div class="all-skills">
                ${Object.keys(classSkills[this.type]).map(className => {
                    return `
                    <div class="skill-container">
                        <div class="skill-grid">
                        ${Object.values(classSkills[this.type][className]).map(x=>`
                            <div class="skill-icon ${this.skillAvailable(x) ? "available" : ""} ${this.hasAction(x) ? "" : "inactive"}" data-skillname="${x.skillName}" data-class="${className}" data-level="${this.hasAction(x) ? this.actions[x.skillName].level : ""}" data-max-level="${this.hasAction(x) ? this.actions[x.skillName].maxLevel : ""}">
                                <img src="./assets/img/skills/${className}/${x.icon}.png" alt="">
                            </div>
                        `).join("")}
                            
                        </div>
                        <p>${className[0].toUpperCase()}${className.slice(1)}</p>
                    </div>
                    `
                }).join("")}
            </div>
        </div>
        `)
        this.element.querySelectorAll('.skill-icon').forEach(skillEl=>{
            skillEl.addEventListener('click', (e)=>{
                const skillName = skillEl.getAttribute("data-skillname")
                const className = skillEl.getAttribute("data-class")
                const obj = classSkills[this.type][className][skillName]
                if(!this.isSelected){
                    this.isSelected = true
                    skillEl.classList.add('selected')
                    this.selectedSkill = skillEl
                    this.toggleDesc(obj)
                }else{
                    if(skillEl === this.selectedSkill){
                        this.isSelected = false
                        skillEl.classList.remove('selected')
                        this.toggleDesc()
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

    updateElement(){
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
                        <div class="skill-icon ${this.skillAvailable(x) ? "available" : ""} ${this.hasAction(x) ? "" : "inactive"}" data-skillname="${x.skillName}" data-class="${className}" data-level="${this.hasAction(x) ? this.actions[x.skillName].level : ""}" data-max-level="${this.hasAction(x) ? this.actions[x.skillName].maxLevel : ""}">
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
        this.element.querySelectorAll('.skill-icon').forEach(skillEl=>{
            skillEl.addEventListener('click', (e)=>{
                const skillName = skillEl.getAttribute("data-skillname")
                const className = skillEl.getAttribute("data-class")
                const obj = classSkills[this.type][className][skillName]
                if(!this.isSelected){
                    this.isSelected = true
                    skillEl.classList.add('selected')
                    this.selectedSkill = skillEl
                    this.toggleDesc(obj)
                }else{
                    if(skillEl === this.selectedSkill){
                        this.isSelected = false
                        skillEl.classList.remove('selected')
                        this.toggleDesc()
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
        if(obj){
            if(this.rightsideEl){
                this.rightsideEl.querySelector('.skill-icon img').src = `./assets/img/skills/${obj.className}/${obj.icon}.png`
                this.rightsideEl.querySelector('p').textContent = obj.name
                this.rightsideEl.querySelector('.desc').textContent = obj.description
                this.rightsideEl.querySelector('.learn')?.remove()
                if(this.skillAvailable(obj)){
                    const learnEl = document.createElement('button')
                    learnEl.classList.add('learn')
                    learnEl.textContent = "Learn"
                    this.rightsideEl.append(learnEl)
                    this.rightsideEl.querySelector('.learn').addEventListener('click', ()=>{
                        if(this.skillPoints){
                            this.skillPoints--
                            console.log(this.skillPoints)
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
                    this.stringifyRequirements(this.actions[obj.skillName], this.rightsideEl.querySelector('.requirements'))
                }else{
                    this.stringifyRequirements(obj, this.rightsideEl.querySelector('.requirements'))
                }
            }else{
                this.rightsideEl = document.createElement('div')
                this.rightsideEl.classList.add('right-side')
                this.rightsideEl.innerHTML = `
                    <div class="skill-icon">
                        <img src="./assets/img/skills/${obj.className}/${obj.icon}.png" alt="">
                    </div>
                    <p>${obj.name}</p>
                    <p class="desc">${obj.description}</p>
                    <div class="requirements">

                    </div>
                    ${this.skillAvailable(obj) ? `<button class="learn">Learn</button>` : ""}
                `
                if(this.hasAction(obj)){
                    this.stringifyRequirements(this.actions[obj.skillName], this.rightsideEl.querySelector('.requirements'))
                }else{
                    this.stringifyRequirements(obj, this.rightsideEl.querySelector('.requirements'))
                }
                if(this.skillAvailable(obj)){
                    this.rightsideEl.querySelector('.learn').addEventListener('click', ()=>{
                        if(this.skillPoints){
                            this.skillPoints--
                            console.log(this.skillPoints)
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
                this.element.append(this.rightsideEl)
            }
        }else{
            this.rightsideEl.remove()
            delete this.rightsideEl
        }
    }

    stringifyRequirements(skill, container){
        let level = skill.level
        if(!level){
            level = 1
        }else if(level < skill.maxLevel){
            level++
        }
        console.log(this.hasAction(skill))
        console.log(skill)
        const requirements = skill.requires[level]
        Object.keys(requirements).forEach(x=>{
            if(x === 'level'){
                if(requirements[x] > this.level){
                    const pEl = document.createElement('p')
                    pEl.textContent = `Requires level ${requirements[x]}`
                    container.append(pEl)
                }
            }else if(x === 'action'){
                const realNames = requirements[x].map(z=>classSkills[skill.typeName][skill.className][z].name)
                const pEl = document.createElement('p')
                pEl.textContent = `Requires ${realNames.join(' or ')}`
                if(requirements[x].every(name=>!this.actions[name])){
                    pEl.classList.add('red')
                }
                container.append(pEl)
            }else if(x === 'strength'){
                const pEl = document.createElement('p')
                pEl.textContent = `Requires ${requirements[x]} strength`
                if(requirements[x] > this.strength){
                    pEl.classList.add('red')
                }
                container.append(pEl)
            }else if(x === 'vitality'){
                const pEl = document.createElement('p')
                pEl.textContent = `Requires ${requirements[x]} vitality`
                if(requirements[x] > this.vitality){
                    pEl.classList.add('red')
                }
                container.append(pEl)
            }else if(x === 'agility'){
                const pEl = document.createElement('p')
                pEl.textContent = `Requires ${requirements[x]} agility`
                if(requirements[x] > this.agility){
                    pEl.classList.add('red')

                }
                container.append(pEl)
            }else if(x === 'intelligence'){
                const pEl = document.createElement('p')
                pEl.textContent = `Requires ${requirements[x]} intelligence`
                if(requirements[x] > this.intelligence){
                    pEl.classList.add('red')
                    
                }
                container.append(pEl)
            }
        })
    }
    

    init(container) {
      this.createElement();
      container.appendChild(this.element);
    }
  
  }