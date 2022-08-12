class Combatant {
    constructor(config, battle) {
      Object.keys(config).forEach(key => {
        this[key] = config[key];
      })
      this.battle = battle;
    }
  
    get hpPercent() {
      const percent = this.hp / this.maxHp * 100;
      return percent > 0 ? percent : 0;
    }
  
    get xpPercent() {
      return this.xp / this.maxXp * 100;
    }
  
    get isActive() {
      return this.battle.activeCombatants[this.team] === this.id;
    }
  
    createElement() {
      this.hudElement = document.createElement("div");
      this.hudElement.classList.add("bear-container");
      this.hudElement.setAttribute("data-combatant", this.id);
      this.hudElement.innerHTML = (`
      <div class="bear-hp-bar">
      <div class="bear-hp-left" style="width: 100%;">
          <div class="bear-hp-percent" data-bear-hp="100/100" style="width: 100%;"></div>
          <div class="bear-shield-percent" style="width: 0%;"></div>
      </div>
      </div>
      <div class="bear-mp-bar">
          <div class="bear-mp-percent" data-bear-mp="10/10" style="width: 100%;"></div>
      </div>
      <div class="bear-stats">
          <p>${this.name}</p>
      </div>
      `);
  
      this.pizzaElement = document.createElement("img");
      this.pizzaElement.classList.add("Pizza");
      this.pizzaElement.setAttribute("src", this.src );
      this.pizzaElement.setAttribute("alt", this.name );
      this.pizzaElement.setAttribute("data-team", this.team );
  
      this.hpFills = this.hudElement.querySelectorAll(".Combatant_life-container > rect");
      this.xpFills = this.hudElement.querySelectorAll(".Combatant_xp-container > rect");
    }
  
    update(changes={}) {
      //Update anything incoming
      Object.keys(changes).forEach(key => {
        this[key] = changes[key]
      });
  
      //Update active flag to show the correct pizza & hud
      this.hudElement.setAttribute("data-active", this.isActive);
      this.pizzaElement.setAttribute("data-active", this.isActive);
  
      //Update HP & XP percent fills
      this.hpFills.forEach(rect => rect.style.width = `${this.hpPercent}%`)
      this.xpFills.forEach(rect => rect.style.width = `${this.xpPercent}%`)
  
      //Update level on screen
      this.hudElement.querySelector(".Combatant_level").innerText = this.level;
  
      //Update status
      const statusElement = this.hudElement.querySelector(".Combatant_status");
      if (this.status) {
        statusElement.innerText = this.status.type;
        statusElement.style.display = "block";
      } else {
        statusElement.innerText = "";
        statusElement.style.display = "none";
      }
    }
  
    getReplacedEvents(originalEvents) {
  
      if (this.status?.type === "clumsy" && utils.randomFromArray([true, false, false])) {
        return [
          { type: "textMessage", text: `${this.name} flops over!` },
        ]
      }
  
      return originalEvents;
    }
  
    getPostEvents() {
      if (this.status?.type === "saucy") {
        return [
          { type: "textMessage", text: "Feelin' saucy!" },
          { type: "stateChange", recover: 5, onCaster: true }
        ]
      } 
      return [];
    }
  
    decrementStatus() {
      if (this.status?.expiresIn > 0) {
        this.status.expiresIn -= 1;
        if (this.status.expiresIn === 0) {
          this.update({
            status: null
          })
          return {
            type: "textMessage",
            text: "Status expired!"
          }
        }
      }
      return null;
    }
  
    init(container) {
      this.createElement();
      container.appendChild(this.hudElement);
      container.appendChild(this.pizzaElement);
      this.update();
    }
  
  }