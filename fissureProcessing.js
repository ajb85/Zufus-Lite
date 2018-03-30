import { FissureMission } from "./classes.js";

export default function translateFissure(data) {
  var fissureMish = [];
  data.forEach(function(fissure) {
      var codedFissure = new FissureMission(
        fissure.MissionType,
        fissure.Modifier,
        fissure.Node,
        fissure.Expiry.$date.$numberLong
        );
        var translated = codedFissure.translate();
        fissureMish.push(translated);
  });
  return fissureMish;
}
