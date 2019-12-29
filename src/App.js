import React, { Component } from "react";
import PF from "pathfinding";

// const GridLayout = props => (
//   <div
//     id="mainContent"
//     className="container"
//     style={{
//       display: "grid",
//       gridTemplateColumns: "repeat(3, 1fr)",
//       gridGap: "10px",
//       gridAutoRows: "minMax(100px, auto)"
//     }}
//   >
//     {this.props.articles.map(article => (
//       <div>
//         <div  />
//       </div>
//     ))}
//   </div>
// );

// export default function App() {
//   return <GridLayout />;
// }

export default class App extends Component {
  state = {
    grid: new PF.Grid(4, 6)
  };

  componentDidMount() {
    const grid = new PF.Grid(4, 5);
    this.setState({ grid });
    console.log("grid1", grid.nodes);
  }

  render() {
    var { grid } = this.state;
    var grids = grid.nodes;
    return (
      <div
        // className="container"
        style={{
          display: "grid",
          //gridTemplateColumns: `repeat(5, 5fr)`,
          margin: "20px"
          // gridGap: "10px",
          //gridAutoRows: "minMax(100px, auto)"
        }}
      >
        {grids.map((grid, Id) => (
          <div
            className="row"
            key={Id}
            style={{
              // border: "1px solid #000",
              display: "grid",
              margin: "0px",
              padding: "0px",
              width: "25px"
              // gridTemplateColumns: "repeat(3, 1fr)",
              // gridGap: "10px"
              // gridAutoRows: "minMax(100px, auto)"
            }}
          >
            {console.log("gridAqui", grid)}
            <p>{Id}</p>
            {grid.map((elem, Id) => (
              <div
                className="col"
                key={Id}
                style={{
                  border: "1px solid red",
                  width: "25px",
                  height: "25px",
                  margin: "0px",
                  padding: "0px"
                  //display: "grid"
                  //gridTemplateColumns: "repeat(3, 1fr)",
                  //gridGap: "10px"
                  // gridAutoRows: "minMax(100px, auto)"
                }}
              >
                {console.log("elemAqui", elem)}
                <p>{Id}</p>
              </div>
            ))}
          </div>
        ))}
        ,
      </div>
    );
  }
}
