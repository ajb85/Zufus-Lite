import { InvasionMission } from "./classes.js";

export default function translateInvasion(data) {
  var invasions = [];
  data.forEach(function(mission) {
    if (Math.abs(mission.Count) < mission.Goal) {
      const defRewardPath = mission.DefenderReward;
      const defCountedItemsPath = defRewardPath.countedItems;
      const defItemsPath = defRewardPath.items;
      const atkRewardPath = mission.AttackerReward;
      const atkCountedItemsPath = atkRewardPath.countedItems;
      const atkItemsPath = atkRewardPath.items;
      var atkReward = [];
      var defReward = [];

      if (defCountedItemsPath) {
        defReward = [
          defCountedItemsPath[0].ItemType,
          defCountedItemsPath[0].ItemCount
        ];
      } else if (defItemsPath) {
        defReward = [defItemsPath[0]];
      }

      if (atkCountedItemsPath) {
        atkReward = [
          atkCountedItemsPath[0].ItemType,
          atkCountedItemsPath[0].ItemCount
        ];
      } else if (atkItemsPath) {
        atkReward = [atkItemsPath[0]];
      }
      
      const codedInvasion = new InvasionMission(
        atkReward,
        defReward,
        mission.Node,
        mission.Count,
        mission.Goal
      );
      var translated = codedInvasion.translate();
      invasions.push(translated);
    }
  });
  return invasions;
}
