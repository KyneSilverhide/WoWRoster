(function () {

    var app = angular.module('RosterControllers', []);

    app.controller("GuildController", ['$scope', 'ArmoryService', 'AlertService', 'DataService', 'usSpinnerService', '$filter',
        function ($scope, ArmoryService, AlertService, DataService, usSpinnerService, $filter) {

            // Pagination
            $scope.currentPage = 1;
            $scope.pageSize = 10;

            $scope.guildName = null;
            $scope.maxLevelOnly = true;

            // Init
            $scope.classes = [];
            $scope.specializations = [];
            var classes = DataService.getClasses();
            for (var index in classes) {
                $scope.classes.push(classes[index].name);
                var classSpecs = classes[index].specialization;
                for (var wowClass in classSpecs) {
                    $scope.specializations.push(wowClass);
                }
            }

            $scope.accordion = {
                buffOpen: true,
                cdOpen: false
            };

            // Members
            $scope.characters = [];

            $scope.getFilteredCharacters = function () {
                var sortedCharacters = $filter('orderBy')($scope.characters, 'name');
                if ($scope.maxLevelOnly) {
                    sortedCharacters = $filter('filter')(sortedCharacters, {level: 100});
                }
                return sortedCharacters;
            };

            $scope.getCharacterCount = function () {
                return $scope.getFilteredCharacters().length;
            };

            $scope.$on('fetch-characters', function () {
                $scope.fetchCharacters();
            });

            $scope.fetchCharacters = function () {
                $scope.lastError = null;
                $scope.characters = [];

                if (ArmoryService.getRegion().replace(" ", "") === '' ||
                    ArmoryService.getRealm().replace(" ", "") === '' ||
                    ArmoryService.getGuildName().replace(" ", "") === '') {
                    AlertService.addAlert('warning', 'You have to fill all three fields');
                } else {
                    usSpinnerService.spin('armory-config-spinner');
                    ArmoryService.getCharacters()
                        .success(function (data) {
                            // Convert to a character list
                            storeCharacters(data);
                            resetPopOvers();
                            // Save these new correct values
                            ArmoryService.saveInStorage();
                            $scope.guildName = ArmoryService.getRealm() + "/" + ArmoryService.getGuildName();
                            usSpinnerService.stop('armory-config-spinner');
                        }).error(function (data, status, headers, config, statusText) {
                            if (status == "404") {
                                AlertService.addAlert('warning', 'No guild named ' + ArmoryService.getGuildName() +
                                ' was found on ' + ArmoryService.getRealm() + '(' + ArmoryService.getRegion() + ')');
                            } else {
                                AlertService.addAlert('danger', ArmoryService.asError(status, statusText));
                            }
                            usSpinnerService.stop('armory-config-spinner');
                        });

                    function storeCharacters(data) {
                        angular.forEach(data.members, function (value) {
                            var member = {
                                name: value.character.name,
                                level: value.character.level,
                                spec: !value.character.spec ? null : value.character.spec.name,
                                role: !value.character.spec ? null : value.character.spec.role,
                                wowClass: classes[value.character.class],
                                classLabel: classes[value.character.class].name
                            };
                            $scope.characters.push(member);
                        });
                    }

                    function resetPopOvers() {
                        $('[data-toggle="popover"]').popover({
                            container: 'body'
                        });
                    }
                }
            };

            // Roster
            $scope.roster = {};
            $scope.rosterCount = 0;
            $scope.roles = DataService.getRoles();

            // Buffs
            $scope.buffs = DataService.getBuffs();
            $scope.availableBuffs = {};

            $scope.cooldowns = DataService.getCooldowns();
            $scope.availableCDs = {};

            $scope.getRosterData = function () {
                var armorData = [
                    {"label": "Plate", "value": 0},
                    {"label": "Mail", "value": 0},
                    {"label": "Leather", "value": 0},
                    {"label": "Cloth", "value": 0}
                ];
                var classData = [];
                for (index in classes) {
                    classData.push({
                        label: classes[index].name,
                        value: 0,
                        color: classes[index].color
                    });
                }

                for (var role in $scope.roster) {
                    for (index in $scope.roster[role]) {
                        var member = $scope.roster[role][index];

                        for (var armorIndex in armorData) {
                            if (armorData[armorIndex].label == member.wowClass.armor) {
                                armorData[armorIndex].value++;
                            }
                        }
                        for (var classIndex in classData) {
                            if (classData[classIndex].label == member.wowClass.name) {
                                classData[classIndex].value++;
                            }
                        }
                    }
                }
                return {
                    armorData: armorData,
                    classData: classData
                };
            };

            var armorDonut = null;
            var classDonut = null;
            $scope.$watch('rosterCount', function () {
                setTimeout(function () { //Using a timeout to prevent a bug : morris doesn't like to be used on hidden DOM...
                    if ($scope.rosterCount > 0) {
                        var rosterData = $scope.getRosterData();
                        if (!armorDonut && !classDonut) {
                            armorDonut = Morris.Donut({
                                element: 'armor-donut',
                                data: rosterData.armorData,
                                colors: ["#F8BD7F", "#D79F64", "#825322", "#5F3406"],
                                resize: true
                            });
                            classDonut = Morris.Donut({
                                element: 'class-donut',
                                data: rosterData.classData,
                                resize: true
                            });
                        } else {
                            armorDonut.setData(rosterData.armorData);
                            classDonut.setData(rosterData.classData);
                        }
                    }
                }, 200);
            });

            $scope.getCount = function (role) {
                if ($scope.roster[role.id]) {
                    return $scope.roster[role.id].length;
                }
                return 0;
            };

            $scope.getTankCount = function () {
                return $scope.getCount($scope.roles.Tank);
            };

            $scope.getHealerCount = function () {
                return $scope.getCount($scope.roles.Heal);
            };

            $scope.getNonHealerCount = function () {
                return $scope.rosterCount - $scope.getHealerCount();
            };

            $scope.validHealerCount = function () {
                return $scope.rosterCount > 0 && $scope.getHealerCount() >= 1 &&
                    $scope.getHealerCount() * 4 >= $scope.getNonHealerCount() &&
                    ($scope.getHealerCount() - 1) * 4 < $scope.getNonHealerCount();
            };

            $scope.get = function (role) {
                return $scope.roster[role.id];
            };

            function updateBuff(memberSpec) {
                if (memberSpec.buffs) {
                    // 0 = Missing. 0,5 = Available, but exclusive. 1+ = Available
                    var processedExclusiveBuffs = [];
                    for (var index in memberSpec.buffs) {
                        var buffDef = memberSpec.buffs[index];
                        // If this buff was not already handled as an exclusive buff
                        if ($.inArray(buffDef.buff.id, processedExclusiveBuffs) == -1) {
                            // If the buff is not yet initialized
                            if (!$scope.availableBuffs[buffDef.buff.id]) {
                                $scope.availableBuffs[buffDef.buff.id] = {
                                    buff: buffDef.buff, count: 0
                                };
                            }
                            var currentBuffStatus;
                            if (buffDef.exclusive) {
                                // Only one of these two buff is actually available. Raid leader has to choose
                                currentBuffStatus = $scope.availableBuffs[buffDef.buff.id];

                                var otherBuff = buffDef.exclusive;
                                // Init the other buff
                                if (!$scope.availableBuffs[otherBuff.id]) {
                                    $scope.availableBuffs[otherBuff.id] = {
                                        buff: otherBuff, count: 0
                                    };
                                }
                                var otherBuffStatus = $scope.availableBuffs[otherBuff.id];

                                var count;
                                var otherCount;
                                if (currentBuffStatus.count >= 1 && otherBuffStatus.count >= 1) { //Both already available
                                    count = 0.5;
                                    otherCount = 0.5;
                                } else if (otherBuffStatus.count >= 1) { //Only the other is available
                                    count = 1;
                                    otherCount = 0.5;
                                } else if (currentBuffStatus.count >= 1) { // This one is available
                                    count = 0.5;
                                    otherCount = 1;
                                } else { //None available
                                    count = 0.5;
                                    otherCount = 0.5;
                                }
                                currentBuffStatus.count += count;
                                currentBuffStatus.exclusive = buffDef.exclusive;
                                otherBuffStatus.count += otherCount; // Mark the other too

                                processedExclusiveBuffs.push(otherBuff.id);
                            } else {
                                // Buff is simply available
                                currentBuffStatus = $scope.availableBuffs[buffDef.buff.id];
                                if (currentBuffStatus.count == 0.5) {
                                    // This buff will be available, so we may also set the other exclusive buff to available
                                    var exclusiveBuffStatus = $scope.availableBuffs[currentBuffStatus.exclusive.id];
                                    exclusiveBuffStatus.count += 0.5;
                                }
                                currentBuffStatus.count += 1;
                            }
                            processedExclusiveBuffs.push(buffDef.buff.id);
                        } else {
                            // This buff is (probably) exclusive, so only add the link ,the counter has already been updated
                            if (buffDef.exclusive) {
                                currentBuffStatus = $scope.availableBuffs[buffDef.buff.id];
                                currentBuffStatus.exclusive = buffDef.exclusive;
                            }
                        }
                    }
                }
            }

            function updateCD(memberSpec) {
                if (memberSpec.cooldowns) {
                    // 0 = Missing. 0.5 = Available, but exclusive. 1+ = Available
                    var processedExclusiveCDs = [];
                    for (var index in memberSpec.cooldowns) {
                        var cdDef = memberSpec.cooldowns[index];
                        // If this cooldown was not already handled as an exclusive cooldown
                        if ($.inArray(cdDef.cooldown.id, processedExclusiveCDs) == -1) {
                            // If the cooldown is not yet initialized
                            if (!$scope.availableCDs[cdDef.cooldown.id]) {
                                $scope.availableCDs[cdDef.cooldown.id] = {
                                    cooldown: cdDef.cooldown, count: 0
                                };
                            }
                            var currentCDstatus;
                            if (cdDef.exclusive) {
                                // Only one of these two cooldown is actually available. Raid leader has to choose
                                currentCDstatus = $scope.availableCDs[cdDef.cooldown.id];

                                var otherCD = cdDef.exclusive;
                                // Init the other cooldown
                                if (!$scope.availableCDs[otherCD.id]) {
                                    $scope.availableCDs[otherCD.id] = {
                                        cooldown: otherCD, count: 0
                                    };
                                }
                                var otherCDstatus = $scope.availableCDs[otherCD.id];

                                var count;
                                var otherCount;
                                if (currentCDstatus.count >= 1 && otherCDstatus.count >= 1) { //Both already available
                                    count = 0.5;
                                    otherCount = 0.5;
                                } else if (otherCDstatus.count >= 1) { //Only the other is available
                                    count = 1;
                                    otherCount = 0.5;
                                } else if (currentCDstatus.count >= 1) { // This one is available
                                    count = 0.5;
                                    otherCount = 1;
                                } else { //None available
                                    count = 0.5;
                                    otherCount = 0.5;
                                }
                                currentCDstatus.count += count;
                                currentCDstatus.exclusive = cdDef.exclusive;
                                otherCDstatus.count += otherCount; // Mark the other too

                                processedExclusiveCDs.push(otherCD.id);
                            } else {
                                // Buff is simply available
                                currentCDstatus = $scope.availableCDs[cdDef.cooldown.id];
                                if (currentCDstatus.count == 0.5) {
                                    // This cooldown will be available, so we may also set the other exclusive cooldown to available
                                    var exclusiveCDStatus = $scope.availableCDs[currentCDstatus.exclusive.id];
                                    exclusiveCDStatus.count += 0.5;
                                }
                                currentCDstatus.count += 1;
                            }
                            processedExclusiveCDs.push(cdDef.cooldown.id);
                        } else {
                            // This cooldown is (probably) exclusive, so only add the link ,the counter has already been updated
                            if (cdDef.exclusive) {
                                currentCDstatus = $scope.availableCDs[cdDef.cooldown.id];
                                currentCDstatus.exclusive = cdDef.exclusive;
                            }
                        }
                    }
                }
            }

            $scope.addToRoster = function (member) {
                // Find the current specialization
                var memberClass = member.wowClass;
                var memberSpec = memberClass.specialization[member.spec.replace(" ", "")];
                if (memberSpec) {
                    // Add to the matching role in the roster
                    var memberRole = memberSpec.role.id;
                    if (!$scope.roster[memberRole]) {
                        $scope.roster[memberRole] = [];
                    }
                    $scope.roster[memberRole].push(member);
                    $scope.rosterCount++;

                    // Check for new buffs
                    updateBuff(memberSpec);
                    updateCD(memberSpec);
                } else {
                    AlertService.addAlert('warning', 'This character (' + member.name + ') has no valid specialization');
                }
            };

            $scope.removeFromRoster = function (member) {
                var memberClass = member.wowClass;
                var memberSpec = memberClass.specialization[member.spec.replace(" ", "")];
                var memberRole = memberSpec.role.id;
                $scope.roster[memberRole].splice($.inArray(member, $scope.roster[memberRole]), 1);
                $scope.rosterCount--;

                $scope.availableBuffs = {};
                // Instead of trying to computer all counts and following all exclusive links, we just recompute from scratch.
                // The code is much more easy, buf-free, but a bit more costly to execute. For a full roster (30 members),
                // and an average of ~3 buff/ member, that's still less than 100 values to process.
                for (var curRole in $scope.roster) {
                    for (var index in $scope.roster[curRole]) {
                        var curMember = $scope.roster[curRole][index];
                        var curMemberClass = curMember.wowClass;
                        var curMemberSpec = curMemberClass.specialization[curMember.spec.replace(" ", "")];
                        updateBuff(curMemberSpec);
                    }
                }

            };

            $scope.hasBeenAddedToRoster = function (member) {
                var memberClass = member.wowClass;
                var memberSpec = memberClass.specialization[member.spec.replace(" ", "")];
                if (memberSpec) {
                    if (!memberSpec.role) {
                        console.log(memberSpec + " is invalid");
                    }
                    var memberRole = memberSpec.role.id;
                    if ($scope.roster[memberRole]) {
                        var matches = $filter('filter')($scope.roster[memberRole], {name: member.name});
                        return matches.length > 0;
                    }

                }
                return false;
            };

            $scope.isBuffAvailable = function (buff) {
                return $scope.availableBuffs[buff.id] && $scope.availableBuffs[buff.id].count > 0.5;
            };

            $scope.isBuffMissing = function (buff) {
                return !$scope.availableBuffs[buff.id] || $scope.availableBuffs[buff.id].count === 0.0;
            };

            $scope.isBuffExclusiveAvailable = function (buff) {
                return $scope.availableBuffs[buff.id] && $scope.availableBuffs[buff.id].count == 0.5;
            };

            $scope.generateBuffTooltip = function (buff) {
                var tooltip = "";
                var classes = DataService.getClasses();
                for (var index in classes) {
                    var classColor = classes[index].color;
                    var classSpecs = classes[index].specialization;
                    var specs = "";
                    var classHasBuff = false;
                    for (var spec in classSpecs) {
                        var specDef = classSpecs[spec];
                        for (var buffIndex in specDef.buffs) {
                            var otherBuffDef = specDef.buffs[buffIndex];
                            if (buff.id == otherBuffDef.buff.id) {
                                classHasBuff = true;
                                specs += (spec + " ");
                            }
                        }
                    }
                    if (classHasBuff) {
                        tooltip += "<span class='member-span'><span class='label label-member'><i class='glyphicon glyphicon-stop' style='color:" + classColor + "'></i> " + specs + "</span>";
                    }
                }
                return tooltip;
            };

            $scope.generateCooldownTooltip = function (cooldown) {
                var tooltip = "";
                var classes = DataService.getClasses();
                for (var index in classes) {
                    var classColor = classes[index].color;
                    var classSpecs = classes[index].specialization;
                    var specs = "";
                    var classHasCD = false;
                    for (var spec in classSpecs) {
                        var specDef = classSpecs[spec];
                        for (var cdIndex in specDef.cooldowns) {
                            var otherCDDef = specDef.cooldowns[cdIndex];
                            if (cooldown.id == otherCDDef.cooldown.id) {
                                classHasCD = true;
                                specs += (spec + " ");
                            }
                        }
                    }
                    if (classHasCD) {
                        tooltip += "<span class='member-span'><span class='label label-member'><i class='glyphicon glyphicon-stop' style='color:" + classColor + "'></i> " + specs + "</span>";
                    }
                }
                return tooltip;
            };

            $scope.isCDavailable = function (cooldown) {
                return $scope.availableCDs[cooldown.id] && $scope.availableCDs[cooldown.id].count > 0.5;
            };

            $scope.isCDmissing = function (cooldown) {
                return !$scope.availableCDs[cooldown.id] || $scope.availableCDs[cooldown.id].count === 0.0;
            };

            $scope.isCDExclusiveAvailable = function (cooldown) {
                return $scope.availableCDs[cooldown.id] && $scope.availableCDs[cooldown.id].count == 0.5;
            };

            $scope.clearRoster = function () {
                $scope.roster = [];
                $scope.rosterCount = 0;
                $scope.availableBuffs = {};
            };

            var allSavedRosters = {};
            if(typeof(Storage) !== "undefined" && localStorage.getItem("all-saved-rosters") != null) {
                allSavedRosters = angular.fromJson(localStorage.getItem("all-saved-rosters"));
            }

            $scope.getNormalizedFullGuildName = function() {
                var fullGuildName = ArmoryService.getRegion() + "_" + ArmoryService.getRealm() + "_" + ArmoryService.getGuildName();
                return fullGuildName.replace(new RegExp(" ", 'g'), "");
            };

            $scope.getSavedRosters = function() {
                var fullGuildName = $scope.getNormalizedFullGuildName();
                return allSavedRosters[fullGuildName] || [];
            };

            $scope.rosterName = "My new roster";
            $scope.rosterUseExistingName = function() {
                var fullGuildName = $scope.getNormalizedFullGuildName();
                if(allSavedRosters.hasOwnProperty(fullGuildName)) {
                    var validRosters = allSavedRosters[fullGuildName];
                    if (validRosters) {
                        for (var index in validRosters) {
                            var roster = validRosters[index];
                            if (roster.name == $scope.rosterName) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            };

            $scope.saveRoster = function () {
                if(typeof(Storage) == "undefined") {
                    AlertService.addAlert('warning', "We can't save your roster : your browser doesn't support local storage.");
                } else {
                    var fullGuildName = $scope.getNormalizedFullGuildName();
                    var newRoster = {
                        name: $scope.rosterName,
                        members: []
                    };

                    for (var role in $scope.roster) {
                        for (index in $scope.roster[role]) {
                            var member = $scope.roster[role][index];
                            newRoster.members.push(member);
                        }
                    }
                    var validRosters = allSavedRosters[fullGuildName] || [];
                    validRosters.push(newRoster);
                    allSavedRosters[fullGuildName] = validRosters;
                    if (typeof(Storage) !== "undefined") {
                        localStorage.setItem("all-saved-rosters", angular.toJson(allSavedRosters));
                    }
                }
            };

            $scope.addonExportText = "";
            $scope.importRoster = function() {
                $scope.clearRoster();
                try {
                    var importedName = $scope.rosterName;
                    var importedText = $scope.addonExportText;

                    var rows = importedText.split('\n');
                    rows.splice(0, 1); //Remove header
                    var memberNames = rows[0].split(';');
                    for(var index in memberNames) {
                        var memberName = memberNames[index];
                        for(var memberIndex in $scope.characters) {
                            var member = $scope.characters[memberIndex];
                            if(member.name == memberName) {
                                $scope.addToRoster(member);
                            }
                        }
                    }
                } catch(e) {
                    AlertService.addAlert('warning', 'Incorrect format');
                }
            };

            $scope.loadRoster = function(roster) {
                // Clear current roster
                $scope.clearRoster();

                // Find matching roster...
                $scope.getNormalizedFullGuildName(ArmoryService);
                var validRosters = $scope.getSavedRosters();
                for(var index in validRosters) {
                    var savedRoster = validRosters[index];
                    if(savedRoster.name == roster.name) {
                        for(var memberIndex in savedRoster.members) {
                            //... and load it
                            var member = savedRoster.members[memberIndex];
                            $scope.addToRoster(member);
                        }
                    }
                }
                $scope.rosterName = roster.name;
            };

            $scope.deleteRoster = function (roster) {
               // Find matching roster...
                var fullGuildName = $scope.getNormalizedFullGuildName();
                var validRosters = $scope.getSavedRosters();
                for(var index in validRosters) {
                    var savedRoster = validRosters[index];
                    if(savedRoster.name == roster.name) {
                        validRosters.splice($.inArray(roster, validRosters), 1);
                        if (typeof(Storage) !== "undefined") {
                            localStorage.setItem("all-saved-rosters", angular.toJson(allSavedRosters));
                        } else {
                            AlertService.addAlert('warning', "We can't delete your roster : your browser doesn't support local storage.");
                        }
                    }
                }
            };
        }]);
})();
