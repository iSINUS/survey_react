import React, { Component } from 'react'
//import SurveyContract from '../build/contracts/Survey.json'
//import getWeb3 from './utils/getWeb3'
//import getIPFS from './utils/getIPFS'
import * as Survey from 'survey-react';
import SurveyEditor from './utils/SurveyEditor';

import 'survey-react/survey.css';
import 'bootstrap/dist/css/bootstrap.css';
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  
  constructor(props) {
    super(props)

    //const contract = require('truffle-contract')

    Survey.Survey.cssType = "bootstrap"

    //this.survey = contract(SurveyContract)

    this.state = {
      surveyHash: null,
      surveyJSON: null,
      web3: null,
      ipfs: null,
      surveyModel: null
    }
  }

 /*  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      //this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })

    getIPFS
    .then(results => {
      this.setState({
        ipfs: results.ipfs
      })

      // Instantiate contract once ipfs provided.
      //this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding ipfs.')
    })

    this.instantiateContract() 
  } */

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */


   /*  this.survey.setProvider(this.state.web3.currentProvider)

    var surveyInstance
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.survey.deployed().then((instance) => {
        surveyInstance = instance

        return this.readSurvey()
      }).then((result) => {
 
        return this.setState({ surveyModel: new Survey.Model(this.state.surveyJSON) })
      }).then((result) => {
 
      })
    })  */
  }

 /*  readSurvey() {
    var surveyInstance
    var surveyHash
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.survey.deployed().then((instance) => {
        surveyInstance = instance

        return surveyInstance.getSurvey.call();
      }).then((result) => {
        surveyHash = result
        return this.setState({ surveyHash: result })
      }).then((result) => {
      
        return this.state.ipfs.cat(surveyHash, {buffer: true})
      }).then((result) => {

        return this.setState({ surveyJSON: result.toString() })
      }).then((result) => {

      })
    }) 
  } */

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>
              <p>The stored survey HASH is: {this.state.surveyHash}</p>
              <p>The stored survey JSON is: {this.state.surveyJSON}</p>
            </div>           
          </div>
        </main>
        <div className="surveyjs">
              {/*If you want to show survey, uncomment the line below*/}
              {/*<Survey.Survey model={this.state.surveyModel}/>*}
              {/*If you want to show survey editor, uncomment the line below*/}
              <SurveyEditor />
        </div>
      </div>
    );
  }
}

export default App
