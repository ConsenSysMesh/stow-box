import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Record from './Record';
import GetRecordForm from './GetRecordForm';
import DecryptRecordForm from './DecryptRecordForm';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  text: {
    marginTop: 20,
  },
};

class GetRecord extends Component {
  constructor (props) {
    super(props);

    this.state = {
      dataHash: '',
      privateKey: '',
    };

    // Set variables pass as url arguments
    window.location.search.substr(1).split('&').forEach((param) => {
      const key = param.split('=')[0];
      const val = param.split('=')[1];
      if (key === 'dataHash') {
        this.state['dataHash'] = val;
      }
    });
  }

  onInputChange = (property) => (event) => {
    const value = event.target.value;
    this.setState({ [property]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const dataHash = event.target.elements.dataHash.value;
    this.props.onGetRecordSubmit(dataHash);
  }

  handleDecrypt = (event) => {
    event.preventDefault();
    const privateKey = event.target.elements.privateKey.value;
    this.props.onGetRecordDecrypt(this.props.record.data, privateKey);
  }

  render () {
    const { dataHash, privateKey } = this.state;
    const { record, classes } = this.props;

    return (
      <section>
        <Typography variant='title'>
          Get Record
        </Typography>
        <GetRecordForm
          dataHash={dataHash}
          onInputChange={this.onInputChange('dataHash')}
          handleSubmit={this.handleSubmit}
        />
        {record.data && <Record record={record.data} />}
        {record.data && <DecryptRecordForm
          privateKey={privateKey}
          onInputChange={this.onInputChange('privateKey')}
          handleDecrypt={this.handleDecrypt}
        />}
        {record.data && record.data.decrypted && <div>
          <Typography variant='title' className={classes.text}>
            Success! Here is our decryted data
          </Typography>
          <Typography variant='body2' className={classes.text}>
            {this.props.record.data.decrypted}
          </Typography>
        </div>}
      </section>
    );
  }
}

export default withStyles(styles)(GetRecord);
