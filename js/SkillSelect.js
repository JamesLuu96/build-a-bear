class SkillSelect {
    constructor() {
      this.classArr = [
        {
            name: "Turtle",
            icon: "turtle",
            skillName: "turtle",
            description: '',
        },
        {
            name: "Red Bone Crush",
            icon: "bonecrusher1",
            skillName: "redbonecrusher",
            description: '',
        },
        {
            name: "Blue Bone Crush",
            icon: "bonecrusher2",
            skillName: "bluebonecrusher",
            description: '',
        },
        {
            name: "Defense Up",
            icon: "defup",
            skillName: "defenseup",
            description: '',
        },
        {
            name: "Reflection",
            icon: "reflect",
            skillName: "reflect",
            description: '',
        },
        {
            name: "Protection",
            icon: "protect",
            skillName: "protection",
            description: '',
        },
        {
            name: "Absorption",
            icon: "absorption",
            skillName: "absorption",
            description: '',
        },
        {
            name: "Charge Slash",
            icon: "chargeattack",
            skillName: "chargeattack",
            description: '',
        },
        {
            name: "Charge Blast",
            icon: "chargeblast",
            skillName: "chargeblast",
            description: '',
        },
        {
            name: "Power Surge",
            icon: "powersurge",
            skillName: "powersurge",
            description: '',
        }
      ]
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
                <div class="skill-container">
                    <div class="skill-grid">
                    ${this.classArr.map(x=>`
                        <div class="skill-icon">
                            <img src="./assets/img/skills/crusader/${x.icon}.png" alt="">
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
                    <p>Barbarian</p>
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
        <div class="right-side">
            <div class="skill-icon">
                <img src="./assets/img/skills/crusader/absorption.png" alt="">
            </div>
            <p>Absorption</p>
            <p class="desc">Absorbs 5 moves and releases the pulse to multiple enemies.</p>
            <button>Learn</button>
        </div>
      `)
    }
    

    init(container) {
      this.createElement();
      container.appendChild(this.element);
    }
  
  }