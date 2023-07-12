import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ILF';
import Rank from './components/Rank/rank';
import './App.css';
import ParticlesBg from 'particles-bg';
import 'tachyons';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <ParticlesBg num={200} type="circle" bg={true} />
        <div className='container'>
          <Logo />
          <Navigation />
        </div>
        <Rank />
        <ImageLinkForm />
        
        {/* <FaceRecognition /> */}
     </div> 
    ) 
    
  }
}

export default App;
