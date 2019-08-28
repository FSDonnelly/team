import React, { Component } from 'react';
import { firebaseMatches } from '../../firebase';
import { firebaseLooper, reverseArray } from '../ui/misc';

import LeagueTable from './table';
import MatchesList from './MatchesList';

class Matches extends Component {
  state = {
    loading: true,
    matches: [],
    filterMatches: [],
    playedFilter: 'All',
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

  showPlayed = played => {
    const { matches } = this.state;
    const list = matches.filter(match => {
      return match.final === played;
    });
    this.setState({
      filterMatches: played === 'All' ? matches : list,
      playedFilter: played,
      resultFilter: 'All'
    });
  };

  showResult = result => {
    const { matches } = this.state;
    const list = matches.filter(match => {
      return match.result === result;
    });
    this.setState({
      filterMatches: result === 'All' ? matches : list,
      playedFilter: 'All',
      resultFilter: result
    });
  };

  render() {
    const { filterMatches, playedFilter, resultFilter } = this.state;
    return (
      <div className='the_matches_container'>
        <div className='the_matches_wrapper'>
          <div className='left'>
            <div className='match_filters'>
              <div className='match_filters_box'>
                <div className='tag'>Show Match</div>
                <div className='cont'>
                  <div
                    className={`option ${
                      playedFilter === 'All' ? 'active' : ''
                    }`}
                    onClick={() => this.showPlayed('All')}
                  >
                    All
                  </div>
                  <div
                    className={`option ${
                      playedFilter === 'Yes' ? 'active' : ''
                    }`}
                    onClick={() => this.showPlayed('Yes')}
                  >
                    Played
                  </div>
                  <div
                    className={`option ${
                      playedFilter === 'No' ? 'active' : ''
                    }`}
                    onClick={() => this.showPlayed('No')}
                  >
                    Not Played
                  </div>
                </div>
              </div>
              <div className='match_filters_box'>
                <div className='tag'>Match Result</div>
                <div className='cont'>
                  <div
                    className={`option ${
                      resultFilter === 'All' ? 'active' : ''
                    }`}
                    onClick={() => this.showResult('All')}
                  >
                    All
                  </div>
                  <div
                    className={`option ${resultFilter === 'W' ? 'active' : ''}`}
                    onClick={() => this.showResult('W')}
                  >
                    Win
                  </div>
                  <div
                    className={`option ${resultFilter === 'L' ? 'active' : ''}`}
                    onClick={() => this.showResult('L')}
                  >
                    Lost
                  </div>
                  <div
                    className={`option ${resultFilter === 'D' ? 'active' : ''}`}
                    onClick={() => this.showResult('D')}
                  >
                    Draw
                  </div>
                </div>
              </div>
            </div>
            <MatchesList matches={filterMatches} />
          </div>
          <div className='right'>
            <LeagueTable />
          </div>
        </div>
      </div>
    );
  }
}

export default Matches;
