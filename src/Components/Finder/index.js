import React, { Component } from "react";
import PF from "pathfinding";

const initialState = {
  grid: new PF.Grid(30, 30),
  path: [],
  option: "",
  start: [0, 0],
  finish: [0, 0],
  wall: "",
  noWall: "",
  breakPath: false,
  scale: 5,
  hidden: false,
  height: 30,
  width: 30,
  speed: 15
};

export default class Finder extends Component {
  state = initialState;

  componentDidMount() {
    const grid = new PF.Grid(30, 30);

    this.setState({ grid });

    console.log("grid nodes", grid.nodes);
  }

  componentDidUpdate(_, prevState) {
    const { start, finish, wall, grid, noWall } = this.state;
    if (prevState !== this.state) {
      if (start !== "") {
        document.getElementById(
          `${start[0]},${start[1]}`
        ).style.backgroundColor = "blue";
      }

      if (finish !== "") {
        document.getElementById(
          `${finish[0]},${finish[1]}`
        ).style.backgroundColor = "orange";
      }

      if (wall !== "") {
        grid.setWalkableAt(wall[0], wall[1], false);
        document.getElementById(`${wall[0]},${wall[1]}`).style.backgroundColor =
          "red";
      }

      if (noWall.length > 0) {
        grid.setWalkableAt(noWall[0], noWall[1], true);
        document.getElementById(
          `${noWall[0]},${noWall[1]}`
        ).style.backgroundColor =
          this.state.hidden === true ? "transparent" : "rgba(0,0,0,0.2)";
      }
    }
  }

  // function to find the path
  getPath = () => {
    const { grid, start, finish } = this.state;
    // create backup of grid to use in the path
    var gridBackup = grid.clone();
    console.log("gridNoPath", gridBackup);
    const finder = new PF.AStarFinder();
    // coordinates x,y start point x,y end point
    let path = finder.findPath(
      start[0],
      start[1],
      finish[0],
      finish[1],
      gridBackup
    );
    this.setState({ path });
    console.log("path", path);
  };

  //function to animate the path
  animateShortestPath = () => {
    const { path, breakPath, speed } = this.state;
    console.log(path);
    for (let i = 0; i < path.length || breakPath === true; i++) {
      if (breakPath === true) {
        console.log("caiu no break");
        break;
      } else {
        setTimeout(() => {
          const node = path[i];
          document.getElementById(
            `${node[0]},${node[1]}`
          ).style.backgroundColor = "#7159c1";
          console.log("node", node);
        }, speed * 10 * i);
      }
    }
  };

  // function to get coordinates and filter if is start point, finish point or is wall
  handleCoord = e => {
    const { start, finish, wall, option, hidden } = this.state;
    e.preventDefault();
    var node = e.target.id.split(",");
    var x = Number(node[0]);
    var y = Number(node[1]);
    var coord = [x, y];

    if (option === "start") {
      document.getElementById(`${start[0]},${start[1]}`).style.backgroundColor =
        hidden === true ? "transparent" : "rgba(0,0,0,0.2)";
      this.setState({ start: coord });
      console.log("state start", start);
    }

    if (option === "finish") {
      document.getElementById(
        `${finish[0]},${finish[1]}`
      ).style.backgroundColor =
        hidden === true ? "transparent" : "rgba(0,0,0,0.2)";
      this.setState({ finish: coord });
      console.log("state finish", finish);
    }

    if (option === "wall") {
      this.setState({ wall: coord });
      console.log("state wall", wall);
    }

    // here is remove wall
    if (option === "noWall") {
      this.setState({ noWall: coord, wall: "" });
      console.log("state wall", wall);
      // this.setState({ grid })
    }
  };

  // function to change options in state (start, finish, wall)
  handleOptionChange = e => this.setState({ option: e.target.value });

  // function to change scale
  handleScale = e => this.setState({ scale: e.target.value });

  // function to restart the pathfinder
  restart = () => {
    const { path, start, finish, hidden } = this.state;
    this.setState({ breakPath: true });

    if (path) {
      for (let i = 0; i < path.length; i++) {
        const node = path[i];
        document.getElementById(`${node[0]},${node[1]}`).style.backgroundColor =
          hidden === true ? "transparent" : "rgba(0,0,0,0.2)";
        // console.log('node', node)
      }
    }
    document.getElementById(`${finish[0]},${finish[1]}`).style.backgroundColor =
      hidden === true ? "transparent" : "orange";
    document.getElementById(`${start[0]},${start[1]}`).style.backgroundColor =
      hidden === true ? "transparent" : "blue";
    this.setState({ breakPath: false });
  };

  // function to hidden the grid
  handleHidden = () => {
    const { hidden } = this.state;

    if (hidden === true) {
      this.setState({ hidden: false });
    } else {
      this.setState({ hidden: true });
    }
  };

  // funtion to set the height of grid
  handleHeight = e => {
    if (e.target.value > 0) {
      this.setState({ grid: new PF.Grid(this.state.width, e.target.value) });
      this.setState({ height: e.target.value });
    }
  };

  // function to set the width of grid
  handleWidth = e => {
    if (e.target.value > 0) {
      this.setState({ grid: new PF.Grid(e.target.value, this.state.height) });
      this.setState({ width: e.target.value });
    }
  };

  handleSpeed = e => this.setState({ speed: e.target.value });

  render() {
    var { grid, scale, hidden } = this.state;
    var grids = grid.nodes;

    return (
      <div>
        <button
          onClick={this.getPath}
          style={{ borderRadius: "4px", marginLeft: "5px" }}
        >
          Find path
        </button>
        <button
          onClick={this.animateShortestPath}
          style={{ borderRadius: "4px", marginLeft: "5px" }}
        >
          Go path
        </button>
        <button
          onClick={this.restart}
          style={{ borderRadius: "4px", marginLeft: "5px" }}
        >
          Restart
        </button>
        <button
          onClick={this.handleHidden}
          style={{ borderRadius: "4px", marginLeft: "5px" }}
        >
          Hidden
        </button>
        <label style={{ fontSize: "13px" }}>
          <input
            type="radio"
            value="hidden"
            style={{ marginLeft: "10px" }}
            checked={this.state.hidden === true}
          />
          Hidden
        </label>

        <form style={{ marginTop: "10px" }}>
          <label>
            <input
              type="radio"
              value="start"
              style={{ marginLeft: "10px" }}
              checked={this.state.option === "start"}
              onChange={this.handleOptionChange}
            />
            Start
          </label>
          <label>
            <input
              type="radio"
              value="finish"
              style={{ marginLeft: "10px" }}
              checked={this.state.option === "finish"}
              onChange={this.handleOptionChange}
            />
            Finish
          </label>
          <label>
            <input
              type="radio"
              value="wall"
              style={{ marginLeft: "10px" }}
              checked={this.state.option === "wall"}
              onChange={this.handleOptionChange}
            />
            Wall
          </label>
          <label>
            <input
              type="radio"
              value="noWall"
              style={{ marginLeft: "10px" }}
              checked={this.state.option === "noWall"}
              onChange={this.handleOptionChange}
            />
            Remove Wall
          </label>
        </form>

        <input
          type="number"
          onChange={this.handleScale}
          placeholder="SCALE"
          style={{ width: "70px", marginLeft: "10px", borderRadius: "4px" }}
        />
        <input
          type="number"
          onChange={this.handleHeight}
          placeholder="HEIGHT"
          style={{ width: "70px", marginLeft: "10px", borderRadius: "4px" }}
        />
        <input
          type="number"
          onChange={this.handleWidth}
          placeholder="WIDTH"
          style={{ width: "70px", marginLeft: "10px", borderRadius: "4px" }}
        />
        <input
          type="number"
          onChange={this.handleSpeed}
          placeholder="SPEED"
          style={{ width: "70px", marginLeft: "10px", borderRadius: "4px" }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "20px"
          }}
        >
          {grids.map(grid => (
            <div
              className="row"
              key={grid.id}
              data={grid}
              style={{
                display: "flex",
                margin: "0px",
                padding: "0px"
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
                    background:
                      hidden === true
                        ? "transparent"
                        : elem.walkable === true
                        ? "rgba(0,0,0,0.13)"
                        : "red",
                    border:
                      hidden === true
                        ? "0.6px solid transparent"
                        : "0.6px solid rgba(0,0,0,0.2)",
                    width: scale * 1,
                    height: scale * 1,
                    margin: "0px",
                    padding: "0px"
                  }}
                >
                  {/* {console.log("elemAqui", elem)} */}
                  {/* <p style={{ fontSize: scale * 0.4, textAlign: 'center' }}>{`${elem.x} , ${elem.y} , ${elem.walkable}`}</p> */}
                </div>
              ))}
            </div>
          ))}
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
