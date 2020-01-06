import React, { Component } from "react";
import PF from "pathfinding";

const initialState = {
  grid: new PF.Grid(30, 30),
  path: [],
  option: '',
  option: '',
  start: '',
  finish: '',
  wall: ''

}

export default class Finder extends Component {
  state = initialState

  componentDidMount() {

    const grid = new PF.Grid(30, 30);

    this.setState({ grid });

    console.log("grid1", grid.nodes);

  }

  componentDidUpdate(_, prevState) {
    const { start, finish, wall, grid } = this.state
    if (prevState != this.state) {

      if (start != '') {
        document.getElementById(`${start[0]},${start[1]}`).style.backgroundColor = 'blue';
      }

      if (finish != '') {
        document.getElementById(`${finish[0]},${finish[1]}`).style.backgroundColor = 'orange';
      }

      if (wall != '') {
        grid.setWalkableAt(this.state.wall[0], this.state.wall[1], false);
        document.getElementById(`${wall[0]},${wall[1]}`).style.backgroundColor = 'red';
      }
    }
  }

  // function to find the path
  getPath = () => {
    const { grid, start, finish } = this.state
    // create backup of grid to use in the path
    var gridBackup = grid.clone();
    console.log('gridNoPath', gridBackup)
    const finder = new PF.AStarFinder();
    // coordinates x,y start point x,y end point 
    let path = finder.findPath(start[0], start[1], finish[0], finish[1], gridBackup);
    this.setState({ path })
    console.log('path', path)
  };

  //function to animate the path
  animateShortestPath = () => {
    const { path } = this.state
    console.log(path)
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const node = path[i];
        document.getElementById(`${node[0]},${node[1]}`).style.backgroundColor = 'yellow';
        console.log('node', node)
      }, 150 * i);
    }
  }



  handleCoord = (e) => {
    const { start, finish, wall, grid, option } = this.state
    e.preventDefault();
    var node = (e.target.id.split(','))
    var x = Number(node[0])
    var y = Number(node[1])
    var coord = [x, y]

    if (option === 'start') {
      this.setState({ start: coord })
      console.log('state start', start)
      document.getElementById(`${start[0]},${start[1]}`).style.backgroundColor = 'green';
    }

    if (option === 'finish') {
      this.setState({ finish: coord })
      console.log('state finish', finish)
    }

    if (option === 'wall') {
      this.setState({ wall: coord })
      console.log('state wall', wall)

    }
  }

  handleOptionChange = e => {
    this.setState({ option: e.target.value })
  }

  restart() {

    this.forceUpdate()
    console.log(this.path)
  }

  render() {
    var { grid } = this.state;
    var grids = grid.nodes;

    return (
      <div>
        <button onClick={this.getPath} style={{ borderRadius: '4px', marginLeft: '5px' }}>
          Find path
        </button>
        <button onClick={this.animateShortestPath} style={{ borderRadius: '4px', marginLeft: '5px' }}>
          Go path
        </button>
        <button onClick={this.restart} style={{ borderRadius: '4px', marginLeft: '5px' }}>
          Restart
        </button>

        <form style={{ marginTop: '10px' }}>
          <label>
            <input type="radio" value="start" style={{ marginLeft: '10px' }} checked={this.state.option === 'start'} onChange={this.handleOptionChange} />
            Start
          </label>
          <label>
            <input type="radio" value="finish" style={{ marginLeft: '10px' }} checked={this.state.option === 'finish'} onChange={this.handleOptionChange} />
            Finish
          </label>
          <label>
            <input type="radio" value="wall" style={{ marginLeft: '10px' }} checked={this.state.option === 'wall'} onChange={this.handleOptionChange} />
            Wall
          </label>
        </form>

        <div
          style={{
            display: "flex",
            flexDirection: 'column',
            margin: "20px"
          }}
        >
          {grids.map(grid => (
            <div
              className="row"
              key={grid.id}
              data={grid}
              style={{
                display: 'flex',
                margin: "0px",
                padding: "0px",
              }}
            >
              {/* {console.log("gridAqui", grid)} */}
              {grid.map((elem, Id) => (
                <div
                  id={`${elem.x},${elem.y}`}
                  key={Id.id}
                  data={elem}
                  onClick={this.handleCoord}
                  style={{
                    background: elem.walkable === true ? 'green' : 'red',
                    border: '1px solid #000',
                    width: '10px',
                    height: '10px',
                    margin: '0px',
                    padding: '0px'
                  }}
                >
                  {/* {console.log("elemAqui", elem)} */}
                  {/* <p style={{ fontSize: '10px', textAlign: 'center' }}>{`${elem.x} , ${elem.y} , ${elem.walkable}`}</p> */}
                </div>
              ))}
            </div>
          ))
          }
        </div>
      </div>
    );
  }
}

// getCoordinates = (e) => {
  //  this function get coordinates off all screen at pass the mouse
  //   window.addEventListener('mousemove', function (e) {
  //     console.log(e.x, e.y)
  //   })
  // }
