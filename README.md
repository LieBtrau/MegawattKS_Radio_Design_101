# FM Receiver
My inspiration for this project comes from the outstanding [YouTube series](https://www.youtube.com/watch?v=r_p7AHsSOdw&list=PL9Ox3wpnB0kqekAyz6blg4YdvoEMoJNJY), "Radio Design 101". 

The author of the series also has a [companion website](https://ecefiles.org/rf-design/) where you can find class notes, lab assignments, etc. 

The first step in getting started was ordering some of these excellent [RF prototyping boards](https://github.com/maelh/radio-frequency-prototype-boards/tree/main) and moving away from solderless breadboards. 

I'm going to somewhat organize this page by the "project" number listed on the companion website. 

### Project 1: Tuned RF Amplifier and Image Filter

I decided not to use LT Spice for the simulation work due to the difficulty with getting S-parameters to be calculated, and no support for plotting on a Smith chart. That's not to say that it can't be done -- just wasn't my choice. Instead, I'm using [QucsStudio](https://qucsstudio.de/). It's not perfect either. One annoyance is that you can't easily import the SPICE model of a transistor. Another annoyance is that you can't give an RF power port a complex impedance. But otherwise I've been happy with the GUI and ease of use. 

This is my initial design of a Common Base Class A RF amplifier and the associated DC operating point. I chose this operating point as it seemed to give decent gain with the input voltage of 5V. There is some margin on the table, as I could lower the emitter resistor and operate closer to an emitter current of 5 mA, if needed. But for now, this was a good starting point. 

![cb_amp](https://github.com/user-attachments/assets/02ed81b2-87ec-4be7-87fa-f3cb74385aaf)

Here is the predicted RF performance. My 3dB bandwidth is looking to be about 12 MHz and both S11 and S22 are less than <-10dB at 98 MHz. 

![cb_amp_sparam](https://github.com/user-attachments/assets/4583d7ae-c089-40c1-800d-a73366224222)

Of course, when it comes to RF, the predictions are just a rough starting point. One of the things that I wanted to study, as discussed in the Lecture series, is the impact of component parasitics on the insertion loss of the system. So, I built three different pre-select filters on an RF protoboard and measured the S21 with my NanoVNA. 

Here is the first prototype, built from less than a single turn of wire and a 330 pF capacitor. (Note that the cap that I used isn't the desired value, just what I had on-hand at the time being.) 

![bandpass_wireLoop](https://github.com/user-attachments/assets/7d437fbc-9ab3-40a2-aec2-6737f56e5a0f)

Here is the second prototype, built with a 6.9 nH CoilCraft air-wound inductor and the same 330 pF capacitor. 
![s21_coilcraft](https://github.com/user-attachments/assets/ddb52d55-6664-4de4-a05b-77f7c6b50832)
![bandpass-coilcraft](https://github.com/user-attachments/assets/355d9337-8e47-4b52-92e7-ec24140f006e)

So this was interesting and good news, because I could use the small wire-wound inductor as the S21 wasn't too high. I had a long-term plan for making this receiver as small as possible. 

The next step was to measure the input impedance of the amplifier and design a matching network to match it to a 50 Ohm antenna, and then see how close it comes to the one that is the ideal network predicted by QucsStudio. 


### Project 2: Local Oscillator and Mixer

In the "Radio Design 101" series, the presenter describes how to build an oscillator from an amplifier. This sounded interesting; but I also saw this as an opportunity to add a microcontroller to my project, and I really enjoy working with microcontrollers! 

So, I bought an [Si5351 breakout](https://learn.adafruit.com/adafruit-si5351-clock-generator-breakout) board from Adafruit, which had the benefit of already coming with an easy-to-use Arduino library.  I took the base Adafruit library and added two push-buttons increment/decrement the output frequency of the Si5351 for channel selection purposes. 

For a low-side injection at the mixer, the goal is to create a 10.7 MHz difference between the LO and the desired FM station. So, starting at 88.7 MHz, my lowest LO is 78 MHz. 

![tinysa4_LOGMAG_S11_2024-09-15_11-37-53](https://github.com/user-attachments/assets/385cf971-ec32-40af-a03c-ecc6fb97fe11)

In learning a little bit about PLLs and using fractional dividers, the output spurs are to be expected since I'm not using an integer multiplier.  The good thing is that they are so far away from 78 MHz that using the crystal filter on the output of the mixer should easily take care of them. 
