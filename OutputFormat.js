import React, { Component } from "react";

class SortieOutputFormat extends Component {
  render(){
    var sortieData = this.props.data;
    var output = sortieData.map(function(sortie){
      return (<span><dt>{sortie.mission.toString()}</dt>
                 <dd>{sortie.modifier.toString()}</dd></span>);
    });
    output.unshift(<span><h3>{sortieData[0].bossName}</h3>{sortieData[0].timeLeft.toString()}</span>);
    return output;
  }
}

class AlertOutputFormat extends Component {
  render(){
    var alertData = this.props.data;
    var output = alertData.map(function(alert){
      return (<span><dt>{alert.rewardName.toString()} ({alert.timeLeft.toString()})</dt>
                 <dd>{alert.credits.toString()} - {alert.mission.toString()} - {alert.node.toString()}</dd></span>);
    });
    return output;
  }
}

class FissureOutputFormat extends Component {
  render(){
    var fissureData = this.props.data;
    var output = fissureData.map(function(fissure){
      return (<span><dt>{fissure.modifier.toString()} {fissure.mission.toString()} ({fissure.timeLeft.toString()})</dt>
                 <dd>{fissure.enemy.toString()} - {fissure.node}</dd></span>);
    });
    return output;
  }
}

class InvasionOutputFormat extends Component {
  render(){
    var invasionData = this.props.data;
    var output = invasionData.map(function(invasion){
      var reward = "";
      if(invasion.atkRewardName.length === 0){
        reward = invasion.defRewardName.toString();
      } else if (invasion.defRewardName.length === 0){
        reward = invasion.atkRewardName.toString();
      } else{
        reward = `${invasion.atkRewardName.toString()} vs. ${invasion.defRewardName.toString()}`;
      }
      return (<span><dt>{reward}</dt>
                 <dd>{invasion.node.toString()} - {invasion.completion}</dd></span>);
    });
    return output;
  }
}


export {AlertOutputFormat, SortieOutputFormat, FissureOutputFormat, InvasionOutputFormat};
