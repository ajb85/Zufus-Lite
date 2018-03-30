import WFWS from "warframe-worldstate-data";
const missionType = WFWS.missionTypes;
const factionData = WFWS.factions;
const rewardsData = WFWS.languages;
const nodeData = WFWS.solNodes;
const sortieData = WFWS.sortie;

class Mission {
  constructor(missionType, location, expiration) {
    this.location = location;
    this.missionType = missionType;
    this.expiration = expiration;
  }
  getTimeLeft() {
    var timeInMilliseconds = [
      [86400000, "d"],
      [3600000, "h"],
      [60000, "m"],
      [1000, "s"]
    ];
    var timeConversions = [1000, 60, 60, 24, 35];
    var timeString = "";
    var time = this.expiration - new Date();

    timeInMilliseconds.forEach(function(milliArray, i) {
      var dummy = 0;
      if (time >= milliArray[0]) {
        dummy = time;
        timeConversions.forEach(function(dividend, i, oriArr) {
          if (i < oriArr.length - 1) {
            dummy /= dividend;
          } else {
            dummy %= dividend;
          }
        });
        if (dummy > 0) {
          timeString += `${Math.floor(dummy)}${milliArray[1]} `;
        }
      }
      timeConversions.splice(-1, 1);
    });
    return timeString.trim();
  }
  getLocationName() {
    //return nodeData[this.Location];
  }
  getMissionTypeName() {
    //return missionData[this.missionType];
  }
}

class AlertMission extends Mission {
  constructor(missionReward, missionType, location, expiration, mishID) {
    super(missionType, location, expiration);
    this.missionReward = missionReward;
    this.mishID = mishID;
  }

  translate() {
    //countedItems missionReward -> [[item, number], credits]
    //items missionReward -> [item, credits];
    //If missionReward[0] has a length of 2, it must be an Array, thus
    //countedItems
    var reward = "";
    if (this.missionReward[0].length === 2) {
      reward = `${this.missionReward[0][1]} ${
        rewardsData[this.missionReward[0][0].toLowerCase()].value
      }`;
    } else {
      reward = rewardsData[this.missionReward[0].toLowerCase()].value;
    }
    var creditReward = `${this.missionReward[1]} credits`;
    var mishTranslate = {
      rewardName: reward,
      credits: creditReward,
      mission: missionType[this.missionType].value,
      node: nodeData[this.location].value,
      timeLeft: this.getTimeLeft(this.expiration),
      mishID: this.mishID
    };
    return mishTranslate;
  }
}

class SortieMission extends Mission {
  constructor(bossName, missionType, modifierType, location, expiration) {
    super(missionType, location, expiration);
    this.bossName = bossName;
    this.modifierType = modifierType;
  }
  translate() {
    var mishTranslate = {
      bossName: sortieData.bosses[this.bossName].name,
      timeLeft: this.getTimeLeft(this.expiration),
      mission: missionType[this.missionType].value,
      modifier: sortieData.modifierTypes[this.modifierType],
      node: nodeData[this.location].value
    };
    return mishTranslate;
  }
}

class FissureMission extends Mission {
  constructor(missionType, modifier, location, expiration){
    super(missionType, location, expiration);
    this.modifier = modifier;
  }

  translate(){
    var codedModOrder = ["VoidT1", "VoidT2", "VoidT3", "VoidT4"];
    var modOrder = ["Lith", "Meso", "Neo", "Axi"];
    var mod = modOrder[codedModOrder.indexOf(this.modifier)];
    const mishTranslate = {
      mission: missionType[this.missionType].value,
      modifier: mod,
      node: nodeData[this.location].value,
      timeLeft: this.getTimeLeft(this.expiration),
      enemy: nodeData[this.location].enemy
    };
    return mishTranslate;
  }
}

class InvasionMission {
  constructor(attackerReward, defenderReward, location, count, goal) {
    this.location = location;
    this.attackerReward = attackerReward;
    this.defenderReward = defenderReward;
    this.count = count;
    this.goal = goal;
  }

  translate() {
    //countedItem = [item, count]
    //items = [item]
    var defReward = "";
    var atkReward = "";
    if(this.attackerReward.length === 2){
      atkReward = `${this.attackerReward[1]} ${rewardsData[this.attackerReward[0].toLowerCase()].value}`
    } else if (this.attackerReward.length === 1) {
      atkReward = `${rewardsData[this.attackerReward[0].toLowerCase()].value}`
    }

    if(this.defenderReward.length === 2){
      defReward = `${this.defenderReward[1]} ${rewardsData[this.defenderReward[0].toLowerCase()].value}`
    } else if (this.defenderReward.length === 1) {
      defReward = `${rewardsData[this.defenderReward[0].toLowerCase()].value}`
    }

    const mishTranslate = {
      atkRewardName: atkReward,
      defRewardName: defReward,
      node: nodeData[this.location].value,
      completion: `${Math.round(Math.abs(this.count / this.goal) * 100)}%`
    };
    return mishTranslate;
  }
}



export { AlertMission, SortieMission, FissureMission, InvasionMission };
