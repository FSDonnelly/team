import React, { Component } from 'react';
import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';
import AdminLayout from '../../../HOC/AdminLayout';
import { firebasePlayers, firebase, firebaseDB } from '../../../firebase';

import FileUploader from '../../ui/fileUploader';

class EditPlayer extends Component {
  state = {
    playerId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    defaultImg: '',
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Player First Name',
          name: 'name_input',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          label: 'Player Last Name',
          name: 'lastname_input',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      number: {
        element: 'input',
        value: '',
        config: {
          label: 'Player Number',
          name: 'number_input',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      position: {
        element: 'select',
        value: '',
        config: {
          label: 'Select a position',
          name: 'select_position',
          type: 'select',
          options: [
            { key: 'Keeper', value: 'Keeper' },
            { key: 'Defence', value: 'Defence' },
            { key: 'Midfield', value: 'Midfield' },
            { key: 'Striker', value: 'Striker' }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      image: {
        element: 'image',
        value: '',
        validation: {
          required: true
        },
        valid: false
      }
    }
  };

  updateFields = (player, playerId, formType, defaultImg) => {
    const { formData } = this.state;
    const newFormData = { ...formData };

    for (let key in newFormData) {
      newFormData[key].value = player[key];
      newFormData[key].valid = true;
    }
    this.setState({
      playerId,
      defaultImg,
      formType,
      formData: newFormData
    });
  };
  componentDidMount() {
    const playerId = this.props.match.params.id;

    if (!playerId) {
      this.setState({
        formType: 'Add Player'
      });
    } else {
      firebaseDB
        .ref(`players/${playerId}`)
        .once('value')
        .then(snapshot => {
          const playerData = snapshot.val();

          firebase
            .storage()
            .ref('players')
            .child(playerData.image)
            .getDownloadURL()
            .then(url => {
              this.updateFields(playerData, playerId, 'Edit Player', url);
            })
            .catch(error => {
              this.updateFields(
                { ...playerData, image: '' },
                playerId,
                'Edit Player',
                ''
              );
            });
        });
    }
  }

  updateForm(element, content = '') {
    const newFormData = { ...this.state.formData };
    const newElement = { ...newFormData[element.id] };

    if (content === '') {
      newElement.value = element.e.target.value;
    } else {
      newElement.value = content;
    }

    let validData = validate(newElement);

    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newFormData[element.id] = newElement;

    this.setState({
      formError: false,
      formData: newFormData
    });
  }

  successForm = message => {
    this.setState({
      formSuccess: message
    });
    setTimeout(() => {
      this.setState({
        formSuccess: ''
      });
    }, 2000);
  };

  submitForm(e) {
    e.preventDefault();
    const { formType, playerId } = this.state;
    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if (formIsValid) {
      if (formType === 'Edit Player') {
        firebaseDB
          .ref(`players/${playerId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm('Player Updated');
          })
          .catch(error => {
            this.setState({
              formError: true
            });
          });
      } else {
        firebasePlayers
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push('/admin_players');
          })
          .catch(error => {
            this.setState({
              formError: true
            });
          });
      }
    } else {
      this.setState({
        formError: true
      });
    }
  }

  resetImage = () => {
    const newFormData = { ...this.state.formData };
    newFormData['image'].value = '';
    newFormData['image'].valid = false;
    this.setState({
      defaultImg: '',
      formData: newFormData
    });
  };
  storeFileName = fileName => {
    this.updateForm({ id: 'image' }, fileName);
  };
  render() {
    const {
      formData,
      formSuccess,
      formError,
      formType,
      defaultImg
    } = this.state;

    return (
      <AdminLayout>
        <div className='editplayers_dialog_wrapper'>
          <h2>{formType}</h2>
          <div>
            <form onSubmit={e => this.submitForm(e)}>
              <FileUploader
                dir='players'
                tag={'Player Image'}
                defaultImg={defaultImg}
                defaultImgName={formData.image.value}
                resetImage={() => this.resetImage()}
                fileName={fileName => this.storeFileName(fileName)}
              />
              <FormField
                id={'name'}
                formData={formData.name}
                change={element => this.updateForm(element)}
              />
              <FormField
                id={'lastname'}
                formData={formData.lastname}
                change={element => this.updateForm(element)}
              />
              <FormField
                id={'number'}
                formData={formData.number}
                change={element => this.updateForm(element)}
              />
              <FormField
                id={'position'}
                formData={formData.position}
                change={element => this.updateForm(element)}
              />
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

export default EditPlayer;
