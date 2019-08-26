import React, { Component } from 'react';
import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';
import AdminLayout from '../../../HOC/AdminLayout';

export class AddMatch extends Component {
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

  componentDidMount() {
    const matchId = this.props.match.params.id;
    console.log(matchId);
  }

  render() {
    const { formData, formSuccess, formError, formType } = this.state;
    return (
      <AdminLayout>
        <div className='editmatch_dialog_wrapper'>
          <h2>{this.state.formType}</h2>
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

export default AddMatch;
