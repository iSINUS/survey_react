import React, { Component } from 'react'
import SurveyContract from '../build/contracts/Survey.json'
import getWeb3 from './utils/getWeb3'
import getIPFS from './utils/getIPFS'
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

    const contract = require('truffle-contract')

    Survey.Survey.cssType = "bootstrap"

    this.survey = contract(SurveyContract)

   /*  this.json = { title: 'Product Feedback Survey Example', showProgressBar: 'top', pages: [
      {
        questions: [{
            type: 'matrix',
            name: 'Quality',
            title: 'Please indicate if you agree or disagree with the following statements',
            columns: [{
                value: 1,
                text: 'Strongly Disagree'
              },
              {
                value: 2,
                text: 'Disagree'
              },
              {
                value: 3,
                text: 'Neutral'
              },
              {
                value: 4,
                text: 'Agree'
              },
              {
                value: 5,
                text: 'Strongly Agree'
              }
            ],
            rows: [{
                value: 'affordable',
                text: 'Product is affordable'
              },
              {
                value: 'does what it claims',
                text: 'Product does what it claims'
              },
              {
                value: 'better then others',
                text: 'Product is better than other products on the market'
              },
              {
                value: 'easy to use',
                text: 'Product is easy to use'
              }
            ]
          },
          {
            type: 'rating',
            name: 'satisfaction',
            title: 'How satisfied are you with the Product?',
            mininumRateDescription: 'Not Satisfied',
            maximumRateDescription: 'Completely satisfied'
          },
          {
            type: 'rating',
            name: 'recommend friends',
            visibleIf: '{satisfaction} > 3',
            title: 'How likely are you to recommend the Product to a friend or co-worker?',
            mininumRateDescription: 'Will not recommend',
            maximumRateDescription: 'I will recommend'
          },
          {
            type: 'comment',
            name: 'suggestions',
            title: 'What would make you more satisfied with the Product?',
          }
        ]
      }, {
        questions: [{
            type: 'radiogroup',
            name: 'price to competitors',
            title: 'Compared to our competitors, do you feel the Product is',
            choices: ['Less expensive', 'Priced about the same', 'More expensive', 'Not sure']
          },
          {
            type: 'radiogroup',
            name: 'price',
            title: 'Do you feel our current price is merited by our product?',
            choices: ['correct|Yes, the price is about right',
              'low|No, the price is too low for your product',
              'high|No, the price is too high for your product'
            ]
          },
          {
            type: 'multipletext',
            name: 'pricelimit',
            title: 'What is the... ',
            items: [{
                name: 'mostamount',
                title: 'Most amount you would every pay for a product like ours'
              },
              {
                name: 'leastamount',
                title: 'The least amount you would feel comfortable paying'
              }
            ]
          }
        ]
      }, {
        questions: [{
          type: 'text',
          name: 'email',
          title: 'Thank you for taking our survey. Please enter your email address, then press the "Submit" button.'
        }]
      }]
  }; */
    this.json - { title: 'Product Feedback Survey Example', showProgressBar: 'top', pages: [ { name: 'page1', questions: [ { type: 'text', name: 'question1' } ] } ] };
    this.state = {
      surveyHash: null,
      surveyJSON: null,
      web3: null,
      ipfs: null,
      surveyModel: new Survey.Model(this.json)      
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
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding ipfs.')
    })

    //this.instantiateContract() 
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */


    this.survey.setProvider(this.state.web3.currentProvider)

    var surveyInstance
 
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.survey.deployed().then((instance) => {
        surveyInstance = instance

        return this.readSurvey()
      }).then((result) => {
        console.log(JSON.stringify(this.state.surveyJSON))
 
        //return this.setState({ surveyModel: new Survey.Model(JSON.stringify(this.state.surveyJSON)) })
      }).then((result) => {
         
      })
    }) 
  }

  readSurvey() {
    var surveyInstance
    var surveyHash
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.survey.deployed().then((instance) => {
        surveyInstance = instance

        return surveyInstance.getSurvey.call({from: accounts[0]});
      }).then((result) => {
        surveyHash = result
        return this.setState({ surveyHash: result })
      }).then((result) => {
        if (surveyHash) {
          return this.state.ipfs.cat(surveyHash, {buffer: true})
        } else {
          return ''
        }
      }).then((result) => {

        return this.setState({ surveyJSON: result.toString() })
      }).then((result) => {

      })
    }) 
  }

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
              <Survey.Survey model={this.state.surveyModel}/>
              {/*If you want to show survey editor, uncomment the line below*/}
              <SurveyEditor />
        </div>
      </div>
    );
  }
}

export default App
