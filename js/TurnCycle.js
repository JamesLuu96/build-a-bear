class TurnCycle {
    constructor({ battle, onNewEvent }) {
      this.battle = battle;
      this.onNewEvent = onNewEvent;
      this.allyTeam = "players" //or "enemy"
      this.enemyTeam = "enemies"
    }
  
    async turn() {
      //Get the caster
      // const casterId = this.battle.activeCombatants[this.currentTeam];
      // const caster = this.battle.combatants[casterId];
      // const enemyId = this.battle.activeCombatants[caster.team === "player" ? "enemy" : "player"]
      // const enemy = this.battle.combatants[enemyId];
  
      // const submission = await this.onNewEvent({
      //   type: "submissionMenu",
      //   caster,
      //   enemy
      // })
      const combatants = this.battle.combatants
      const movesArr = []
      for(let i = 0; i < combatants.players.length; i++){
        const currentPlayer = combatants.players[i]
        const players = combatants.players
        const enemies = combatants.enemies
        const submission = await this.onNewEvent({
          type: "movesMenu",
          currentPlayer,
          players,
          enemies
        })
      }
  
      //Stop here if we are replacing this Pizza
      // if (submission.replacement) {
      //   await this.onNewEvent({
      //     type: "replace",
      //     replacement: submission.replacement
      //   })
      //   await this.onNewEvent({
      //     type: "textMessage",
      //     text: `Go get 'em, ${submission.replacement.name}!`
      //   })
      //   this.nextTurn();
      //   return;
      // }
  
      // if (submission.instanceId) {
      //   this.battle.items = this.battle.items.filter(i => i.instanceId !== submission.instanceId)
      // }
  
      // const resultingEvents = caster.getReplacedEvents(submission.action.success);
  
      // for (let i=0; i<resultingEvents.length; i++) {
      //   const event = {
      //     ...resultingEvents[i],
      //     submission,
      //     action: submission.action,
      //     caster,
      //     target: submission.target,
      //   }
      //   await this.onNewEvent(event);
      // }
  
      //Did the target die?
      const targetDead = submission.target.hp <= 0;
      if (targetDead) {
        await this.onNewEvent({ 
          type: "textMessage", text: `${submission.target.name} is ruined!`
        })
      }
  
      //Do we have a winning team?
      const winner = this.getWinningTeam();
      if (winner) {
        await this.onNewEvent({
          type: "textMessage",
          text: "Winner!"
        })
        //END THE BATTLE -> TODO
        return;
      }
        
      //We have a dead target, but still no winner, so bring in a replacement
      if (targetDead) {
        const replacement = await this.onNewEvent({
          type: "replacementMenu",
          team: submission.target.team
        })
        await this.onNewEvent({
          type: "replace",
          replacement: replacement
        })
        await this.onNewEvent({
          type: "textMessage",
          text: `${replacement.name} appears!`
        })
      }
  
  
      //Check for post events
      //(Do things AFTER your original turn submission)
      const postEvents = caster.getPostEvents();
      for (let i=0; i < postEvents.length; i++ ) {
        const event = {
          ...postEvents[i],
          submission,
          action: submission.action,
          caster,
          target: submission.target, 
        }
        await this.onNewEvent(event);
      }
  
      //Check for status expire
      const expiredEvent = caster.decrementStatus();
      if (expiredEvent) {
        await this.onNewEvent(expiredEvent)
      }
  
      this.nextTurn();
    }
  
    nextTurn() {
      this.currentTeam = this.currentTeam === "player" ? "enemy" : "player";
      this.turn();
    }
  
    getWinningTeam() {
      let aliveTeams = {};
      Object.keys(this.battle.combatants).forEach(team => {
        aliveTeams[team] = this.battle.combatants[team].filter(player => player.hp > 0)
      })
      console.log(aliveTeams)
      if (!aliveTeams["players"].length) { return "enemies"}
      if (!aliveTeams["enemies"].length) { return "players"}
      return null;
    }
  
    async init() {
      // await this.onNewEvent({
      //   type: "textMessage",
      //   text: "The battle is starting!"
      // })
  
      //Start the first turn!
      console.log(this.getWinningTeam())
      // this.turn()
  
    }
  
  }