import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ILF.js';
import Rank from './components/Rank/rank';
import FaceRecognition from './components/FaceRecognition/FR';
import Signin from './components/Signin/Signin.js';
import Register from './components/register/register';
import './App.css';
import ParticlesBg from 'particles-bg';
import 'tachyons';

    const MODEL_ID = 'face-detection';
    //const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105'; 
    const PAT = '5cc151338e6f459cbfd2bb87aa839500';
    const USER_ID = 'vmkhlz790uou';       
    const APP_ID = 'smart-brain';    

    const returnRequestOption = (imageURL) => {
    const IMAGE_URL = imageURL;

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

  const initialState = {
    input: '',
    imageURL:'',
    box: {},
    route: 'signin',
    isSignined: false,
    user: {
          id: '',
          name:'',
          email: '',
          entries: 0,
          joined: ''
    }
  }
  
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data[0].id,
      name: data[0].name,
      email: data[0].email,
      entries: data[0].entries,
      joined: data[0].joined
    }})
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});  
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
     fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnRequestOption(this.state.input))
        .then(response => response.json())
      .then(response => {
        console.log('clarifai API res:', response)
        if (response) {
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  render() {
    return (
      <div className='App'>
        <ParticlesBg num={200} type="circle" bg={true}/>
        { this.state.route === 'home'
       ? <div>
            <div className='container'>
              <Logo />
              <Navigation onRouteChange= {this.onRouteChange}/>
            </div>
            <Rank name ={this.state.user.name} entries={this.state.user.entries}/> 
            <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/> 
        </div>
        : ( 
            this.state.route === 'signin'
            ? <Signin onRouteChange= {this.onRouteChange}
            loadUser = {this.loadUser}
            />
            : <Register onRouteChange= {this.onRouteChange}
                        loadUser = {this.loadUser}
                        />   
          )
        }
         
     </div> 
    ) 
    
  }
}

export default App;
