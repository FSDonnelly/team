import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import NodeGroup from 'react-move/NodeGroup';
import CircularProgress from '@material-ui/core/CircularProgress';

class MatchesList extends Component {
  state = {
    matchesList: []
  };

  static getDerivedStateFromProps({ matches }, state) {
    return (state = {
      matchesList: matches
    });
  }

  showMatches = () =>
    this.state.matchesList ? (
      <NodeGroup
        data={this.state.matchesList}
        keyAccessor={d => d.id}
        start={() => ({
          opacity: 0,
          x: -200
        })}
        enter={(d, i) => ({
          opacity: [1],
          x: [0],
          timing: { duration: 500, delay: i * 50, ease: easePolyOut }
        })}
        update={(d, i) => ({
          opacity: [1],
          x: [0],
          timing: { duration: 500, delay: i * 50, ease: easePolyOut }
        })}
        leave={() => ({
          opacity: 0,
          x: -200
        })}
      >
        {nodes => (
          <div>
            {nodes.map(({ key, data, state: { x, opacity } }) => (
              <div
                className='match_box_big'
                key={key}
                style={{
                  opacity,
                  transform: `translate(${x}px)`
                }}
              >
                Hello World
              </div>
            ))}
          </div>
        )}
      </NodeGroup>
    ) : (
      <CircularProgress thickness={10} style={{ color: '#98c5e9' }} />
    );

  render() {
    return <div>{this.showMatches()}</div>;
  }
}

export default MatchesList;
