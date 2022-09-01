class Battle {
    constructor() {
      this.combatants = {
        players: [
          new Combatant({
            level: 5,
            name: "Tony",
            vitality: 10,
            strength: 10,
            agility: 0,
            intelligence: 5,
            crit: 0,
            isCPUControlled: false,
            actions: [...Object.values(classSkills.power.crusader)],
            actions: [
              {...Actions.punch},
              {...classSkills.power.crusader.withdraw},
              {...classSkills.power.crusader.redbonecrusher},
              {...classSkills.power.crusader.bluebonecrusher},
              {...classSkills.power.crusader.defup},
            ],

            // actions: [{...Actions.roarAction},{...Actions.punchAction}],
            characterSprite: new Sprite({clothes: 36, base: 5, glasses: 6})
          }, this),
          // new Combatant({
          //   level: 100,
          //   name: "Cindy",
          //   vitality: 0,
          //   strength: 0,
          //   agility: 0,
          //   crit: 20,
          //   // hp: 10,
          //   // mp: 3,
          //   intelligence: 0,
          //   isCPUControlled: true,
          //   actions: [{...Actions.punchAction}, {...Actions.roarAction}, {...Actions.slashAction}, {...Actions.arrowStormAction}],
          //   actions: [{...classSkills.power.crusader.redbonecrusher}],
          //   characterSprite: new Sprite({hat: 4, clothes: 11, base: 2, glasses: 3, mouth: 8})
          // }, this),
          // new Combatant({
          //   level: 100,
          //   name: "Cindy",
          //   vitality: 0,
          //   strength: 0,
          //   agility: 0,
          //   crit: 20,
          //   // hp: 10,
          //   // mp: 3,
          //   intelligence: 0,
          //   isCPUControlled: true,
          //   actions: [{...Actions.punchAction}, {...Actions.roarAction}, {...Actions.slashAction}, {...Actions.arrowStormAction}],
          //   actions: [{...classSkills.power.crusader.redbonecrusher}],
          //   characterSprite: new Sprite({hat: 4, clothes: 11, base: 2, glasses: 3, mouth: 8})
          // }, this),
        ],
        enemies: [
          new Combatant({
            level: 5,
            // mp: 1,
            name: "Sanchez",
            // hp: 0,
            vitality: 0,
            strength: 0,
            agility: 0,
            intelligence: 0,
            crit: 0,
            isCPUControlled: true,
            actions: [{...Actions.roarAction},{...Actions.punchAction}],
            actions: [{...Actions.punch}],
            characterSprite: new Sprite({hat: 9, base: 2, eyes: 10, clothes: 25})
          }, this),
          new Combatant({
            level: 5,
            name: "Justin",
            // hp: 2,
            vitality: 0,
            strength: 0,
            agility: 0,
            intelligence: 0,
            crit: 0,
            actions: [{...Actions.punchAction}],
            actions: [{...Actions.punch}],
            isCPUControlled: true,
            characterSprite: new Sprite({hat: 26, base: 2, eyes: 14, clothes: 23, mouth: 10})
          }, this),
          new Combatant({
            level: 5,
            name: "Justin",
            // hp: 2,
            vitality: 0,
            strength: 0,
            agility: 0,
            intelligence: 0,
            crit: 25,
            actions: [{...Actions.punchAction}],
            actions: [{...Actions.punch},],
            isCPUControlled: true,
            characterSprite: new Sprite({hat: 26, base: 2, eyes: 14, clothes: 23, mouth: 10})
          }, this),
          // new Combatant({
          //   level: 12,
          //   name: "Alex",
          //   hp: 1,
          //   vitality: 0,
          //   strength: 0,
          //   agility: 0,
          //   intelligence: 0,
          //   isCPUControlled: true,
          //   actions: [{...Actions.punchAction}, {...Actions.roarAction}, {...Actions.slashAction}, {...Actions.arrowStormAction}],
          //   characterSprite: new Sprite({hat: 25, base: 2, eyes: 4, clothes: 24, mouth: 6})
          // }, this),
        ]
      }
      // [{...Actions.punch}, {...Actions.roar}, {...Actions.slash}, {...Actions.arrowStorm}
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
      `)
    }
    

    init(container) {
      this.createElement();
      container.appendChild(this.element);
  
      this.combatants.players.forEach((combatant, i) => {
        combatant.id = i + 1;
        combatant.actions = combatant.actions.map(action=>{
          return ActionClasses[action.skillName]({...action, caster: combatant}, this)
        })
        combatant.init(this.element.querySelector('.Battle_player'))
      })

      this.combatants.enemies.forEach((combatant, i) => {
        combatant.id = i + 4;
        combatant.actions = combatant.actions.map(action=>{
          return ActionClasses[action.skillName]({...action, caster: combatant}, this)
        })
        const stats = combatant.statPoints / 3
        // for(let i = 0; i < stats; i++){
        //   const stats = ['vitality', 'strength', 'agility', 'intelligence']
        //   const random = Math.floor(Math.random() * stats.length)
        //   combatant[stats[random]] += 1
        //   combatant.statPoints--
        // }
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