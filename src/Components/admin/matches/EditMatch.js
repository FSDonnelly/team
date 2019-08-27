import React, { Component } from 'react';
import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';
import AdminLayout from '../../../HOC/AdminLayout';
import {
  firebaseMatches,
  firebaseTeams,
  fierbaseDB,
  firebaseDB
} from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';

class EditMatch extends Component {
  state = {
    matchId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    teams: [],
    formData: {
      date: {
        element: 'input',
        value: '',
        config: {
          label: 'Event date',
          name: 'date_input',
          type: 'date'
        },
        validation: {
          required: true,
          date: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      local: {
        element: 'select',
        value: '',
        config: {
          label: 'Select a local team',
          name: 'select_local',
          type: 'select',
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: false
      },
      resultLocal: {
        element: 'input',
        value: '',
        config: {
          label: 'Result local',
          name: 'result_local_input',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: false
      },
      away: {
        element: 'select',
        value: '',
        config: {
          label: 'Select a away team',
          name: 'select_away',
          type: 'select',
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: false
      },
      resultAway: {
        element: 'input',
        value: '',
        config: {
          label: 'Result away',
          name: 'result_away_input',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: false
      },
      referee: {
        element: 'input',
        value: '',
        config: {
          label: 'Referee',
          name: 'referee_input',
          type: 'referee'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      stadium: {
        element: 'input',
        value: '',
        config: {
          label: 'Stadium',
          name: 'stadium_input',
          type: 'stadium'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      result: {
        element: 'select',
        value: '',
        config: {
          label: 'Team result',
          name: 'select_result',
          type: 'select',
          options: [
            { key: 'W', value: 'W' },
            { key: 'L', value: 'L' },
            { key: 'D', value: 'D' },
            { key: 'n/a', value: 'n/a' }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      final: {
        element: 'select',
        value: '',
        config: {
          label: 'Game played',
          name: 'select_final',
          type: 'select',
          options: [{ key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      }
    }
  };

  updateForm(element) {
    const newFormData = { ...this.state.formData };
    const newElement = { ...newFormData[element.id] };

    newElement.value = element.e.target.value;

    let validData = validate(newElement);

    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newFormData[element.id] = newElement;

    this.setState({
      formError: false,
      formData: newFormData
    });
  }

  updateFields(match, teamOptions, teams, type, matchId) {
    const newFormData = {
      ...this.state.formData
    };
    for (let key in newFormData) {
      if (match) {
        newFormData[key].value = match[key];
        newFormData[key].valid = true;
      }
      if (key === 'local' || key === 'away') {
        newFormData[key].config.options = teamOptions;
      }
    }
    this.setState({
      matchId,
      formType: type,
      formData: newFormData,
      teams
    });
    console.log(this.state.formData);
  }

  componentDidMount() {
    const matchId = this.props.match.params.id;
    const getTeams = (match, type) => {
      firebaseTeams.once('value').then(snapshot => {
        const teams = firebaseLooper(snapshot);
        const teamOptions = [];
        snapshot.forEach(childSnapshot => {
          teamOptions.push({
            key: childSnapshot.val().shortName,
            value: childSnapshot.val().shortName
          });
        });
        this.updateFields(match, teamOptions, teams, type, matchId);
      });
    };

    if (!matchId) {
      getTeams(false, 'Add Match');
    } else {
      firebaseDB
        .ref(`matches/${matchId}`)
        .once('value')
        .then(snapshot => {
          const match = snapshot.val();

          getTeams(match, 'Edit Match');
        });
    }
  }

  submitForm(e) {
    e.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }
    if (formIsValid) {
      if (this.state.formType === 'Edit Match') {
        firebaseDB
          .ref(`matches/${this.state.matchId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm('Updated correctly');
          })
          .catch(e => {
            this.setState({ formError: true });
          });
      } else {
        firebaseMatches
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push('/admin_matches');
          })
          .catch(e => {
            this.setState({ formError: true });
          });
      }
    } else {
      this.setState({
        formError: true
      });
    }
  }

  render() {
    const { formData, formSuccess, formError, formType } = this.state;
    return (
      <AdminLayout>
        <div className='editmatch_dialog_wrapper'>
          <h2>{formType}</h2>
          <div>
            <form onSubmit={e => this.submitForm(e)}>
              <FormField
                id={'date'}
                formData={formData.date}
                change={element => this.updateForm(element)}
              />

              <div className='select_team_layout'>
                <div className='label_inputs'>Local</div>
                <div className='wrapper'>
                  <div className='left'>
                    <FormField
                      id={'local'}
                      formData={formData.local}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div>
                    <FormField
                      id={'resultLocal'}
                      formData={formData.resultLocal}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
              </div>
              <div className='select_team_layout'>
                <div className='label_inputs'>Away</div>
                <div className='wrapper'>
                  <div className='left'>
                    <FormField
                      id={'away'}
                      formData={formData.away}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div>
                    <FormField
                      id={'resultAway'}
                      formData={formData.resultAway}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
              </div>
              <div className='split_fields'>
                <FormField
                  id={'referee'}
                  formData={formData.referee}
                  change={element => this.updateForm(element)}
                  value={formData.referee.value}
                />
                <FormField
                  id={'stadium'}
                  formData={formData.stadium}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div className='split_fields last'>
                <FormField
                  id={'result'}
                  formData={formData.result}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={'final'}
                  formData={formData.final}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div className='success_label'>{formSuccess}</div>
              {formError ? (
                <div className='error_label'>Something went wrong</div>
              ) : (
                ''
              )}
              <div className='admin_submit'>
                <button onClick={e => this.submitForm(e)}>{formType} </button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default EditMatch;
