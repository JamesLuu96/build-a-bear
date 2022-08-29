
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

window.classSkills = {
    power: {
        crusader: {
            withdraw: {
                name: "Withdraw",
                icon: "withdraw",
                description: 'Prevent all damage for a turn.',
                auto: true,
                maxLevel: 3,
                requires: {
                    1: {level: 2},
                    2: {level: 5, strength: 10, vitality: 10},
                    3: {level: 10, strength: 15, vitality: 15}
                }
            },
            redbonecrusher:{
                name: "Red Bone Crush",
                icon: "bonecrusher1",
                description: "An attack that applies a physical debuff to the target's next attack.",
                maxLevel: 3,
                requires: {
                    1: {action: ["withdraw"]},
                    2: {},
                    3: {}
                }
            },
            bluebonecrusher:{
                name: "Blue Bone Crush",
                icon: "bonecrusher2",
                description: "An attack that applies a magic debuff to the target's next attack.",
                maxLevel: 3,
                requires: {
                    1: {action: ["withdraw"]},
                    2: {},
                    3: {}
                },
            },
            defup:{
                name: "Defense Up",
                icon: "defup",
                description: 'Grants allies a buff for defense.',
                maxLevel: 1,
                requires: {
                    1: {action: ["bluebonecrusher", "redbonecrusher"]}
                },
            },
            reflect:{
                name: "Reflection",
                icon: "reflect",
                description: 'Reflect 120% damage back to all enemies targetting you this turn.',
                requires: {
                    1: {action: ["defup"], level: 20},
                    2: {},
                    3: {}
                },
                maxLevel: 3
            },
            protection:{
                name: "Protection",
                icon: "protect",
                description: 'Choose allies to receive their damage this turn with a 25% damage reduction.',
                requires: {
                    1: {action: ["defup"], level: 20},
                    2: {},
                    3: {}
                },
                maxLevel: 3
            },
            absorption:{
                name: "Absorption",
                icon: "absorption",
                description: 'Stores 5 attacks then deals 75% of the damage stored to a target.',
                requires: {
                    1: {action: ["reflect", "protection"]}
                },
                maxLevel: 1
            },
            chargeattack:{
                name: "Charge Slash",
                icon: "chargeattack",
                description: 'After a turn, deals an attack to a target.',
                requires: {
                    1: {action: ["absorption"]},
                    2: {},
                    3: {}
                },
                maxLevel: 3
            },
            chargeblast:{
                name: "Charge Blast",
                icon: "chargeblast",
                description: 'After a turn, deals a blast to multiple targets.',
                requires: {
                    1: {action: ["absorption"]},
                    2: {},
                    3: {}
                },
                maxLevel: 3
            },
            powersurge:{
                name: "Power Surge",
                icon: "powersurge",
                description: 'Deal 20% of your current health to yourself, then to an enemy.',
                requires: {
                    1: {action: ["chargeattack", "chargeblast"]},
                    2: {},
                    3: {}
                },
                maxLevel: 3
            }
        },
        berserker: {
            roar: {
                name: "Roar",
                targetAmount: 3,
                friendly: true,
                duration: 2,
                cooldown: 4,
                mpCost: 3,
                icon: "roar",
                auto: true,
                description: "Grants all teammates and self a buff that increases your attack by 50%.",
                maxLevel: 3,
                requires: {
                    1: {level: 2},
                    2: {level: 5, strength: 10, vitality: 10},
                    3: {level: 10, strength: 15, vitality: 15}
                }
            },
            bloodchop:{
                name: "Blood Chop",
                icon: "roar",
                description: "Suffer damage, then deal a powerful attack.",
                maxLevel: 3,
                requires: {
                    1: {action: ["roar"]},
                    2: {},
                    3: {}
                }
            },
            savagestrike:{
                name: "Savage Strike",
                icon: "roar",
                description: 'Suffer damage, then deal a strike that penetrates defense.',
                requires: {
                    1: {action: ["roar"]}
                },
                maxLevel: 3
            },
            bloodboil:{
                name: "Blood Boil",
                icon: "roar",
                description: "Grants 5 rage. Skills that damage yourself grant you rage. Rage is used to make your other skills stronger.",
                maxLevel: 1,
                requires: {
                    1: {action: ["bloodchop", "savagestrike"]}
                },
            },
            bloodcontract:{
                name: "Blood Contract",
                icon: "roar",
                description: 'Lose 20% hp and gain 25% vitality.',
                maxLevel: 1,
                requires: {
                    1: {action: ["bloodboil"]}
                }
            },
            bloodleech:{
                name: "Blood Leech",
                icon: "roar",
                description: 'An attack that steals life based off strength.',
                requires: {
                    1: {action: ["bloodboil"]}
                },
                maxLevel: 3
            },
            bloodcleanse:{
                name: "Blood Cleanse",
                icon: "roar",
                description: 'Consumes all rage to heal and remove all negative debuffs.',
                requires: {
                    1: {action: ["bloodcontract", "bloodleech"]}
                },
                maxLevel: 3
            },
            bloodslash:{
                name: "Blood Slash",
                icon: "roar",
                description: 'Suffer damage, then deal a slash to multiple targets.',
                requires: {
                    1: {action: ["bloodcleanse"]}
                },
                maxLevel: 3
            },
            earthquake:{
                name: "Earthquake",
                icon: "roar",
                description: 'Deals 3 waves of damage to everyone.',
                requires: {
                    1: {action: ["bloodcleanse"]}
                },
                maxLevel: 3
            },
            lastgrasp:{
                name: "Last Grasp",
                icon: "roar",
                description: 'A powerful attack based off having low HP. Can only use when HP is lower than 50%.',
                maxLevel: 3,
                requires: {
                    1: {action: ["bloodslash", "earthquake"]},
                    2: {},
                    3: {}
                },
            },
        },
        knight: {
            spearpierce: {
                name: "Spear Pierce",
                icon: "slash",
                description: 'Deals damage that goes through shield.',
                auto: true,
                maxLevel: 3,
                requires: {
                    1: {level: 2},
                    2: {level: 5, strength: 10, vitality: 10},
                    3: {level: 10, strength: 15, vitality: 15}
                }
            },
            twinmaim:{
                name: "Twin Maim",
                icon: "slash",
                description: "Strikes two enemies and gives them an armor reduction debuff.",
                maxLevel: 1,
                requires: {
                    1: {action: ["spearpierce"]}
                }
            },
            riposte:{
                name: "Riposte",
                icon: "slash",
                description: "Deals an attack that if that enemy is attacking you after that attack, it will interrupt it.",
                maxLevel: 1,
                requires: {
                    1: {action: ["spearpierce"]}
                },
            },
            shieldup:{
                name: "Shield Up",
                icon: "slash",
                description: 'Gain shield.',
                maxLevel: 1,
                requires: {
                    1: {action: ["twinmaim", "riposte"]}
                },
            },
            trispear:{
                name: "Tri Spear",
                icon: "slash",
                description: 'Attacks three enemies.',
                requires: {
                    1: {action: ["shieldup"]}
                },
                maxLevel: 3
            },
            chargingshield:{
                name: "Charging Shield",
                icon: "slash",
                description: 'Gain shield, then after a turn deal a powerful attack.',
                requires: {
                    1: {action: ["shieldup"]}
                },
                maxLevel: 3
            },
            nullifyingaura:{
                name: "Nullifying Aura",
                icon: "slash",
                description: 'Grants two friendly targets an aura that blocks the next magic attack.',
                requires: {
                    1: {action: ["trispear", "chargingshield"]}
                },
                maxLevel: 3
            },
            shieldbash:{
                name: "Shield Bash",
                icon: "slash",
                description: 'Strikes with an attack that scales with current shield value. Has a chance to stun.',
                requires: {
                    1: {action: ["nullifyingaura"]}
                },
                maxLevel: 3
            },
            shieldcrash:{
                name: "Shield Crash",
                icon: "slash",
                description: 'Consumes all your shield to deal a powerful attack.',
                requires: {
                    1: {action: ["nullifyingaura"]}
                },
                maxLevel: 3
            },
            shieldabsorption:{
                name: "Shield Absorption",
                icon: "slash",
                description: 'Deals an AOE strike and gain shield for every hit.',
                requires: {
                    1: {action: ["shieldbash", "shieldcrash"]}
                },
                maxLevel: 3
            }
        }
    },
    swift: {
        ranger: {},
        toxin: {},
        assassin: {}
    },
    magic: {
        fire: {},
        water: {},
        nature: {}
    }
}

Object.keys(classSkills).forEach(typeName=>{
    Object.keys(classSkills[typeName]).forEach(className=>{
        Object.keys(classSkills[typeName][className]).forEach(skillName=>{
            classSkills[typeName][className][skillName].skillName = skillName
            classSkills[typeName][className][skillName].typeName = typeName
            classSkills[typeName][className][skillName].className = className
        })
    })
})

console.log(classSkills)


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