var roles = {
    Tank: {role: 'Tank', id: 'Tank', label: 'Tanks'},
    RangedDPS: {role: 'DPS', id: 'RangedDPS', label: 'Ranged DPS'},
    MeleeDPS: {role: 'DPS', id: 'MeleeDPS', label: 'Melee DPS'},
    Heal: {role: 'Heal', id: 'Heal', label: 'Heals'}
};

var buffs = {
    StatsMultiply: {
        id: "stats",
        name: "+5% Strength, Agility, and Intellect"
    },
    Stamina: {
        id: 'stamina',
        name: "+10% Stamina"
    },
    AttackPower: {
        id: 'atkpower',
        name: "+10% Attack Power"
    },
    SpellPower: {
        id: 'spellpower',
        name: "+10% Spell Power"
    },
    BurstHaste: {
        id: 'bl',
        name: "Temporary +30% Haste (Bloodlust/Heroism/Time warp)"
    },
    Mastery: {
        id: 'mastery',
        name: "+550 Mastery"
    },
    Haste: {
        id: 'haste',
        name: "+5% Haste"
    },
    CriticalStrike: {
        id: 'crit',
        name: "+5% Critical Strike Chance"
    },
    MultiStrike: {
        id: 'mstrike',
        name: "+5% Multistrike Chance"
    },
    Versatility: {
        id: 'versatility',
        name: "+3% Versatility"
    },
    MortalWounds: {
        id: 'mortalwounds',
        name: "-25% Healing Received (boss)"
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
                buffs: [buffs.Stamina, buffs.AttackPower]
            },
            Fury: {
                role: roles.MeleeDPS,
                buffs: [buffs.Stamina, buffs.AttackPower, buffs.Versatility, buffs.MortalWounds]
            },
            Arms: {
                role: roles.MeleeDPS,
                buffs: [buffs.Stamina, buffs.AttackPower, buffs.Versatility, buffs.MortalWounds]
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
                buffs: [buffs.StatsMultiply, buffs.Mastery, buffs.Versatility]
            },
            Protection: {
                role: roles.Tank,
                buffs: [buffs.StatsMultiply, buffs.Mastery]
            },
            Holy: {
                role: roles.Heal,
                buffs: [buffs.StatsMultiply, buffs.Mastery]
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
                buffs: [buffs.AttackPower]
            },
            Marksmanship: {
                role: roles.RangedDPS,
                buffs: [buffs.AttackPower]
            },
            Survival: {
                role: roles.RangedDPS,
                buffs: [buffs.AttackPower]
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
                buffs: [buffs.Haste, buffs.MultiStrike, buffs.MortalWounds]
            },
            Combat: {
                role: roles.MeleeDPS,
                buffs: [buffs.Haste, buffs.MultiStrike, buffs.MortalWounds]
            },
            Subtlety: {
                role: roles.MeleeDPS,
                buffs: [buffs.Haste, buffs.MultiStrike, buffs.MortalWounds]
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
                buffs: [buffs.Stamina]
            },
            Holy: {
                role: roles.Heal,
                buffs: [buffs.Stamina]
            },
            Shadow: {
                role: roles.RangedDPS,
                buffs: [buffs.Stamina, buffs.Haste, buffs.MultiStrike]
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
                buffs: [buffs.AttackPower, buffs.Mastery]
            },
            Frost: {
                role: roles.MeleeDPS,
                buffs: [buffs.AttackPower, buffs.Haste, buffs.Versatility]
            },
            Unholy: {
                role: roles.MeleeDPS,
                buffs: [buffs.AttackPower, buffs.Haste, buffs.Versatility]
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
                buffs: [buffs.BurstHaste, buffs.Mastery, buffs.Haste]
            },
            Enhancement: {
                role: roles.MeleeDPS,
                buffs: [buffs.BurstHaste, buffs.Mastery, buffs.Haste]
            },
            Restoration: {
                role: roles.Heal,
                buffs: [buffs.BurstHaste, buffs.Mastery, buffs.Haste]
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
                buffs: [buffs.BurstHaste, buffs.SpellPower, buffs.CriticalStrike]
            },
            Fire: {
                role: roles.RangedDPS,
                buffs: [buffs.BurstHaste, buffs.SpellPower, buffs.CriticalStrike]
            },
            Frost: {
                role: roles.RangedDPS,
                buffs: [buffs.BurstHaste, buffs.SpellPower, buffs.CriticalStrike]
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
                buffs: [buffs.Stamina, buffs.SpellPower, buffs.MultiStrike]
            },
            Demonology: {
                role: roles.RangedDPS,
                buffs: [buffs.Stamina, buffs.SpellPower, buffs.MultiStrike, buffs.MortalWounds]
            },
            Destruction: {
                role: roles.RangedDPS,
                buffs: [buffs.Stamina, buffs.SpellPower, buffs.MultiStrike]
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
                buffs: [buffs.StatsMultiply, buffs.CriticalStrike]
            },
            Mistweaver: {
                role: roles.Heal,
                buffs: [buffs.StatsMultiply]
            },
            Windwalker: {
                role: roles.MeleeDPS,
                buffs: [buffs.StatsMultiply, buffs.CriticalStrike, buffs.MultiStrike, buffs.MortalWounds]
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
                buffs: [buffs.StatsMultiply, buffs.Mastery, buffs.Versatility]
            },
            Feral: {
                role: roles.MeleeDPS,
                buffs: [buffs.StatsMultiply, buffs.Versatility, buffs.CriticalStrike]
            },
            Guardian: {
                role: roles.Tank,
                buffs: [buffs.StatsMultiply, buffs.Versatility, buffs.CriticalStrike]
            },
            Restoration: {
                role: roles.Heal,
                buffs: [buffs.StatsMultiply, buffs.Versatility]
            }
        }
    }
};