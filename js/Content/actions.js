function singleTarget(combatants){
    return combatants.enemies.filter(enemy=>enemy.hp > 0)
}

const availableProperties = {
    name: "Test",
    icon: "test",
    skillName: "test",
    targetAmount: 3,
    auto: true,
    mpCost: 5,
    cooldown: 5,
    friendly: true,
    targetDead: true,
    description: "",
    damageFunction: function(combatant){},
    healing: 10,
    duration: 10,
    noTargetSelf: true
}

window.Actions = {
    punchAction: {
        name: "Punch",
        icon: "punch",
        skillName: "punch",
        targetAmount: 1,
        description: 'A basic attack that deals damage.',
        damageFunction: combatant => Math.round(combatant.strength / 5) + 5
    },
    arrowStormAction: {
        name: "Arrow Storm",
        icon: "arrowstorm",
        skillName: "arrowStorm",
        cooldown: 1,
        mpCost: 3,
        targetAmount: 3,
        auto: true,
        description: `Rains 3-4 arrows randomly on your enemies.`,
        damageFunction: combatant => Math.max(1, combatant.level + Math.round(combatant.agility / 5))
    },
    slashAction: {
        name: "Slash",
        skillName: "slash",
        targetAmount: 1,
        cooldown: 3,
        icon: "slash",
        description: 'A Powerful strike of a sword.',
        damageFunction: combatant => Math.max(1, combatant.level + Math.round(combatant.strength / 2))
    },
    roarAction: {
        name: "Roar",
        skillName: "roar",
        targetAmount: 3,
        friendly: true,
        duration: 2,
        cooldown: 4,
        mpCost: 3,
        icon: "roar",
        auto: true,
        description: "Grants all teammates and self a buff that increases your attack by 50%."
    },
    healAction: {
        name: "Heal",
        skillName: "heal",
        targetAmount: 1,
        friendly: true,
        icon: "heal"
    },
    reviveAction: {
        name: "Revive",
        skillName: "revive",
        targetAmount: 1,
        friendly: true,
        targetDead: true
    }
}

window.ActionClasses = {
    punch: (config, battle)=>new PunchAction(config, battle),
    arrowStorm: (config, battle)=>new ArrowStormAction(config, battle),
    slash: (config, battle)=>new SlashAction(config, battle),
    roar: (config, battle)=>new RoarAction(config, battle)

}