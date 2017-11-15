import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Toolbar, SimpleTable, GridListWidget } from './index'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import axios from 'axios';

class DashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "Bonn",
      open: true,
      dataSource: [],
      width: window.innerWidth,
      height: window.innerHeight,
      expanded: true,
      subtitle: null,
      status: "ON",
      time: new Date().toLocaleTimeString(),
      data: [
        {day: "Monday", beginning: "9:00", end: "17:00"},
        {day: "Tuesday", beginning: "9:00", end: "17:00"},
        {day: "Wednesday", beginning: "9:00", end: "17:00"},
        {day: "Thursday", beginning: "9:00", end: "17:00"},
        {day: "Friday", beginning: "9:00", end: "17:00"},
        {day: "Saturday", beginning: "9:00", end: "17:00"},
        {day: "Sunday", beginning: "9:00", end: "17:00"},
      ],
    };

  }

  updateDimensions() {
      this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  componentWillMount() {
      this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener("resizeDB", this.updateDimensions.bind(this));
    let url = "http://openweathermap.org/data/2.5/weather?q=" + this.state.city + "&appid=b1b15e88fa797225412429c1c50c122a1"
    axios.get(url)
    .then(res => {
      console.log("bonn",res.data)
      this.setState({weather:res.data})
      this.setState({subtitle:`${res.data.clouds.all}% Cloudy`})
      this.setState({subtitle2:`${this.state.status} at ${this.state.time}`})

      var dateSunrise = new Date(res.data.sys.sunrise*1000);
      var hoursSunrise = dateSunrise.getHours();
      var minutesSunrise = "0" + dateSunrise.getMinutes();
      var secondsSunrise = "0" + dateSunrise.getSeconds();
      var formattedSunrise = hoursSunrise + ':' + minutesSunrise.substr(-2) + ':' + secondsSunrise.substr(-2);

      var dateSunset = new Date(res.data.sys.sunset*1000);
      var hoursSunset = dateSunset.getHours();
      var minutesSunset = "0" + dateSunset.getMinutes();
      var secondsSunset = "0" + dateSunset.getSeconds();
      var formattedSunset = hoursSunset + ':' + minutesSunset.substr(-2) + ':' + secondsSunset.substr(-2);

      this.setState({sunrise: formattedSunrise})
      this.setState({sunset: formattedSunset})
      this.setState({temp: res.data.main.temp})
    });
  }

  // componentDidUpdate() {
  //     window.addEventListener("resizeDB", this.updateDimensions.bind(this));
  //     let url = "http://openweathermap.org/data/2.5/weather?q=" + this.state.city + "&appid=b1b15e88fa797225412429c1c50c122a1"
  //     axios.get(url)
  //     .then(res => {
  //       console.log("bonn",res.data)
  //       this.setState({weather:res.data})
  //       this.setState({subtitle:`${res.data.clouds.all}% Cloudy`})
  //       this.setState({subtitle2:`${this.state.status} at ${this.state.time}`})
  //
  //       var dateSunrise = new Date(res.data.sys.sunrise*1000);
  //       var hoursSunrise = dateSunrise.getHours();
  //       var minutesSunrise = "0" + dateSunrise.getMinutes();
  //       var secondsSunrise = "0" + dateSunrise.getSeconds();
  //       var formattedSunrise = hoursSunrise + ':' + minutesSunrise.substr(-2) + ':' + secondsSunrise.substr(-2);
  //
  //       var dateSunset = new Date(res.data.sys.sunset*1000);
  //       var hoursSunset = dateSunset.getHours();
  //       var minutesSunset = "0" + dateSunset.getMinutes();
  //       var secondsSunset = "0" + dateSunset.getSeconds();
  //       var formattedSunset = hoursSunset + ':' + minutesSunset.substr(-2) + ':' + secondsSunset.substr(-2);
  //
  //       this.setState({sunrise: formattedSunrise})
  //       this.setState({sunset: formattedSunset})
  //       this.setState({temp: res.data.main.temp})
  //     });
  // }

  componentWillUnmount() {
      window.removeEventListener("resizeDB", this.updateDimensions.bind(this));
  }

  handleChange = (event) => {
    console.log(this.state.city)
    this.setState({
      city: event.target.value,
    });
  };

  render() {
    let tableList
    let calendarList
    if(this.state.weather) {
      tableList = (
        <div>
        <TableRow style={{borderBottom:"none", height:"30px"}}>
          <TableRowColumn style={{height:"30px"}}>Status</TableRowColumn>
          <TableRowColumn style={{height:"30px"}}>{this.state.subtitle2}</TableRowColumn>
        </TableRow>
          <TableRow style={{borderBottom:"none", height:"30px"}}>
            <TableRowColumn style={{height:"30px"}}>Sunrise</TableRowColumn>
            <TableRowColumn style={{height:"30px"}}>{this.state.sunrise}</TableRowColumn>
          </TableRow>
          <TableRow style={{borderBottom:"none", height:"30px"}}>
            <TableRowColumn  style={{height:"30px"}}>Sunset</TableRowColumn>
            <TableRowColumn  style={{height:"30px"}}>{this.state.sunset}</TableRowColumn>
          </TableRow>
          <TableRow style={{borderBottom:"none", height:"30px"}}>
            <TableRowColumn  style={{height:"30px"}}>Temperature</TableRowColumn>
            <TableRowColumn  style={{height:"30px"}}>{this.state.temp}</TableRowColumn>
          </TableRow>
        </div>
      )
      calendarList = Object.keys(this.state.data).map((k) => {
        return (
          <TableRow key={k} style={{borderBottom:"none"}}>
            <TableRowColumn>{this.state.data[k].day}</TableRowColumn>
            <TableRowColumn><TextField id={k+1} value={this.state.data[k].beginning}/></TableRowColumn>
            <TableRowColumn><TextField id={k+2}value={this.state.data[k].end}/></TableRowColumn>
          </TableRow>
        )
      })
      return (
        <div style={{height:`${this.state.height}px`, width:`${this.state.width-256}px`, paddingLeft:256, overflowY:'auto'}}>
          <Card style={{padding:"10px", margin:"10px"}}>
            <CardHeader
              title={this.state.weather.name}
              subtitle={this.state.subtitle}
            />
            <CardTitle title="Status" subtitle={this.state.subtitle2} expandable={true} />
            <CardText>
              <Table>
                <TableBody displayRowCheckbox={false}>
                    {tableList}
                </TableBody>
              </Table>
            </CardText>
          </Card>
          <Card style={{padding:"10px", margin:"10px"}}>
            <CardHeader
              title={"Calendar"}
              subtitle={"Set Schedule"}
            />
            <CardTitle title="Status" subtitle={this.state.status} expandable={true} />
            <CardText>
              <Table>
                <TableBody displayRowCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>Day</TableHeaderColumn>
                  <TableHeaderColumn>Beginning</TableHeaderColumn>
                  <TableHeaderColumn>End</TableHeaderColumn>
                </TableRow>
                {calendarList}
                </TableBody>
              </Table>
            </CardText>
          </Card>
        </div>
      )
    } else {
      return (
        <div style={{height:`${this.state.height}px`, width:`${this.state.width-256}px`, paddingLeft:256, overflowY:'auto'}}>
        </div>
      )
    }
  }
}

const mapStoreToProps = (store) => {
  return {
    main: store.main
  }
}

const Dashboard = connect(mapStoreToProps)(DashboardComponent)
export default Dashboard
