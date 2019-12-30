import React, { Component } from "react";
import PF from "pathfinding";
// import { Node } from './styles'
const initialState = new PF.Grid(5, 10);
const isStart = [0, 0];
const isFinish = [0, 2];
const isWall = [0, 1]

export default class App extends Component {
  state = {
    grid: initialState,
    path: []
  };

  componentDidMount() {

    const grid = new PF.Grid(5, 5);


    // const test = (isWall[0])
    // console.log('teste', test)
    // define way of can't be used
    grid.setWalkableAt(isWall[0], isWall[1], false);
    grid.setWalkableAt(1, 1, false);
    grid.setWalkableAt(2, 1, false);
    this.setState({ grid });
    console.log("grid1", grid.nodes);
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

  //function to animate path
  animateShortestPath = () => {
    const { path } = this.state
    console.log(path)
    for (let i = 0; i < path.length; i++) {
      console.log(path[i])
      setTimeout(() => {
        const node = path[i];
        document.getElementById(`node-${node[0]}-${node[1]}`).className = 'node node-find';

      }, 50 * i);
    }
  }


  render() {
    var { grid } = this.state;
    var grids = grid.nodes;
    const extraClassName = isFinish
      ? 'node-finish'
      : isStart
        ? 'node-start'
        : isWall
          ? 'node-wall'
          : '';
    return (
      <>
        <button onClick={this.animateShortestPath}>
          press to get path
        </button>
        <button onClick={this.getPath}>
          press to find path
        </button>
        <div
          style={{
            display: "flex",
            flexDirection: 'column',
            margin: "20px"
          }}
        >
          {grids.map((grid, Id) => (
            <div
              className="row"
              key={grid}
              date={grid}
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
                  className={`node ${extraClassName}`}
                  key={Id}
                  data={elem}
                  style={{
                    background: elem.walkable === true ? 'green' : 'red',
                    border: '1px solid #000',
                    width: '50px',
                    height: '50px',
                    margin: '0px',
                    padding: '0px'
                  }}
                >
                  {/* {console.log("elemAqui", elem)} */}
                  <p style={{ fontSize: '10px', textAlign: 'center' }}>{`${elem.x} , ${elem.y} , ${elem.walkable}`}</p>
                </div>
              ))}
            </div>
          ))
          }
        </div>
      </>
    );
  }
}
