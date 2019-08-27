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

  static getDerivedStateFromProps({ defaultImg, defaultImgName }, prevState) {
    if (defaultImg) {
      return (prevState = {
        name: defaultImgName,
        fileURL: defaultImg
      });
    }
    return null;
  }

  render() {
    const { fileURL, isUploading } = this.state;
    const { dir, tag } = this.props;
    return (
      <div>
        {!fileURL ? (
          <div>
            <div className='label_input'>{tag}</div>
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
        ) : null}
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
