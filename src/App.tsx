import React from 'react';
import './App.css';
import { Carousel } from "./carousel/Carousel";
import { CarouselProvider } from "./carousel/context";

function App() {
  return (
    <div className="App">
        <CarouselProvider>
            <Carousel />
        </CarouselProvider>
    </div>
  );
}

export default App;
