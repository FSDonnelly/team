import React, { Component } from 'react';
import Slide from 'react-reveal/Slide';
import { firebaseMatches } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';

import MatchesBlock from '../../ui/matches_block';

class Blocks extends Component {
  state = {
    matches: []
  };

  componentDidMount() {
    firebaseMatches
      .limitToLast(6)
      .once('value')
      .then(snapshot => {
        const matches = firebaseLooper(snapshot);
        this.setState({
          matches: reverseArray(matches)
        });
      });
  }

  showMatches = matches =>
    matches.map(match => (
      <Slide bottom key={match.id}>
        <div className='item'>
          <div className='wrapper'>
            <MatchesBlock match={match} />
          </div>
        </div>
      </Slide>
    ));

  render() {
    return (
      <div className='home_matches'>{this.showMatches(this.state.matches)}</div>
    );
  }
}

export default Blocks;
