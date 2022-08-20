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
        skillName: "punchAction",
        targetAmount: 1,
        description: 'A basic attack that deals damage.',
        damageFunction: combatant => Math.round(combatant.strength / 3) + 5
    },
    arrowStormAction: {
        name: "Arrow Storm",
        icon: "arrowstorm",
        skillName: "arrowstormAction",
        cooldown: 1,
        mpCost: 3,
        targetAmount: 3,
        auto: true,
        description: `Rains 3-4 arrows randomly on your enemies.`
    },
    slashAction: {
        name: "Slash",
        skillName: "slashAction",
        targetAmount: 2,
        cooldown: 3,
        icon: "slash",
        description: 'A Powerful strike of a sword.'
    },
    roarAction: {
        name: "Roar",
        skillName: "roarAction",
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
        skillName: "healAction",
        targetAmount: 1,
        friendly: true,
        icon: "heal"
    },
    reviveAction: {
        name: "Revive",
        skillName: "reviveAction",
        targetAmount: 1,
        friendly: true,
        targetDead: true
    }
}