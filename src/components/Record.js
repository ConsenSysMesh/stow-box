import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  layout: {
    marginTop: 30,
  },
};

class Record extends Component {
  render() {
    const { record, classes } = this.props;

    return (
      <div className={classes.layout}>
        <Typography variant='title'>
          Record: {record.dataHash}
        </Typography>
        <Typography variant='body1'>
          Owner: {record.owner}
        </Typography>
        {record.metadata && <Typography variant='body1'>
          Metadata: {record.metadata}
        </Typography>}
        {record.metadataHash && <Typography variant='body1'>
          Metadata Hash: {record.metadataHash}
        </Typography>}
        <Typography variant='body1'>
          SigCount: {record.sigCount.toString()}
        </Typography>
        <Typography variant='body1'>
          IrisScore: {record.irisScore.toString()}
        </Typography>
        <Typography variant='body1'>
          DataUri: {record.dataUri}
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Record);
