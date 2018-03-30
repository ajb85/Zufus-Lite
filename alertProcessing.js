import { AlertMission } from "./classes.js";

export default function translateAlert(data) {
  var alertMish = [];
  data.forEach(function(alert) {
    var rewardPath = alert.MissionInfo.missionReward;
    var countedItemsPath = rewardPath.countedItems;
    var itemsPath = rewardPath.items;
    var creditsPath = rewardPath.credits;
    var reward = [];
    if (itemsPath) {
      reward = [itemsPath[0], creditsPath];
    } else if (countedItemsPath) {
      reward = [
        [countedItemsPath[0].ItemType, countedItemsPath[0].ItemCount],
        creditsPath
      ];
    }
    if (reward.length > 0) {
      var dir = alert.MissionInfo;
      var codedAlert = new AlertMission(
          reward,
          dir.missionType,
          dir.location,
          alert.Expiry.$date.$numberLong,
          alert._id.$oid
        );
        var translated = codedAlert.translate();
        alertMish.push(translated);
    }
  });
  return alertMish;
}
