class TurnCycle {
    constructor({ battle, onNewEvent }) {
      this.battle = battle;
      this.onNewEvent = onNewEvent;
      // this.allyTeam = "players"
      // this.enemyTeam = "enemies"
    }
  
    async turn() {
      const combatants = this.battle.combatants
      const alivePlayers = combatants.players.filter(x=>x.hp)
      const aliveEnemies = combatants.enemies.filter(x=>x.hp)
      const movesArr = []
      for(let i = 0; i < alivePlayers.length; i++){
        const currentPlayer = alivePlayers[i]
        const players = combatants.players
        const enemies = combatants.enemies
        const submission = await this.onNewEvent({
          type: "movesMenu",
          currentPlayer,
          players,
          enemies
        })
        movesArr.push(submission)
      }

      for(let i = 0; i < aliveEnemies.length; i++){
        const currentPlayer = aliveEnemies[i]
        const players = combatants.enemies
        const enemies = combatants.players
        const submission = await this.onNewEvent({
          type: "movesMenu",
          currentPlayer,
          players,
          enemies
        })
        movesArr.push(submission)
      }

      // console.log(movesArr)
      for (let i = 0; i < movesArr.length; i++) {
        const event = {
          type: "startMove",
          ...movesArr[i]
        } 
        await this.onNewEvent(event);
        if(this.getWinningTeam()){
          return this.getWinningTeam()
        }

        const {caster} = movesArr[i]
        Object.keys(caster.status).forEach(s=>{
          if(caster.status[s].persistent){
            return
          }
          caster.decrementStatus(s)
        })
        // for(let j = 0; j < movesArr[i].action.success.length; j++){
        //   const event = {
        //     ...movesArr[i].action.success[j],
        //     caster: movesArr[i].caster,
        //     target: movesArr[i].target,
        //     action: movesArr[i].action,
        //   }
        // }
      }

      for(let i = 0; i < this.battle.combatants.players.length; i++){
        const player = this.battle.combatants.players[i]
        for(let j = 0; j < player.actions.length; j++){
          player.actions[j].tickCooldown()
        }
      }

      for(let i = 0; i < this.battle.combatants.enemies.length; i++){
        const enemy = this.battle.combatants.enemies[i]
        for(let j = 0; j < enemy.actions.length; j++){
          enemy.actions[j].tickCooldown()
        }
      }
  
      //Check for post events
      //(Do things AFTER your original turn submission)
      // const postEvents = caster.getPostEvents();
      // for (let i=0; i < postEvents.length; i++ ) {
      //   const event = {
      //     ...postEvents[i],
      //     submission,
      //     action: submission.action,
      //     caster,
      //     target: submission.target, 
      //   }
      //   await this.onNewEvent(event);
      // }
  
      //Check for status expire
      // const expiredEvent = caster.decrementStatus();
      // if (expiredEvent) {
      //   await this.onNewEvent(expiredEvent)
      // }
      if(!this.getWinningTeam()){
        return this.turn()
      }else{
        return this.getWinningTeam()
      }
      // this.turn();
    }
  
    nextTurn() {
      // this.currentTeam = this.currentTeam === "player" ? "enemy" : "player";

      this.turn();
    }
  
    getWinningTeam() {
      let aliveTeams = {};
      Object.keys(this.battle.combatants).forEach(team => {
        aliveTeams[team] = this.battle.combatants[team].filter(player => player.hp > 0)
      })
      // console.log(aliveTeams)
      if (!aliveTeams["players"].length) { return "enemies"}
      if (!aliveTeams["enemies"].length) { return "players"}
      return null;
    }
  
    async init() {
      
      const winner = await this.turn()

      await wait(800)
      if(winner === "players"){
        const players = this.battle.combatants.players
        const enemies = this.battle.combatants.enemies
        
        
        Promise.all(players.map(player=>new Promise(async (resolve)=>{
          const amountXp = enemies.reduce((a,b)=>{
            let diff = 1
            if(player.level < b.level){
              diff = ((b.level - player.level) * .1) + 1
            }
            return a + (b.xpGainedFromWinning * diff) 
          },0)
          console.log(`${player.name} + ${amountXp}`)
          await player.giveXp(amountXp / players.length)
          resolve()
        }))).then(()=>{
          // console.log(players[0].xp, players[0].maxXp)
        })
      }
    }
  
  }