import React, { Component } from "react";
import worldStateFetch from "./fetchWSData.js";
import translateAlert from "./alertProcessing.js";
import translateSortie from "./sortieProcessing.js";
import translateInvasion from "./invasionProcessing.js";
import translateFissure from "./fissureProcessing.js";
import {
  AlertOutputFormat,
  SortieOutputFormat,
  InvasionOutputFormat,
  FissureOutputFormat
} from "./OutputFormat.js";
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.loopFetch();
    clearInterval(this.interval10);
    this.interval10 = setInterval(() => this.loopFetch(), 10000);

  }
  loopFetch() {
    const self = this;
    worldStateFetch().then(function(data) {
      self.loopFunctions(self, data);
      clearInterval(self.interval1);
      self.interval1 = setInterval(() => self.loopFunctions(self, data), 1000);

    });
  }
  loopFunctions(self, data) {
    //Process Sorties
    const sortieData = translateSortie(data.Sorties[0]);
    self.setState({ sortie: sortieData });
    //Process Alerts
    const alertsData = translateAlert(data.Alerts);
    self.setState({ alerts: alertsData });
    //Process Fissures
    const fissureData = translateFissure(data.ActiveMissions);
    self.setState({ fissures: fissureData });
    //Process InfestedInvasionBoss
    const invasionData = translateInvasion(data.Invasions);
    self.setState({ invasions: invasionData });
  }
  render() {
    return (
      <div class="container container-fluid">
        <h1>Zufus Lite</h1>
        <div class="row align-items-start">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
            <div class="segment">
              {this.state &&
                this.state.sortie && (
                  <SortieOutputFormat data={this.state.sortie} />
                )}
            </div>
            <div class="segment">
              <h3>Alerts</h3>
              <dl>
                {this.state &&
                  this.state.alerts && (
                    <AlertOutputFormat data={this.state.alerts} />
                  )}
              </dl>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
            <div class="segment">
              <h3>Fissures</h3>
              <d1>
                {this.state &&
                  this.state.fissures && (
                    <FissureOutputFormat data={this.state.fissures} />
                  )}
              </d1>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
            <div class="segment">
              <h3>Invasions</h3>
              <d1>
                {this.state &&
                  this.state.invasions && (
                    <InvasionOutputFormat data={this.state.invasions} />
                  )}
              </d1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//<div class="segment">
//</div>

export default App;
