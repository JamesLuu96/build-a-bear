
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
                description: 'Prevent {DAMAGE_REDUCTION}% damage for a turn.',
                skillObj: {
                    DAMAGE_REDUCTION: {
                        name: "Damage Reduction",
                        percent: true,
                        1: 50,
                        2: 75,
                        3: 100
                    }
                },
                auto: true,
                maxLevel: 3,
                requires: {
                    1: {level: 2, vitality: 5},
                    2: {level: 6, vitality: 20},
                    3: {level: 10, strength: 15, vitality: 15}
                },
                cooldownList: {
                    1: 3,
                    2: 4,
                    3: 4
                },
                speedList: {
                    1: 1,
                    2: 1,
                    3: 1
                },
                mpList: {
                    1: 5,
                    2: 20,
                    3: 45
                },
                friendly: true
            },
            redbonecrusher:{
                name: "Divine Spear",
                icon: "bonecrusher1",
                description: "An attack that deals {BASE}(+{STRENGTH}%) physical damage and applies a {DEBUFF}% physical debuff to the target's next attack.",
                skillObj: {
                    BASE: {
                        name: "Base",
                        1: 20,
                        2: 35,
                        3: 50
                    },
                    STRENGTH: {
                        name: "Strength",
                        percent: true,
                        1: 50,
                        2: 75,
                        3: 100
                    },
                    DEBUFF: {
                        name: "Debuff Effect",
                        percent: true,
                        1: 25,
                        2: 25,
                        3: 50
                    }
                },
                maxLevel: 3,
                targetList: {
                    1: 1,
                    2: 1,
                    3: 1
                },
                requires: {
                    1: {action: ["withdraw"], level: 3, vitality: 10},
                    2: {level: 4},
                    3: {}
                },
                cooldownList: {
                    1: 1,
                    2: 1,
                    3: 1
                },
                mpList: {
                    1: 4,
                    2: 10,
                    3: 20
                },
                speedList: {
                    1: 5,
                    2: 5,
                    3: 5
                },
            },
            bluebonecrusher:{
                name: "Divine Cross",
                icon: "bonecrusher2",
                description: "An attack that deals {BASE}(+{INTELLIGENCE}%) magical damage and applies a {DEBUFF}% magic debuff to {TARGET} target's next attack.",
                skillObj: {
                    BASE: {
                        name: "Base",
                        1: 15,
                        2: 25,
                        3: 35
                    },
                    INTELLIGENCE: {
                        name: "Intelligence",
                        percent: true,
                        1: 35,
                        2: 55,
                        3: 75
                    },
                    DEBUFF: {
                        name: "Debuff Effect",
                        percent: true,
                        1: 25,
                        2: 25,
                        3: 50
                    },
                    TARGET: {
                        name: "Target",
                        1: 2,
                        2: 2, 
                        3: 3
                    },
                    COOLDOWN: {
                        name: "Cooldown",
                        1: 1,
                        2: 2,
                        3: 2
                    }
                },
                maxLevel: 3,
                targetList: {
                    1: 2,
                    2: 2,
                    3: 3
                },
                requires: {
                    1: {vitality: 10, level: 3, action: ["withdraw"]},
                    2: {level: 4},
                    3: {}
                },
                cooldownList: {
                    1: 1,
                    2: 2,
                    3: 2
                },
                mpList: {
                    1: 8,
                    2: 35,
                    3: 65
                },speedList: {
                    1: 5,
                    2: 5,
                    3: 5
                },
            },
            defup:{
                name: "Defense Up",
                icon: "defup",
                description: 'Grants allies a buff for +{DEFENSE} defense and +{MDEFENSE} magic defense.',
                skillObj: {
                    DEFENSE: {
                        name: "Defense",
                        1: 20,
                        2: 20,
                        3: 30
                    },
                    MDEFENSE: {
                        name: "Magic Defense",
                        1: 15,
                        2: 10,
                        3: 15
                    },
                    DURATION: {
                        name: "Duration",
                        1: 3,
                        2: 3,
                        3: 3
                    }
                },
                maxLevel: 3,
                friendly: true,
                auto: true,
                requires: {
                    1: {level: 5, action: ["bluebonecrusher", "redbonecrusher"]},
                    2: {level: 10},
                    3: {}
                },
                cooldownList: {
                    1: 4,
                    2: 4,
                    3: 4
                },
                mpList: {
                    1: 5,
                    2: 15,
                    3: 35
                },speedList: {
                    1: 2,
                    2: 2,
                    3: 2
                },
            },
            reflect:{
                name: "Reflection",
                icon: "reflect",
                auto: true,
                description: 'Reflect {REFLECTION}% damage back to all enemies targetting you this turn.',
                skillObj: {
                    REFLECTION: {
                        name: "Reflected Damage",
                        percent: true,
                        1: 50,
                        2: 90,
                        3: 120
                    },
                },
                requires: {
                    1: {action: ["defup"], level: 10},
                    2: {},
                    3: {}
                },
                maxLevel: 3,
                cooldownList: {
                    1: 4,
                    2: 4,
                    3: 4
                },speedList: {
                    1: 1,
                    2: 1,
                    3: 1
                },
            },
            protection:{
                name: "Protection",
                icon: "protect",
                description: 'Choose allies to receive their damage this turn with a {REDUCTION}% damage reduction.',
                skillObj: {
                    REDUCTION: {
                        name: "Reduction",
                        percent: true,
                        1: 0,
                        2: 25
                    },
                },
                friendly: true,
                targetList: {
                    1: 10,
                    2: 10
                },
                noTargetSelf: true,
                requires: {
                    1: {action: ["defup"], level: 10},
                    2: {},
                },
                maxLevel: 2,
                cooldownList: {
                    1: 3,
                    2: 2
                },
                speedList: {
                    1: 0,
                    2: 0,
                    3: 0
                },
            },
            absorption:{
                name: "Absorption",
                icon: "absorption",
                description: 'Stores {ATTACKS_STORED} attacks then deals 75% of the damage stored to a target.',
                skillObj: {
                    ATTACKS_STORED: {
                        name: "Attacks Stored",
                        1: 5,
                        2: 7
                    },
                },
                auto: true,
                requires: {
                    1: {action: ["reflect", "protection"]}
                },
                maxLevel: 2,
                cooldownList: {
                    1: 2,
                    2: 2
                },speedList: {
                    1: 4,
                    2: 4,
                    3: 4
                },
            },
            chargeattack:{
                name: "Charge Slash",
                icon: "chargeattack",
                description: 'After a turn, deals {BASE}(+{STRENGTH}%) physical attack to a target.',
                skillObj: {
                    BASE: {
                        name: "Base Damage",
                        1: 35,
                        2: 45,
                        3: 55
                    },
                    STRENGTH: {
                        name: "Strength",
                        percent: true,
                        1: 100,
                        2: 120,
                        3: 150
                    }
                },
                targetList: {
                    1:1,
                    2:1,
                    3:1
                },
                requires: {
                    1: {action: ["absorption"]},
                    2: {},
                    3: {}
                },
                maxLevel: 3,
                cooldownList: {
                    1: 2,
                    2: 2,
                    3: 2
                },speedList: {
                    1: 1,
                    2: 1,
                    3: 1
                },
            },
            chargeblast:{
                name: "Charge Blast",
                icon: "chargeblast",
                description: 'After a turn, deals {BASE}(+{INTELLIGENCE}%) to multiple targets.',
                skillObj: {
                    BASE: {
                        name: "Base Damage",
                        1: 15,
                        2: 25,
                        3: 35
                    },
                    INTELLIGENCE: {
                        name: "Intelligence",
                        percent: true,
                        1: 50,
                        2: 75,
                        3: 100
                    }
                },
                targetList: {
                    1: 2,
                    2: 2,
                    3: 3
                },
                requires: {
                    1: {action: ["absorption"]},
                    2: {},
                    3: {}
                },
                maxLevel: 3,
                cooldownList: {
                    1: 2,
                    2: 2,
                    3: 2
                },speedList: {
                    1: 3,
                    2: 3,
                    3: 3
                },
            },
            powersurge:{
                name: "Power Surge",
                icon: "powersurge",
                targetList: {
                    1: 1,
                    2: 1,
                    3: 1
                },
                description: 'Deal {HP_PERCENT}% of your current health to yourself, then to an enemy.',
                skillObj: {
                    HP_PERCENT: {
                        name: "Hp Percent",
                        percent: true,
                        1: 10,
                        2: 15,
                        3: 25
                    }
                },
                requires: {
                    1: {action: ["chargeattack", "chargeblast"]},
                    2: {},
                    3: {}
                },
                maxLevel: 3,
                cooldownList: {
                    1: 3,
                    2: 3,
                    3: 2
                },speedList: {
                    1: 2,
                    2: 2,
                    3: 2
                },
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
                maxLevel: 2,
                requires: {
                    1: {level: 2, strength: 5},
                    2: {level: 5, strength: 10, vitality: 10}
                }
            },
            bloodchop:{
                name: "Blood Chop",
                icon: "bloodchop",
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
                icon: "savagestrike",
                description: 'Suffer damage, then deal a strike that penetrates defense.',
                requires: {
                    1: {action: ["roar"]},
                    2: {},
                    3: {}
                },
                maxLevel: 3
            },
            bloodboil:{
                name: "Blood Boil",
                icon: "bloodboil",
                description: "Grants 5 rage. Skills that damage yourself grant you rage. Rage is used to make your other skills stronger.",
                maxLevel: 2,
                requires: {
                    1: {action: ["bloodchop", "savagestrike"]},
                    2: {}
                },
            },
            bloodcontract:{
                name: "Blood Contract",
                icon: "bloodcontract",
                description: 'Lose 20% hp and gain 25% vitality.',
                maxLevel: 1,
                requires: {
                    1: {action: ["bloodboil"]}
                }
            },
            bloodleech:{
                name: "Blood Leech",
                icon: "bloodleech",
                description: 'An attack that steals life based off strength.',
                requires: {
                    1: {action: ["bloodboil"]},
                    2: {}
                },
                maxLevel: 2
            },
            bloodcleanse:{
                name: "Blood Cleanse",
                icon: "bloodcleanse",
                description: 'Consumes all rage to heal and remove all negative debuffs.',
                requires: {
                    1: {action: ["bloodcontract", "bloodleech"]},
                    2: {}
                },
                maxLevel: 2
            },
            bloodslash:{
                name: "Blood Slash",
                icon: "bloodslash",
                description: 'Suffer damage, then deal a slash to multiple targets.',
                requires: {
                    1: {action: ["bloodcleanse"]},
                    2: {},
                    3: {}
                },
                maxLevel: 3
            },
            earthshatter:{
                name: "Earth Shatter",
                icon: "earthshatter",
                description: 'Deals 3 waves of damage to everyone.',
                requires: {
                    1: {action: ["bloodcleanse"]},
                    2: {},
                    3: {}
                },
                maxLevel: 3
            },
            lastgrasp:{
                name: "Last Grasp",
                icon: "lastgrasp",
                description: 'A powerful attack based off having low HP. Can only use when HP is lower than 50%.',
                maxLevel: 3,
                requires: {
                    1: {action: ["bloodslash", "earthshatter"]},
                    2: {},
                    3: {}
                },
            },
        },
        knight: {
            piercingblow: {
                name: "Piercing Blow",
                icon: "piercingblow",
                description: 'Deals damage that goes through shield.',
                auto: true,
                maxLevel: 3,
                requires: {
                    1: {level: 2, strength: 3, vitality: 3},
                    2: {level: 5, strength: 10, vitality: 10},
                    3: {level: 10, strength: 15, vitality: 15}
                }
            },
            twinmaim:{
                name: "Twin Maim",
                icon: "twinmaim",
                description: "Strikes two enemies and gives them an armor reduction debuff.",
                maxLevel: 1,
                requires: {
                    1: {action: ["piercingblow"]}
                }
            },
            riposte:{
                name: "Riposte",
                icon: "riposte",
                description: "Deals an attack that if that enemy is attacking you after that attack, it will interrupt it.",
                maxLevel: 1,
                requires: {
                    1: {action: ["piercingblow"]}
                },
            },
            shieldup:{
                name: "Shield Up",
                icon: "shieldup",
                description: 'Gain shield.',
                maxLevel: 1,
                requires: {
                    1: {action: ["twinmaim", "riposte"]}
                },
            },
            triplestrike:{
                name: "Triple Strike",
                icon: "triple",
                description: 'Attacks three enemies.',
                requires: {
                    1: {action: ["shieldup"]}
                },
                maxLevel: 3
            },
            chargingshield:{
                name: "Charging Shield",
                icon: "chargingshield",
                description: 'Gain shield, then after a turn deal a powerful attack.',
                requires: {
                    1: {action: ["shieldup"]}
                },
                maxLevel: 3
            },
            nullifyingaura:{
                name: "Nullifying Aura",
                icon: "nullifyingaura",
                description: 'Grants two friendly targets an aura that blocks the next magic attack.',
                requires: {
                    1: {action: ["triplestrike", "chargingshield"]}
                },
                maxLevel: 3
            },
            shieldbash:{
                name: "Shield Bash",
                icon: "shieldbash",
                description: 'Strikes with an attack that scales with current shield value. Has a chance to stun.',
                requires: {
                    1: {action: ["nullifyingaura"]}
                },
                maxLevel: 3
            },
            shieldcrash:{
                name: "Shield Crash",
                icon: "shieldcrash",
                description: 'Consumes all your shield to deal a powerful attack.',
                requires: {
                    1: {action: ["nullifyingaura"]}
                },
                maxLevel: 3
            },
            shieldabsorption:{
                name: "Shield Absorption",
                icon: "shieldabsorption",
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
    punch: {
        name: "Punch",
        icon: "punch",
        description: "An basic attack that deals {BASE} physical damage.",
        skillObj: {
            BASE: {
                name: "Base",
                1: 5
            },
            STRENGTH: {
                name: "Strength",
                1: 3
            }
        },
        maxLevel: 1,
        targetList: {
            1: 1
        },
        description: 'A basic attack that deals damage.'
    },
    arrowStorm: {
        name: "Arrow Storm",
        icon: "arrowstorm",
        cooldown: 1,
        mpCost: 3,
        targetAmount: 3,
        auto: true,
        description: `Rains 3-4 arrows randomly on your enemies.`,
        damageFunction: combatant => Math.max(1, combatant.level + Math.round(combatant.agility / 5))
    },
    slash: {
        name: "Slash",
        targetAmount: 1,
        cooldown: 3,
        icon: "slash",
        description: 'A Powerful strike of a sword.',
        damageFunction: combatant => Math.max(1, combatant.level + Math.round(combatant.strength / 2))
    },
    roar: {
        name: "Roar",
        targetAmount: 3,
        friendly: true,
        duration: 2,
        cooldown: 4,
        mpCost: 3,
        icon: "roar",
        auto: true,
        description: "Grants all teammates and self a buff that increases your attack by 50%."
    },
    heal: {
        name: "Heal",
        targetAmount: 1,
        friendly: true,
        icon: "heal"
    },
    revive: {
        name: "Revive",
        targetAmount: 1,
        friendly: true,
        targetDead: true
    }
}

Object.keys(Actions).forEach(action=>{
    window.Actions[action].skillName = action
    window.Actions[action].typeName = "basic"
    window.Actions[action].className = "basic"
})

window.ActionClasses = {
    punch: (config, battle)=>new PunchAction(config, battle),
    arrowStorm: (config, battle)=>new ArrowStormAction(config, battle),
    slash: (config, battle)=>new SlashAction(config, battle),
    roar: (config, battle)=>new RoarAction(config, battle),
    absorption: (config, battle)=>new AbsorptionAction(config, battle),
    bluebonecrusher: (config, battle)=>new BlueboneCrusherAction(config, battle),
    chargeattack: (config, battle)=>new ChargeAttackAction(config, battle),
    chargeblast: (config, battle)=>new ChargeBlastAction(config, battle),
    defup: (config, battle)=>new DefupAction(config, battle),
    powersurge: (config, battle)=>new PowersurgeAction(config, battle),
    protection: (config, battle)=>new ProtectionAction(config, battle),
    redbonecrusher: (config, battle)=>new RedboneCrusherAction(config, battle),
    reflect: (config, battle)=>new ReflectAction(config, battle),
    withdraw: (config, battle)=>new WithdrawAction(config, battle),
}