function singleTarget(combatants){
    return combatants.enemies.filter(enemy=>enemy.hp > 0)
}

window.Actions = {
    punch: {
        name: "Punch",
        icon: "punch.png",
        cooldown: 0,
        mpCost: 0,
        damage: function(combatant){
            return {min: Math.floor(combatant.strength / 2) + (combatant.level * 2) + 3, max: Math.floor(combatant.strength / 2) + (combatant.level * 2) + 5}
        },
        target: 1,
        targetFilter: singleTarget
    },
    arrowStorm: {
        name: "Arrow Storm",
        icon: ".png",
        cooldown: 3,
        mpCost: 5,
        target: 0,
        targetFilter: []
    }
}