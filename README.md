# FM Receiver
My inspiration for this project comes from the outstanding [YouTube series](https://www.youtube.com/watch?v=r_p7AHsSOdw&list=PL9Ox3wpnB0kqekAyz6blg4YdvoEMoJNJY), "Radio Design 101". 

The author of the series also has a [companion website](https://ecefiles.org/rf-design/) where you can find class notes, lab assignments, etc. 

The first step in getting started was ordering some of these excellent [RF prototyping boards](https://github.com/maelh/radio-frequency-prototype-boards/tree/main) and moving away from solderless breadboards. 

I'm going to somewhat organize this page by the "project" number listed on the companion website. 

### Project 1: Tuned RF Amplifier

I decided not to use LT Spice for the simulation work due to the difficulty with getting S-parameters to be calculated, and no support for plotting on a Smith chart. That's not to say that it can't be done -- just wasn't my choice. Instead, I'm using [QucsStudio](https://qucsstudio.de/). It's not perfect either. One annoyance is that you can't easily import the SPICE model of a transistor. Another annoyance is that you can't give an RF power port a complex impedance. But otherwise I've been happy with the GUI and ease of use. 

This is my initial design of a Common Base Class A RF amplifier and the associated DC operating point. I chose this operating point as it seemed to give decent gain with the input voltage of 5V. There is some margin on the table, as I could lower the emitter resistor and operate closer to an emitter current of 5 mA, if needed. But for now, this was a good starting point. 

![cb_amp](https://github.com/user-attachments/assets/02ed81b2-87ec-4be7-87fa-f3cb74385aaf)

Here is the predicted RF performance. My 3dB bandwidth is looking to be about 12 MHz and both S11 and S22 are less than <-10dB at 98 MHz. 

![cb_amp_sparam](https://github.com/user-attachments/assets/4583d7ae-c089-40c1-800d-a73366224222)

Of course, when it comes to RF, the predictions are just a rough starting point. One of the things that I wanted to study, as discussed in the Lecture series, is the impact of component parasitics on the insertion loss of the system. 
