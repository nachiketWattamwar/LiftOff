import React, { Component } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

let dataBar1 = {
  labels: ["2015", "2016", "2017", "2018", "2019"],
  datasets: [
    {
      label: "Nasa Budget (in millions)",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: []
    }
  ]
};

let dataBar2 = {
  labels: ["2015", "2016", "2017", "2018", "2019"],
  datasets: [
    {
      label: "Nasa Budget (in millions)",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: []
    }
  ]
};

let linedata1 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Nasa satellites launches",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    }
  ]
};

let linedata2 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Nasa satellites launches",
      fill: true,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    }
  ]
};

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //name: "reactApp",
      data1: linedata1,
      dataBar1: dataBar1,
      data2: linedata2,
      dataBar2: dataBar2
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/nasaData`).then(res => {
      linedata1.datasets[0].data = res.data;
      console.log("=================res line data========", res.data);
      this.setState({
        data1: linedata1
      });
    });

    axios.get(`http://localhost:3001/nasaspacebudget`).then(res => {
      //console.log("====================res budget================", res);
      dataBar1.datasets[0].data = res.data;
      //console.log("==============linedata is ===========", linedata);
      this.setState({
        dataBar1: dataBar1
      });
    });

    axios.get(`http://localhost:3001/nasaspacebudget`).then(res => {
      //console.log("====================res budget================", res);
      dataBar2.datasets[0].data = res.data;
      //console.log("==============linedata is ===========", linedata);
      this.setState({
        dataBar2: dataBar2
      });
    });

    axios.get(`http://localhost:3001/nasaspacebudget`).then(res => {
      //console.log("====================res budget================", res);
      dataBar1.datasets[0].data = res.data;
      //console.log("==============linedata is ===========", linedata);
      this.setState({
        dataBar1: dataBar1
      });
    });
  }
  render() {
    return (
      <div class='chart-container'>
        <Line
          width='500px'
          height='80px'
          data={this.state.data1}
          options={{
            maintainAspectRatio: true,
            responsive: true
          }}
        />
        {/* <Line
          width='500px'
          height='80px'
          data={this.state.data}
          options={{
            maintainAspectRatio: true,
            responsive: true
          }}
        /> */}
        <Bar
          width='500px'
          height='80px'
          data={this.state.dataBar1}
          options={{
            maintainAspectRatio: true,
            responsive: true
          }}
        />
        {/* <Bar
          width='500px'
          height='80px'
          data={this.state.dataBar}
          options={{
            maintainAspectRatio: true,
            responsive: true
          }}
        /> */}
      </div>
    );
  }
}
