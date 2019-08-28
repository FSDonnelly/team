import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { firebaseMatches } from '../../firebase';
import { firebaseLooper, reverseArray } from '../ui/misc';

class Matches extends Component {
  state = {
    loading: true,
    matches: [],
    filterMatches: [],
    playerFilter: 'All',
    resultFilter: 'All'
  };

  componentDidMount() {
    firebaseMatches.once('value').then(snapshot => {
      const matches = firebaseLooper(snapshot);

      this.setState({
        loading: false,
        matches: reverseArray(matches),
        filterMatches: reverseArray(matches)
      });
    });
  }

  render() {
    console.log(this.state);
    return <div className='the_matches_container'>The Matches</div>;
  }
}

export default Matches;
