# FM Receiver
My inspiration for this project comes from the outstanding [YouTube series](https://www.youtube.com/watch?v=r_p7AHsSOdw&list=PL9Ox3wpnB0kqekAyz6blg4YdvoEMoJNJY), "Radio Design 101". 

The author of the series also has a [companion website](https://ecefiles.org/rf-design/) where you can find class notes, lab assignments, etc. 

The first step in getting started was ordering some of these excellent [RF prototyping boards](https://github.com/maelh/radio-frequency-prototype-boards/tree/main) and moving away from solderless breadboards. 

I'm going to somewhat organize this page by the "project" number listed on the companion website. 

### Project 1: Tuned RF Amplifier and Image Filter 

#### Simulations
I decided not to use LT Spice for the simulation work due to the difficulty with getting S-parameters to be calculated, and no support for plotting on a Smith chart. That's not to say that it can't be done -- just wasn't my choice. Instead, I'm using [QucsStudio](https://qucsstudio.de/). It's not perfect either. One annoyance is that you can't easily import the SPICE model of a transistor. Another annoyance is that you can't give an RF power port a complex impedance. But otherwise I've been happy with the GUI and ease of use. 

This is my initial design of a Common Base Class A RF amplifier and the associated DC operating point. I chose this operating point as it seemed to give decent gain with the input voltage of 5V. There is some margin on the table, as I could lower the emitter resistor and operate closer to an emitter current of 5 mA, if needed. But for now, this was a good starting point. 

A couple of notes. First, I am using component values that I have on hand, not the ideal simulation values. Second, I have combined the image filter and matching network inductor into a single inductor, for the purposes of measuring the S21 through a VNA. When this is finally hooked up into the receiver circuit, I will have to adjust this inductor to account for the fact that the input to the mixer stage is 1.5K Ohms. 

![amp_pic](https://github.com/user-attachments/assets/c6208826-0576-438f-9626-4b769f2b1177)

Here is the predicted RF performance. My 3dB bandwidth is looking to be about 12 MHz and both S11 and S22 are less than <-10dB at 98 MHz. 

![cb_sp](https://github.com/user-attachments/assets/ea8e3433-f29e-4b43-9fb9-d4d434598a3f)

#### Measurements

Of course, when it comes to RF, the predictions are just a rough starting point. One of the things that I wanted to study, as discussed in the Lecture series, is the impact of component parasitics on the insertion loss of the system. So, I built three different pre-select filters on an RF protoboard and measured the S21 with my NanoVNA. 

Here is the first prototype, built from less than a single turn of wire and a 330 pF capacitor. (Note that the cap that I used isn't the desired value, just what I had on-hand at the time being.) 

![bandpass_wireLoop](https://github.com/user-attachments/assets/7d437fbc-9ab3-40a2-aec2-6737f56e5a0f)

Here is the second prototype, built with a 6.9 nH CoilCraft air-wound inductor and the same 330 pF capacitor. 
![s21_coilcraft](https://github.com/user-attachments/assets/ddb52d55-6664-4de4-a05b-77f7c6b50832)
![bandpass-coilcraft](https://github.com/user-attachments/assets/355d9337-8e47-4b52-92e7-ec24140f006e)

So this was interesting and good news, because I could use the small wire-wound inductor as the S21 wasn't too high. I had a long-term plan for making this receiver as small as possible. 

The next step was to measure the input impedance of the amplifier and design a matching network to match it to a 50 Ohm antenna, and then see how close it comes to the one that is the ideal network predicted by QucsStudio. 

Here is a picture of my completed amplifier, with both the input and output filters. The output stage was missing the matching network in this picture. 

![LNA_build](https://github.com/user-attachments/assets/3981b2d6-12e8-4046-a1b7-8b36666e4b59)

Measuring the input impedance with using the matching network as predicted by QucsStudio actually gave me a very good S11 on the first try. whoohoo! 

However, the output impedance was a different story. I started with the predicted components for the image reject filter, a 470 nH inductor and 5.6 pF cap, followed by a 1 uF series DC block. I measured about 35 - j300 at 98 MHz, which was way off. But it was interesting, because this value was on the simulation curve of S22, but around 165 MHz! So when I went back to the simulation and used a shunt cap value of 11 pF instead of 5.6 pF, the simulation did show an impedance of 32 - j300 at 98 MHz. This would mean that I had about 5.5 pF of parasitic capacitance in my setup. According to the Johanson  I am using RF capacitors from Johanson, but I am also using 0805 wirewound inductors instead of winding my own wire inductors. Could this be contributing? Not sure.  

So, I lowered the 5.6 pF cap down to 1pF and measured about 2300 - j50 at 98 MHz, and this was great. I decided to press on.  Ultimately, I had to swap out components quite a few times to get a decent output impedance match to 50 Ohms. But, I finally acheived an S11 of <-10 dB, and then went to measure my S21 (gain). 

![S21_gain_LNA](https://github.com/user-attachments/assets/17ec4d67-71d9-409c-b228-4ae40ed6f91e)![LNA_stats](https://github.com/user-attachments/assets/b60f5bd1-3531-45fa-9582-5648ce5ea764)


Now, this was lower than predicted by almost 7 dB! So where did it all go? Well, that's the importance of having low insertion loss and high Q in the input/output filters and matching networks. And it's also a lesson in how simulation can stray from reality. I went back and adjusted some of the parasitics of the simulation and could see that the predicted gain dropped closer to the value that I measured, so i was satsified with this. 

I also did a quick check to see what happened if I increased my supply voltage to 9V, and while it did slightly shift the peak frequency to 100 MHz, it also bumped up my gain by a good amount. 

![s21_gain_LNA_9volts](https://github.com/user-attachments/assets/bd9963e9-63d7-48d5-a095-4219cc0c9f71)![LNA_stats_9volts](https://github.com/user-attachments/assets/3b249d8e-761c-4d53-91a9-b114b74227d3)

So it would seem that I have an option of running at a higher DC voltage, if I need to. 

As a final check on the "goodness" of this project, I compared a before/after sweep in the TinySA. 

I considered this project finished enough for me to move on to the next one....


### Project 2 & Project 3: Local Oscillator, Mixer, and IF Filter

In the "Radio Design 101" series, the professor describes how to build an oscillator from an amplifier. This sounded interesting; but I also saw this as an opportunity to add a microcontroller to my project, and I really enjoy working with microcontrollers! 

So, I bought an [Si5351 breakout](https://learn.adafruit.com/adafruit-si5351-clock-generator-breakout) board from Adafruit, which had the benefit of already coming with an easy-to-use Arduino library.  I took the base Adafruit library and added two push-buttons increment/decrement the output frequency of the Si5351 for channel selection purposes. 

For a low-side injection at the mixer, the goal is to create a 10.7 MHz difference between the LO and the desired FM station. So, starting at 88.7 MHz, my lowest LO is 78 MHz. I programmed the Si5351 to output 78 MHz, and then connected the output SMA to the input of my TinySA through 30 dB of attenuation. 

![tinysa4_LOGMAG_S11_2024-09-15_11-37-53](https://github.com/user-attachments/assets/385cf971-ec32-40af-a03c-ecc6fb97fe11)

In learning a little bit about PLLs and using fractional dividers, the output spurs are to be expected since I'm not using an integer multiplier.  I verified that these spurs were caused by the fractional PLL dividers by setting it to an integer: 25 MHz * 32 / 8 = 100 MHz. Here is what I saw: 

![tinysa4_LOGMAG_S11_2024-09-15_14-19-45](https://github.com/user-attachments/assets/16f9bf0f-4bbc-41b4-992f-872e66abd41c)

The good thing is that the spurs are so far away from 78 MHz that using the crystal filter on the output of the mixer should easily take care of them.

I am currently a bit stuck on this Project/sub-system as I'm not sure if I'm getting the correct output levels. I've got the tuned RF amplifier connected to the mixer connected to the IF filter. If I put in a a -50 dBm input into the RF amplifier, I measure about -42 dBm at the output of the IF filter. I'm not sure if this is correct so I'm going to put a placeholder here for now while I work on the next subsystem. 

![system-3](https://github.com/user-attachments/assets/ce3773eb-7625-423b-a728-a7f2760079c0)


### Project 3: IF Amplifier and Demodulator

As first presented in the "Radio Design 101" series, the IF amplifier sub-system consists of back-to-back cascode stages. This was due to needing 65 dB of gain in the IF section, given 20 dB of gain in the input amplifier stage and 10 dB of gain in the mixer stage. I simulated this IF amplifier configuration and the predicted gain at 10.7 MHz was about 75 dB. 

![IF_amp_2cascode](https://github.com/user-attachments/assets/c97fe861-303a-4e02-9e09-8150d350272d)

![IF_amp_2cascodeGAIN](https://github.com/user-attachments/assets/6761e223-7c60-4551-9a06-a77143e4a943)

I decided to build one stage and test/measure them as separate units. My simulation of a single stage predicted a gain of greater than 40 dB. 

![IF_amp_1cascode](https://github.com/user-attachments/assets/f0be605c-313c-416b-8e14-cbd1fd38f495)

![IF_amp_1cascodeGAIN](https://github.com/user-attachments/assets/c1db2135-71f5-470b-b966-3b44606fb95f)

You'll notice the large-ish inductor in the output filter of the amplifier. I was going to have to avoid my fear of winding toroids and making my own inductors, because there was no way that a chip inductor of 10 uH was going to have acceptable performance. I had purchased the two types of toroid cores as recommended in the course's lecture notes from a great [online store](https://kitsandparts.com/). They also have an [inductance calculator](http://toroids.info/) that is really easy to use. Based on using the FT37-67, the number of windings was about 22 at 10.7 MHz. So I used some 27 AWG magnet wire and gave it a shot! After winding, I used my NanoVNA to measure the inductance at 10.7 MHz at it was right about 9.5 uH, so I considered this a win for my first try. 

The next step was to build a single stage and measure the performance. Here is the completed stage: 

![IF_amp_build](https://github.com/user-attachments/assets/42749395-5ab4-4a99-b63b-43fe67bebe2e)

The first thing that I did was use my multimeter to verify the DC operating point, and since that looked good, I hooked up the NanoVNA to measure the gain. As described in the Youtube series, I used attenuators on the input and output, and I was able to perform a "through" calibration on this low signal. The result was a little noisy, as you can see in the graph, but overall the measured gain aligns very nicely with the predicted gain. 

![IF_amp_measure1](https://github.com/user-attachments/assets/61dbc3b4-1205-462f-8f14-1b8d8a31d4d9)

![IF_amp_measure2](https://github.com/user-attachments/assets/22f879d1-dcbd-4d83-b3ff-3d54bd9c93f6)

The next step of the process was to build the FM demodulator. I implemented the following circuit as-is, including the adjustable inductor for tuning after the circuit was built. 

![classic_FM_demod](https://github.com/user-attachments/assets/fd58d572-3f7a-4dc2-a5ea-9cfcefce81ef)

For the inductor, I used a Coilcraft 143-09J12S, which has a variable inductance from 315 nH to 423 nH. Here is my phase shifter hooked up to the output of the IF amplifier, as well as the TinySA which I used for testing. 

![phase_shifter](https://github.com/user-attachments/assets/2335e25d-1c0b-496f-b65f-8076d806ba47)

For testing, I used a combination of an oscilloscope and a powered speaker set. First, I used the oscilloscope to adjust the value of the tuning inductor until I saw the maximum amplitude sine-ish wave that was possible. 

![phase_shifter_scope](https://github.com/user-attachments/assets/e789a544-6ff8-427e-b935-4d732abbb710)

Next, I hooked up my powered speaker set to the output and listened for the 1 KHz tone, which I could hear quite well. It was working! At this point I was getting so close to the finished receiver that it was starting to feel like it could really work! It was time to connect all of the pieces together, which consisted of two RF proto-boards and a separate breadboard with the LO clock generator. 

![final_receiver](https://github.com/user-attachments/assets/c6bc2d10-5629-4c48-8d1a-0fc4139c71d3)

AND......IT WORKED! I started with one of the strongest radio signals in the area and I was able to hear it! 

The next step was to see just how well it worked. I tuned around the FM band in my area and recorded the signal amplitudes using the TinySA and the same antenna as my FM receiver. I also used my Yaesu FT3D as a comparison FM receiver. And my receiver was succesful in hearing a handful of stations! This was really exciting since I already knew of some limitations in my design, based on the "Receiver Performance" video from Radio Design 101. 

![receiver_comparison](https://github.com/user-attachments/assets/3deed4f1-4853-450a-9688-0b682fb3e2ce)

### Known Limitations and Next Steps

As described in the "Receiver Performance" video, there are a few known limitations in this initial design. Unlike the video series, I don't have a very strong blocking radio signal nearby that is causing issues for nearby, weaker stations. I believe that most of my limitations come from: 
1. Low(ish) gain on the RF front-end amplifier (I only have about 11 dB of gain)
2. Not great impedance matching (I didn't implement a matching network between the LNA output and the mixer, nor between the mixer and IF filter)
3. Single stage IF amplifier (Like the series, I only implemented a single stage of the IF amplifier with ~40dB of gain)

I might take a crack at improving my FM receiver in the future, but overall I am very happy with this initial prototype. I learned so much from watching the video series, but the bulk of my learning definitely came from building, testing, and trouble-shooting. 

## First Update

I decided to try an easy improvement by adding a second stage to the IF amplifier. I also included another filtering stage between the two IF amplifiers, thinking that this might help knock down any strong stations that were close to my desired station. And this improvement nearly doubled the number of stations that I could receive!  So this was an easy way to improve the receiver and I think that the next possible improvement would either be re-designing the LNA or adding the Q-enhanced front-end filter, as described in one of the epilogue episodes from "Radio Design 101". 

![receiver_comparisonBooted](https://github.com/user-attachments/assets/e1459b09-6cd0-4354-8e6a-6c1a3c45ab62)
