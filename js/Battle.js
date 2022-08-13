class Battle {
    constructor() {
      this.combatants = {
        players: [
          new Combatant({
            level: 1,
            maxHp: 100,
            hp: 100,
            maxMp: 10,
            mp: 10,
            shield: 5,
            name: "Jimmy",
            strength: 1,
            agility: 1,
            intelligence: 1,
            characterSprite: new Sprite({clothes: 36, base: 5, glasses: 6})
          }, this)
        ],
        enemies: [
          new Combatant({
            level: 1,
            maxHp: 100,
            hp: 100,
            maxMp: 10,
            mp: 10,
            shield: 0,
            name: "Sanchez",
            strength: 1,
            agility: 1,
            intelligence: 1,
            characterSprite: new Sprite({hat: 9, base: 2, eyes: 10, clothes: 25})
          }, this),
          new Combatant({
            level: 1,
            maxHp: 100,
            hp: 100,
            maxMp: 10,
            mp: 10,
            shield: 0,
            name: "Naruto",
            strength: 1,
            agility: 1,
            intelligence: 1,
            characterSprite: new Sprite({hat: 29, base: 2, eyes: 14, clothes: 35})
          }, this)
        ]
      }

      // this.activeCombatants = {
      //   player: this.combatants.player,
      //   enemy: this.combatants.enemy
      // }
    }
    
  
    createElement() {
      this.element = document.createElement("div");
      this.element.classList.add("Battle");
      this.element.innerHTML = (`
        <div class="Battle_player"></div>
        <div class="Battle_enemy"></div>
        <p class="Battle-text">Choose your action:</p>
      `)
    }
    

    init(container) {
      this.createElement();
      container.appendChild(this.element);
  
      this.combatants.players.forEach((combatant, i) => {
        combatant.id = i + 1;
        combatant.init(this.element.querySelector('.Battle_player'))
      })

      this.combatants.enemies.forEach((combatant, i) => {
        combatant.id = i + 4;
        combatant.init(this.element.querySelector('.Battle_enemy'))
      })
      
      this.turnCycle = new TurnCycle({
        battle: this,
        onNewEvent: event => {
          return new Promise(resolve => {
            const battleEvent = new BattleEvent(event, this)
            battleEvent.init(resolve);
          })
        }
      })
      this.turnCycle.init();
  
  
    }
  
  }