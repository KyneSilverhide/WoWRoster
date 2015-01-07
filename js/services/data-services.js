(function (angular) {
    var app = angular.module('DataServices', []);

    app.factory('DataService', function () {

        var roles = {
            Tank: {role: 'Tank', id: 'Tank', label: 'Tanks'},
            RangedDPS: {role: 'DPS', id: 'RangedDPS', label: 'Ranged DPS'},
            MeleeDPS: {role: 'DPS', id: 'MeleeDPS', label: 'Melee DPS'},
            Heal: {role: 'Heal', id: 'Heal', label: 'Heals'}
        };

        var buffs = {
            StatsMultiply: {
                id: 'stats',
                name: '+5% Strength, Agility, and Intellect'
            },
            Stamina: {
                id: 'stamina',
                name: '+10% Stamina'
            },
            AttackPower: {
                id: 'atkpower',
                name: '+10% Attack Power'
            },
            SpellPower: {
                id: 'spellpower',
                name: '+10% Spell Power'
            },
            BurstHaste: {
                id: 'bl',
                name: 'Temporary +30% Haste (Bloodlust/Heroism/Time warp)'
            },
            Mastery: {
                id: 'mastery',
                name: '+550 Mastery'
            },
            Haste: {
                id: 'haste',
                name: '+5% Haste'
            },
            CriticalStrike: {
                id: 'crit',
                name: '+5% Critical Strike Chance'
            },
            MultiStrike: {
                id: 'mstrike',
                name: '+5% Multistrike Chance'
            },
            Versatility: {
                id: 'versatility',
                name: '+3% Versatility'
            },
            MortalWounds: {
                id: 'mortalwounds',
                name: '-25% Healing Received (boss)'
            }
        };
        var cooldowns = {
            tranquility: {
                id: 'tranq',
                name: 'Tranqulity',
                desc: 'Healing all party and raid members within 40 yards for (250.2% of Spell' +
                    'power) every 2 sec.',
                cd: 3
            },
            ironbark: {
                id: 'ironb',
                name: 'Ironbark',
                desc: 'Reducing all damage taken by 20%.  Lasts 12 sec.',
                cd: 1
            },
            ampMagic: {
                id: 'ampMagic',
                name: 'Amplify Magic',
                desc: 'Amplify the effects of helpful magic, increasing all healing received' +
                'by 10% for all party and raid members within 100 yards. Lasts 6 sec.',
                cd: 2
            },
            aotf: {
                id: 'aotf',
                name: 'Aspect of the Fox',
                desc: 'Able to move while casting all spells',
                cd: 3
            },
            revival: {
                id: 'revival',
                name: 'Revival',
                desc: 'eals all party and raid members within 100 yards for (1193.25% of Spell' +
                    'power) and clears them of all harmful Magical, Poison, and Disease effects.',
                cd: 3
            },
            lifeCocoon: {
                id: 'lifeCocoon',
                name: 'Life Cocoon',
                desc: 'Absorbing 0 damage, and periodic healing received increased by 50%.',
                cd: 2
            },
            devo: {
                id: 'devo',
                name: 'Devotion Aura',
                desc: 'Immune to Silence and Interrupt effects. Magic damage taken reduced by 20%.',
                cd: 3
            },
            barrier: {
                id: 'barrier',
                name: 'Power Word: Barrier',
                desc: 'Summons a holy barrier on the target location that reduces all damage' +
                    'done to friendly targets by 25%. While within the barrier, spellcasting' +
                    'will not be interrupted by damage. The barrier lasts for 10 sec.',
                cd: 3
            },
            painSup: {
                id: 'painSup',
                name: 'Pain Suppression',
                desc: 'Damage reduction on target',
                cd: 3
            },
            lightWell: {
                id: 'lightWell',
                name: 'Light Well',
                desc: 'Friendly players can click the Lightwell to restore' +
                    ' health over 6 sec.  Lightwell lasts for 3 min or 15 charges.',
                cd: 3
            },
            dHymn: {
                id: 'dHymn',
                name: 'Divine Hymn',
                desc: 'Heals all party or raid members within 40 yards for 4 over 8' +
                    'sec, and increases healing done to them by 10% for 8 sec.',
                cd: 3
            },
            guardianSpirit: {
                id: 'guardianSpirit',
                name: 'Guardian Spirit',
                desc: 'Heals the target for damage taken',
                cd: 3
            },
            smokebomb: {
                id: 'smokebomb',
                name: 'Smoke Bomb',
                desc: 'Damage reduction',
                cd: 3
            },
            healingTide: {
                id: 'healingTide',
                name: 'Healing Tide',
                desc: 'a totem that heals',
                cd: 3
            },
            sLink: {
                id: 'sLink',
                name: 'Spirit Link',
                desc: 'circle of reduc',
                cd: 3
            },
            rCry: {
                id: 'rCry',
                name: 'Rallying Cry',
                desc: 'Banner that increases raid hp by 20%',
                cd: 3
            },
            vigil: {
                id: 'vigil',
                name: 'Vigilence',
                desc: 'Reduces damage on target by 40%',
                cd: 3
            }
        };

        var classes = {
            1: {
                name: 'Warrior',
                color: '#C79C6E',
                armor: 'Plate',
                specialization: {
                    Protection: {
                        role: roles.Tank,
                        buffs: [{
                            buff: buffs.Stamina,
                            exclusive: buffs.AttackPower
                        }, {
                            buff: buffs.AttackPower,
                            exclusive: buffs.Stamina
                        }],
                        cooldowns: [
                            {
                                cooldown: cooldowns.vigil
                            }
                        ]
                    },
                    Fury: {
                        role: roles.MeleeDPS,
                        buffs: [{
                            buff: buffs.Stamina,
                            exclusive: buffs.AttackPower
                        }, {
                            buff: buffs.AttackPower,
                            exclusive: buffs.Stamina
                        }, {
                            buff: buffs.Versatility
                        }, {
                            buff: buffs.MortalWounds
                        }],
                        cooldowns: [
                            {
                                cooldown: cooldowns.rCry
                            },
                            {
                                cooldown: cooldowns.vigil
                            }
                        ]
                    },
                    Arms: {
                        role: roles.MeleeDPS,
                        buffs: [{
                            buff: buffs.Stamina,
                            exclusive: buffs.AttackPower
                        }, {
                            buff: buffs.AttackPower,
                            exclusive: buffs.Stamina
                        }, {
                            buff: buffs.Versatility
                        }, {
                            buff: buffs.MortalWounds
                        }],
                        cooldowns: [
                            {
                                cooldown: cooldowns.rCry
                            },
                            {
                                cooldown: cooldowns.vigil
                            }
                        ]
                    }
                }
            },
            2: {
                name: 'Paladin',
                color: '#F58CBA',
                armor: 'Plate',
                specialization: {
                    Retribution: {
                        role: roles.MeleeDPS,
                        buffs: [{
                            buff: buffs.StatsMultiply,
                            exclusive: buffs.Mastery
                        }, {
                            buff: buffs.Mastery,
                            exclusive: buffs.StatsMultiply
                        }, {
                            buff: buffs.Versatility
                        }]
                    },
                    Protection: {
                        role: roles.Tank,
                        buffs: [{
                            buff: buffs.StatsMultiply,
                            exclusive: buffs.Mastery
                        }, {
                            buff: buffs.Mastery,
                            exclusive: buffs.StatsMultiply
                        }]
                    },
                    Holy: {
                        role: roles.Heal,
                        buffs: [{
                            buff: buffs.StatsMultiply,
                            exclusive: buffs.Mastery
                        }, {
                            buff: buffs.Mastery,
                            exclusive: buffs.StatsMultiply
                        }],
                        cooldowns: [
                            {
                                cooldown: cooldowns.devo
                            }
                        ]
                    }
                }
            },
            3: {
                name: 'Hunter',
                color: '#ABD473',
                armor: 'Mail',
                specialization: {
                    BeastMastery: {
                        role: roles.RangedDPS,
                        buffs: [{
                            buff: buffs.AttackPower
                        }],
                        cooldowns: [
                            {
                                cooldown: cooldowns.aotf
                            }
                        ]
                    },
                    Marksmanship: {
                        role: roles.RangedDPS,
                        buffs: [{
                            buff: buffs.AttackPower
                        }],
                        cooldowns: [
                            {
                                cooldown: cooldowns.aotf
                            }
                        ]
                    },
                    Survival: {
                        role: roles.RangedDPS,
                        buffs: [{
                            buff: buffs.AttackPower
                        }],
                        cooldowns: [
                            {
                                cooldown: cooldowns.aotf
                            }
                        ]
                    }
                }
            },
            4: {
                name: 'Rogue',
                color: '#FFF569',
                armor: 'Leather',
                specialization: {
                    Assassination: {
                        role: roles.MeleeDPS,
                        buffs: [{
                            buff: buffs.Haste
                        }, {
                            buff: buffs.MultiStrike
                        }, {
                            buff: buffs.MortalWounds
                        }],
                        cooldowns: [
                            {
                                cooldown: cooldowns.smokebomb
                            }
                        ]
                    },
                    Combat: {
                        role: roles.MeleeDPS,
                        buffs: [{
                            buff: buffs.Haste
                        }, {
                            buff: buffs.MultiStrike
                        }, {
                            buff: buffs.MortalWounds
                        }],
                        cooldowns: [
                            {
                                cooldown: cooldowns.smokebomb
                            }
                        ]
                    },
                    Subtlety: {
                        role: roles.MeleeDPS,
                        buffs: [{
                            buff: buffs.Haste
                        }, {
                            buff: buffs.MultiStrike
                        }, {
                            buff: buffs.MortalWounds
                        }],
                        cooldowns: [
                            {
                                cooldown: cooldowns.smokebomb
                            }
                        ]
                    }
                }
            },
            5: {
                name: 'Priest',
                color: '#FFFFFF',
                armor: 'Cloth',
                specialization: {
                    Discipline: {
                        role: roles.Heal,
                        buffs: [{
                            buff: buffs.Stamina
                        }],
                        cooldowns: [
                            {
                                cooldown: cooldowns.barrier
                            },
                            {
                                cooldown: cooldowns.painSup
                            }
                        ]
                    },
                    Holy: {
                        role: roles.Heal,
                        buffs: [{
                            buff: buffs.Stamina
                        }],
                        cooldowns: [
                            {
                                cooldown: cooldowns.dHymn
                            },
                            {
                                cooldown: cooldowns.lightWell
                            },
                            {
                                cooldown: cooldowns.guardianSpirit
                            }
                        ]
                    },
                    Shadow: {
                        role: roles.RangedDPS,
                        buffs: [{
                            buff: buffs.Stamina
                        }, {
                            buff: buffs.Haste
                        }, {
                            buff: buffs.MultiStrike
                        }]
                    }
                }
            },
            6: {
                name: 'Death Knight',
                color: '#C41F3B',
                armor: 'Plate',
                specialization: {
                    Blood: {
                        role: roles.Tank,
                        buffs: [{
                            buff: buffs.AttackPower
                        }, {
                            buff: buffs.Mastery
                        }]
                    },
                    Frost: {
                        role: roles.MeleeDPS,
                        buffs: [{
                            buff: buffs.AttackPower
                        }, {
                            buff: buffs.Haste
                        }, {
                            buff: buffs.Versatility
                        }]
                    },
                    Unholy: {
                        role: roles.MeleeDPS,
                        buffs: [{
                            buff: buffs.AttackPower
                        }, {
                            buff: buffs.Haste
                        }, {
                            buff: buffs.Versatility
                        }]
                    }
                }
            },
            7: {
                name: 'Shaman',
                color: '#0070DE ',
                armor: 'Mail',
                specialization: {
                    Elemental: {
                        role: roles.RangedDPS,
                        buffs: [{
                            buff: buffs.BurstHaste
                        }, {
                            buff: buffs.Mastery
                        }, {
                            buff: buffs.Haste
                        }]
                    },
                    Enhancement: {
                        role: roles.MeleeDPS,
                        buffs: [{
                            buff: buffs.BurstHaste
                        }, {
                            buff: buffs.Mastery
                        }, {
                            buff: buffs.Haste
                        }]
                    },
                    Restoration: {
                        role: roles.Heal,
                        buffs: [{
                            buff: buffs.BurstHaste
                        }, {
                            buff: buffs.Mastery
                        }, {
                            buff: buffs.Haste
                        }],
                        cooldowns: [
                            {
                                cooldown: cooldowns.healingTide
                            },
                            {
                                cooldown: cooldowns.sLink
                            }
                        ]
                    }
                }
            },
            8: {
                name: 'Mage',
                color: '#69CCF0',
                armor: 'Cloth',
                specialization: {
                    Arcane: {
                        role: roles.RangedDPS,
                        buffs: [{
                            buff: buffs.BurstHaste
                        }, {
                            buff: buffs.SpellPower
                        }, {
                            buff: buffs.CriticalStrike
                        }],
                        cooldowns: [
                            {
                                cooldown: cooldowns.ampMagic
                            }
                        ]
                    },
                    Fire: {
                        role: roles.RangedDPS,
                        buffs: [{
                            buff: buffs.BurstHaste
                        }, {
                            buff: buffs.SpellPower
                        }, {
                            buff: buffs.CriticalStrike
                        }],
                        cooldowns: [
                            {
                                cooldown: cooldowns.ampMagic
                            }
                        ]
                    },
                    Frost: {
                        role: roles.RangedDPS,
                        buffs: [{
                            buff: buffs.BurstHaste
                        }, {
                            buff: buffs.SpellPower
                        }, {
                            buff: buffs.CriticalStrike
                        }],
                        cooldowns: [
                            {
                                cooldown: cooldowns.ampMagic
                            }
                        ]
                    }
                }
            },
            9: {
                name: 'Warlock',
                color: '#9482C9',
                armor: 'Cloth',
                specialization: {
                    Affliction: {
                        role: roles.RangedDPS,
                        buffs: [{
                            buff: buffs.Stamina
                        }, {
                            buff: buffs.SpellPower
                        }, {
                            buff: buffs.MultiStrike
                        }]
                    },
                    Demonology: {
                        role: roles.RangedDPS,
                        buffs: [{
                            buff: buffs.Stamina,
                            exclusive: buffs.MortalWounds
                        }, {
                            buff: buffs.SpellPower
                        }, {
                            buff: buffs.MultiStrike
                        }, {
                            buff: buffs.MortalWounds,
                            exclusive: buffs.Stamina
                        }]
                    },
                    Destruction: {
                        role: roles.RangedDPS,
                        buffs: [{
                            buff: buffs.Stamina
                        }, {
                            buff: buffs.SpellPower
                        }, {
                            buff: buffs.MultiStrike
                        }]
                    }
                }
            },
            10: {
                name: 'Monk',
                color: '#00FF96',
                armor: 'Leather',
                specialization: {
                    Brewmaster: {
                        role: roles.Tank,
                        buffs: [{
                            buff: buffs.StatsMultiply
                        }, {
                            buff: buffs.CriticalStrike
                        }]
                    },
                    Mistweaver: {
                        role: roles.Heal,
                        buffs: [{
                            buff: buffs.StatsMultiply
                        }],
                        cooldowns: [
                            {
                                cooldown: cooldowns.revival
                            },
                            {
                                cooldown: cooldowns.lifeCocoon
                            }
                        ]
                    },
                    Windwalker: {
                        role: roles.MeleeDPS,
                        buffs: [{
                            buff: buffs.StatsMultiply
                        }, {
                            buff: buffs.CriticalStrike
                        }, {
                            buff: buffs.MultiStrike
                        }, {
                            buff: buffs.MortalWounds
                        }]
                    }
                }
            },
            11: {
                name: 'Druid',
                color: '#FF7D0A',
                armor: 'Leather',
                specialization: {
                    Balance: {
                        role: roles.RangedDPS,
                        buffs: [{
                            buff: buffs.StatsMultiply
                        }, {
                            buff: buffs.Mastery
                        }, {
                            buff: buffs.Versatility
                        }]
                    },
                    Feral: {
                        role: roles.MeleeDPS,
                        buffs: [{
                            buff: buffs.StatsMultiply
                        }, {
                            buff: buffs.Versatility
                        }, {
                            buff: buffs.CriticalStrike
                        }]
                    },
                    Guardian: {
                        role: roles.Tank,
                        buffs: [{
                            buff: buffs.StatsMultiply
                        }, {
                            buff: buffs.Versatility
                        }, {
                            buff: buffs.CriticalStrike
                        }]
                    },
                    Restoration: {
                        role: roles.Heal,
                        buffs: [
                            {
                                buff: buffs.StatsMultiply
                            }, {
                                buff: buffs.Versatility
                            }
                        ],
                        cooldowns: [
                            {
                                cooldown: cooldowns.tranquility
                            },
                            {
                                cooldown: cooldowns.ironbark
                            }
                        ]
                    } // end resto
                } //end spec
            } // end class
        };

        return {
            getBuffs: function () {
                return buffs;
            },
            getClasses: function () {
                return classes;
            },
            getRoles: function () {
                return roles;
            },
            getCooldowns: function () {
                return cooldowns;
            }
        };

    });

})(angular);