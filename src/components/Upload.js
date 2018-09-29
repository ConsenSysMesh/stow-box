import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadForm from './UploadForm';
import { withStyles } from '@material-ui/core/styles';

const progressStyle = {
  color: 'black',
};

const styles = {
  success: {
    fontWeight: 'bold',
    marginTop: 10,
    color: 'green',
  },
  error: {
    fontWeight: 'bold',
    marginTop: 10,
  },
};

class Upload extends Component {
  constructor (props) {
    super(props);

    this.state = {
      file: '{\n' +
      '  "entry": [\n' +
      '    {\n' +
      '      "fullUrl": "urn:uuid:5f0ed72c-1d71-4f87-bf44-a23a7e506222",\n' +
      '      "resource": {\n' +
      '        "resourceType": "Basic",\n' +
      '        "id": "5f0ed72c-1d71-4f87-bf44-a23a7e506222",\n' +
      '        "meta": {\n' +
      '          "profile": [\n' +
      '            "http://standardhealthrecord.org/fhir/StructureDefinition/shr-entity-Person"\n' +
      '          ]\n' +
      '        },\n' +
      '        "code": {\n' +
      '          "coding": [\n' +
      '            {\n' +
      '              "system": "http://standardhealthrecord.org/fhir/basic-resource-type",\n' +
      '              "code": "shr-entity-Person",\n' +
      '              "display": "shr-entity-Person"\n' +
      '            }\n' +
      '          ]\n' +
      '        }\n' +
      '      }\n' +
      '    }\n' +
      '  ]\n' +
      '}',
      public_key: '',
      metadata: '',
    };
  }

  onInputChange = (event) => {
    const property = event.target.id;
    const value = event.target.value;
    this.setState({ [property]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const file = JSON.parse(this.state.file);
    const public_key = this.state.public_key;
    const metadata = this.state.metadata;
    this.props.uploadData(file, public_key, metadata);
  };

  render () {
    const { file, public_key, metadata } = this.state;
    const { upload, classes } = this.props;

    return (
      <section>
        <Typography variant='title'>
          Append and Upload JSON File
        </Typography>
        <Typography variant='body1' className={classes.paragraph}>
          Now its time to upload your first record to the Linnia Protocol! We'll use some JSON data, dress it up, and upload it.
        </Typography>
        <Typography variant='body1' className={classes.paragraph}>
          This should be the <b>public key</b> you generated in Users. This key will encrypt our file so only your private encryption key can decrypt it!
        </Typography>

        <UploadForm
          file={file}
          public_key={public_key}
          metadata={metadata}
          onInputChange={this.onInputChange}
          handleSubmit={this.handleSubmit}
        />

        {upload.isLoading && <div>
          <div className='progress-background' />
          <CircularProgress
            className='progress'
            style={progressStyle}
            thickness={7}
          />
        </div>}

        {upload.hash && <Typography
          variant='body1'
          className={classes.success}>
          The file was uploaded to Linnia! Hash: <b>{upload.hash}</b>
        </Typography>
        }

        {upload.message && <Typography
          variant='body1'
          color='error'
          className={classes.error}>
          {upload.message}
          </Typography>
        }
      </section>
    );
  }
}

export default withStyles(styles)(Upload);
