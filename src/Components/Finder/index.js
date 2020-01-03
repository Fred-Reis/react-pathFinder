import React, { Component, Fragment } from "react";
import PF from "pathfinding";

const initialState = new PF.Grid(30, 30);
const isStart = [9, 0];
const isFinish = [9, 4];
const isWall = [0, 1]

export default class Finder extends Component {
  state = {
    grid: initialState,
    path: [],
  };

  componentDidMount() {

    const grid = new PF.Grid(30, 30);

    // define way of can't be used
    grid.setWalkableAt(isWall[0], isWall[1], false);
    grid.setWalkableAt(1, 1, false);
    grid.setWalkableAt(3, 3, false);
    grid.setWalkableAt(4, 3, false);
    grid.setWalkableAt(5, 3, false);
    grid.setWalkableAt(6, 3, false);
    grid.setWalkableAt(7, 3, false);
    grid.setWalkableAt(8, 3, false);
    grid.setWalkableAt(9, 3, false);
    grid.setWalkableAt(2, 1, false);
    grid.setWalkableAt(3, 4, false);
    grid.setWalkableAt(3, 5, false);
    grid.setWalkableAt(3, 6, false);
    grid.setWalkableAt(3, 7, false);
    grid.setWalkableAt(8, 5, false);
    grid.setWalkableAt(9, 5, false);
    this.setState({ grid });
    console.log("grid1", grid.nodes);
    var start = document.getElementById(`node-${isStart[0]}-${isStart[1]}`);
    start.style.backgroundColor = 'blue';
    document.getElementById(`node-${isFinish[0]}-${isFinish[1]}`).style.backgroundColor = 'orange';
  }

  // function to find the path
  getPath = () => {

    const { grid } = this.state
    // create backup of grid to use in the path
    var gridBackup = grid.clone();
    console.log('gridNoPath', gridBackup)
    const finder = new PF.AStarFinder();
    // coordinates x,y start point x,y end point 
    let merda = finder.findPath(isStart[0], isStart[1], isFinish[0], isFinish[1], gridBackup);
    this.setState({ path: merda })
    console.log('path', merda)
  };

  //function to animate the path
  animateShortestPath = () => {
    const { path } = this.state
    console.log(path)
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const node = path[i];
        const ppath = document.getElementById(`node-${node[0]}-${node[1]}`)//.style.backgroundColor = 'yellow';
        ppath.style.backgroundColor = 'yellow';
        console.log('node', node)
      }, 150 * i);
    }
  }

  // getCoordinates = (e) => {
  //  this function get coordinates off all screen at pass the mouse
  //   window.addEventListener('mousemove', function (e) {
  //     console.log(e.x, e.y)
  //   })
  // }

  handleCoord = (e) => {
    e.preventDefault();
    console.log(e.target.id)
  }

  render() {
    var { grid } = this.state;
    var grids = grid.nodes;

    return (
      <Fragment >
        <button onClick={this.animateShortestPath}>
          press to get path
        </button>
        <button onClick={this.getPath}>
          press to find path
        </button>
        <button onClick={this.getCoordinates}>
          press to get coordinates
        </button>

        <label>
          <input type="radio" value="option1" checked={console.log('check')} />
          Option 1
        </label>

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
                  id={`node-${elem.x}-${elem.y}`}
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
      </Fragment>
    );
  }
}
