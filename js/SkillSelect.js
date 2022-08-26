class SkillSelect {
    constructor() {
      this.classArr = [
        1,2,3,4,5,6,7,8,9,10
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
                            <img src="./assets/img/skills/crusader/${x}.png" alt="">
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
        
      `)
    }
    

    init(container) {
      this.createElement();
      container.appendChild(this.element);
    }
  
  }