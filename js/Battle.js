class Battle {
    constructor() {
      this.combatants = {
        player: [
          new Combatant({
            level: 1,
            maxHp: 100,
            hp: 100,
            maxMp: 100,
            mp: 100,
            name: "Jimmy",
            characterSprite: new Sprite({clothes: 36})
          }, this)
        ],
        enemy: [
          new Combatant({
            level: 1,
            maxHp: 100,
            hp: 100,
            maxMp: 100,
            mp: 100,
            name: "Naruto",
            characterSprite: new Sprite({hat: 29})
          }, this),
          new Combatant({
            level: 1,
            maxHp: 100,
            hp: 100,
            maxMp: 100,
            mp: 100,
            name: "Naruto",
            characterSprite: new Sprite({hat: 29})
          }, this)
        ]
      }

      this.activeCombatants = {
        player: this.combatants.player,
        enemy: this.combatants.enemy
      }
    }
    
  
    createElement() {
      this.element = document.createElement("div");
      this.element.classList.add("Battle");
      this.element.innerHTML = (`
        <div class="Battle_player"></div>
        <div class="Battle_enemy"></div>
      `)
    }
    

    init(container) {
      this.createElement();
      container.appendChild(this.element);
  
      this.combatants.player.forEach((combatant, i) => {
        combatant.id = i + 1;
        combatant.init(this.element.querySelector('.Battle_player'))
      })

      this.combatants.enemy.forEach((combatant, i) => {
        combatant.id = i + 4;
        combatant.init(this.element.querySelector('.Battle_enemy'))
      })
      
      // this.turnCycle = new TurnCycle({
      //   battle: this,
      //   onNewEvent: event => {
      //     return new Promise(resolve => {
      //       const battleEvent = new BattleEvent(event, this)
      //       battleEvent.init(resolve);
      //     })
      //   }
      // })
      // this.turnCycle.init();
  
  
    }
  
  }