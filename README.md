# Ingen 


### About 
 This is a physics simulation engine. The current state of this simulation engine can model forces like gravity, materials like  strings(using these as building blocks other objects can be created) , rotation based on the angular momentum of the bodies and boundary collision detection.
 
 Particle is the basic building block in this engine(particle.js) and all the calculations are vector based so as to provide readability and faster computation.
 
 This library has been build using HTML and javascript without using any external libraries and the animations are displayed on the HTML canvas element. Particle, Vector and Utils files contain the core logic of the engine, so these files are imported first in the index.js and our simulation file goes last.
 
 ### Simulations

- Cloth simulation

<img src="https://user-images.githubusercontent.com/22196360/147685330-6a9cd954-fc3a-450d-80a8-9ad0e3be7c2b.gif" width='300' height='300' />


- An object under gravity with boundary collision and angular momentum.

<img src="https://user-images.githubusercontent.com/22196360/147689126-80383e62-78b5-45c8-be8d-a4761c938de5.gif" width='400' height='300' />

