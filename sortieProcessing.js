import { SortieMission } from "./classes.js";
import sortieOutputCode from "./OutputFormat.js";

export default function translateSortie(data) {
  var sortieMish = [];
  var bossName = data.Boss;
  var expiration = data.Expiry.$date.$numberLong;
  data.Variants.forEach(function(mission) {
    var codedSortie = new SortieMission(
      bossName,
      mission.missionType,
      mission.modifierType,
      mission.node,
      expiration
    );
    var translated = codedSortie.translate();
    sortieMish.push(translated);
  });
  return sortieMish;
}
