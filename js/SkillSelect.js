class SkillSelect {
    constructor() {
        this.selectedSkill;
        this.isSelected = false
        this.classArr = {}
        this.skillPoints = 2
        this.actions = {
            withdraw: {
                name: "Withdraw",
                icon: "withdraw",
                skillName: "withdraw",
                description: 'Prevent all damage for a turn.',
                className: "crusader",
                level: 3,
                maxLevel: 3
            }
        }
        this.classes = ["crusader"]
        this.classArr.crusader = {
            withdraw: {
                name: "Withdraw",
                icon: "withdraw",
                skillName: "withdraw",
                description: 'Prevent all damage for a turn.',
                className: "crusader",
                maxLevel: 3
            },
            redbonecrusher:{
                name: "Red Bone Crush",
                icon: "bonecrusher1",
                skillName: "redbonecrusher",
                description: "An attack that applies a physical debuff to the target's next attack.",
                className: "crusader",
                requires: ["withdraw"],
                maxLevel: 3
            },
            bluebonecrusher:{
                name: "Blue Bone Crush",
                icon: "bonecrusher2",
                skillName: "bluebonecrusher",
                description: "An attack that applies a magic debuff to the target's next attack.",
                className: "crusader",
                requires: ["withdraw"],
                maxLevel: 3
            },
            defenseup:{
                name: "Defense Up",
                icon: "defup",
                skillName: "defenseup",
                description: 'Grants allies a buff for defense.',
                className: "crusader",
                requires: ["bluebonecrusher", "redbonecrusher"],
                maxLevel: 3
            },
            reflect:{
                name: "Reflection",
                icon: "reflect",
                skillName: "reflect",
                description: 'Reflect 120% damage back to all enemies targetting you this turn.',
                className: "crusader",
                requires: ["defup"],
                maxLevel: 3
            },
            protection:{
                name: "Protection",
                icon: "protect",
                skillName: "protection",
                description: 'Choose allies to receive their damage this turn with a 25% damage reduction.',
                className: "crusader",
                requires: ["defup"],
                maxLevel: 3
            },
            absorption:{
                name: "Absorption",
                icon: "absorption",
                skillName: "absorption",
                description: 'Stores 5 attacks then deals 75% of the damage stored to a target.',
                className: "crusader",
                requires: ["reflect", "protection"],
                maxLevel: 3
            },
            chargeattack:{
                name: "Charge Slash",
                icon: "chargeattack",
                skillName: "chargeattack",
                description: 'After a turn, deals an attack to a target.',
                className: "crusader",
                requires: ["absorption"],
                maxLevel: 3
            },
            chargeblast:{
                name: "Charge Blast",
                icon: "chargeblast",
                skillName: "chargeblast",
                description: 'After a turn, deals a blast to multiple targets.',
                className: "crusader",
                requires: ["absorption"],
                maxLevel: 3
            },
            powersurge:{
                name: "Power Surge",
                icon: "powersurge",
                skillName: "powersurge",
                description: 'Deal 20% of your current health to yourself, then to an enemy.',
                className: "crusader",
                requires: ["chargeattack", "chargeblast"],
                maxLevel: 3
            }
        }
    }

    skillAvailable(skill){
        if(this.actions[skill.skillName]?.maxLevel){
            if(this.actions[skill.skillName]?.maxLevel === this.actions[skill.skillName]?.level){
                return false
            }
        }
        if(!skill?.requires){
            return true
        }
        for(let i = 0; i < skill.requires.length; i++){
            if(this.actions[skill.requires[i]]){
                return true
            }
        }
        return false
    }
    
    hasAction(skill){
        return this.actions[skill] ? true : false
    }
  
    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("SkillSelect");
        this.updateElement()
    }
    
    updateElement(){
        const currentClass = this.classes[0]
        
        
        this.element.innerHTML = (`
        <div class="left-side">
            <div class="skill-icon">
                <img src="./assets/img/skills/slash.png" alt="">
            </div>
            <div class="all-skills">
                <div class="skill-container">
                    <div class="skill-grid">
                    ${Object.values(this.classArr[currentClass]).map(x=>`
                        <div class="skill-icon ${this.skillAvailable(x) ? "available" : ""} ${this.hasAction(x.skillName) ? "" : "inactive"}" data-skillname="${x.skillName}" data-class="${currentClass}">
                            <img src="./assets/img/skills/${currentClass}/${x.icon}.png" alt="">
                        </div>
                    `).join("")}
                        
                    </div>
                    <p>Crusader</p>
                </div>
                <div class="skill-container">
                    <div class="skill-grid">
                        <div class="skill-icon">
                            <img src="./assets/img/skills/slash.png" alt="">
                        </div>

                        <div class="skill-icon">
                            <img src="./assets/img/skills/slash.png" alt="">
                        </div>

                        <div class="skill-icon">
                            <img src="./assets/img/skills/slash.png" alt="">
                        </div>

                        <div class="skill-icon">
                            <img src="./assets/img/skills/slash.png" alt="">
                        </div>

                        <div class="skill-icon">
                            <img src="./assets/img/skills/slash.png" alt="">
                        </div>

                        <div class="skill-icon">
                            <img src="./assets/img/skills/slash.png" alt="">
                        </div>

                        <div class="skill-icon">
                            <img src="./assets/img/skills/slash.png" alt="">
                        </div>

                        <div class="skill-icon">
                            <img src="./assets/img/skills/slash.png" alt="">
                        </div>

                        <div class="skill-icon">
                            <img src="./assets/img/skills/slash.png" alt="">
                        </div>

                        <div class="skill-icon">
                            <img src="./assets/img/skills/slash.png" alt="">
                        </div>
                    </div>
                    <p>Berserker</p>
                </div>
                <div class="skill-container">
                    <div class="skill-grid">
                        <div class="skill-icon">
                            <img src="./assets/img/skills/slash.png" alt="">
                        </div>

                        <div class="skill-icon">
                            <img src="./assets/img/skills/slash.png" alt="">
                        </div>

                        <div class="skill-icon">
                            <img src="./assets/img/skills/slash.png" alt="">
                        </div>

                        <div class="skill-icon">
                            <img src="./assets/img/skills/slash.png" alt="">
                        </div>

                        <div class="skill-icon">
                            <img src="./assets/img/skills/slash.png" alt="">
                        </div>

                        <div class="skill-icon">
                            <img src="./assets/img/skills/slash.png" alt="">
                        </div>

                        <div class="skill-icon">
                            <img src="./assets/img/skills/slash.png" alt="">
                        </div>

                        <div class="skill-icon">
                            <img src="./assets/img/skills/slash.png" alt="">
                        </div>

                        <div class="skill-icon">
                            <img src="./assets/img/skills/slash.png" alt="">
                        </div>

                        <div class="skill-icon">
                            <img src="./assets/img/skills/slash.png" alt="">
                        </div>
                    </div>
                    <p>Knight</p>
                </div>
            </div>
        </div>
        `)
        this.element.querySelectorAll('.skill-icon').forEach(skillEl=>{
            skillEl.addEventListener('click', (e)=>{
                const skillName = skillEl.getAttribute("data-skillname")
                const className = skillEl.getAttribute("data-class")
                const obj = this.classArr[className][skillName]
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
            }else{
                this.rightsideEl = document.createElement('div')
                this.rightsideEl.classList.add('right-side')
                this.rightsideEl.innerHTML = `
                    <div class="skill-icon">
                        <img src="./assets/img/skills/${obj.className}/${obj.icon}.png" alt="">
                    </div>
                    <p>${obj.name}</p>
                    <p class="desc">${obj.description}</p>
                    ${this.skillAvailable(obj) ? `<button class="learn">Learn</button>` : ""}
                `
                if(this.skillAvailable(obj)){
                    this.rightsideEl.querySelector('.learn').addEventListener('click', ()=>{
                        if(this.skillPoints){
                            this.skillPoints--
                            console.log(this.skillPoints)
                            this.actions[obj.skillName] = obj
                            this.updateElement()
                            this.isSelected = false
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
    

    init(container) {
      this.createElement();
      container.appendChild(this.element);
    }
  
  }