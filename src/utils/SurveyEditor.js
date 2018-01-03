import React, { Component } from 'react';
import SurveyContract from '../../build/contracts/Survey.json'
import * as SurveyJSEditor from 'surveyjs-editor';
import getWeb3 from './getWeb3'
import getIPFS from './getIPFS'

import 'surveyjs-editor/surveyeditor.css';

class SurveyEditor extends Component {
  editor;

  constructor(props) {
    super(props)

    const contract = require('truffle-contract')

    this.survey = contract(SurveyContract)

    this.state = {
      web3: null,
      ipfs: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
    })
    .catch(() => {
      console.log('Error finding web3.')
    })

    getIPFS
    .then(results => {
      this.setState({
        ipfs: results.ipfs
      })
    })
    .catch(() => {
      console.log('Error finding ipfs.')
    })
  }

  componentDidMount() {
    let editorOptions = { showEmbededSurveyTab: true };
    this.editor = new SurveyJSEditor.SurveyEditor('surveyEditorContainer', editorOptions);
    this.editor.saveSurveyFunc = this.saveMySurvey;
  }
  render() {
    return (
      <div id="surveyEditorContainer"></div>
    );
  }

  saveMySurvey = () => {
      this.survey.setProvider(this.state.web3.currentProvider)

      var surveyInstance
      var surveyHash = ''

      this.state.web3.eth.getAccounts((error, accounts) => {
        this.survey.deployed().then((instance) => {
          surveyInstance = instance
  
          return this.state.ipfs.add(Buffer.from(this.editor.text))
        }).then((result) => {

          result.forEach(function (file) {
            if (file && file.hash) {
              console.log('successfully stored', file.hash)
              surveyHash = file.hash.toString()
            }
          })

          return surveyInstance.setSurvey(surveyHash, {from: accounts[0], gas: 1000000})
        }).then((result) => {

          console.log('contract updated',surveyHash)
        })
      })

      console.log(JSON.stringify(this.editor.text));
  }
}

export default SurveyEditor;
