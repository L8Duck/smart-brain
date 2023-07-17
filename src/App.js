import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ILF.js';
import Rank from './components/Rank/rank';
import FaceRecognition from './components/FaceRecognition/FR';
import signIn from './components/signIn/signIn.js';
import './App.css';
import ParticlesBg from 'particles-bg';
import 'tachyons';

///////////////////////////////////////////////////////////////////////////////////////////////////
    // In this section, we set the user authentication, user and app ID, model details, and the URL
    // of the image we want as an input. Change these strings to run your own example.
    //////////////////////////////////////////////////////////////////////////////////////////////////
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';   
    const returnRequestOption = (imageURL) => {

    const PAT = '5cc151338e6f459cbfd2bb87aa839500';
    const USER_ID = 'vmkhlz790uou';       
    const APP_ID = 'smart-brain';   
    const IMAGE_URL = 'https://d2v9ipibika81v.cloudfront.net/uploads/sites/271/Africa-2.png';

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
    return requestOptions;
  }

  

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});  
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", returnRequestOption(this.state.input))
    .then(response => console.log(response.outputs[0].data.regions[0].region_info.bounding_box))
    .catch(error => console.log('error', error));
  }

  render() {
    return (
      <div className='App'>
        <ParticlesBg num={200} type="circle" bg={true}/>
        <div className='container'>
          <Logo />
          <Navigation />
        </div>
        <signIn />
        <Rank />
        <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit}
        />
         <FaceRecognition imageURL={this.state.imageURL}/> 
     </div> 
    ) 
    
  }
}

export default App;
