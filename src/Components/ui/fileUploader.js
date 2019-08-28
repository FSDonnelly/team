import React, { Component } from 'react';
import { firebase } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import CircularProgress from '@material-ui/core/CircularProgress';

class Fileuploader extends Component {
  state = {
    name: '',
    isUploading: false,
    fileURL: ''
  };

  handleUploadStart = () => {
    this.setState({
      isUploading: true
    });
  };

  handleUploadError = () => {
    this.setState({
      isUploading: false
    });
  };

  handleUploadSuccess = fileName => {
    console.log(fileName);
    const { dir } = this.props;
    this.setState({
      name: fileName,
      isUploading: false
    });
    firebase
      .storage()
      .ref(dir)
      .child(fileName)
      .getDownloadURL()
      .then(url => {
        console.log(url);
        this.setState({
          fileURL: url
        });
      });
    this.props.fileName(fileName);
  };

  static getDerivedStateFromProps({ defaultImg, defaultImgName }, state) {
    if (defaultImg) {
      return (state = {
        name: defaultImgName,
        fileURL: defaultImg
      });
    }
    return null;
  }

  resetUpload = () => {
    this.setState({
      name: '',
      isUploading: false,
      fileURL: ''
    });
    this.props.resetImage();
  };

  render() {
    const { fileURL, isUploading, name } = this.state;
    const { dir, tag } = this.props;
    return (
      <div>
        {!fileURL ? (
          <div>
            <div className='label_inputs'>{tag}</div>
            <FileUploader
              accept='image/*'
              name='image'
              randomizeFilename
              storageRef={firebase.storage().ref(dir)}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
            />
          </div>
        ) : (
          <div className='image_upload_container'>
            <img
              style={{
                width: '100%'
              }}
              src={fileURL}
              alt={name}
            />
            <div
              className='remove'
              onClick={() => this.resetUpload()}
              style={{ cursor: 'pointer' }}
            >
              Remove
            </div>
          </div>
        )}
        {isUploading ? (
          <div
            className='progress'
            style={{ textAlign: 'center', margin: '30px 0' }}
          >
            <CircularProgress style={{ color: '#98c6e9' }} thickness={10} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Fileuploader;
