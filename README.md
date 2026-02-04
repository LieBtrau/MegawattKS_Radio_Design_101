# Overview
This FM broadcast receiver is based on the ["Radio Design 101" YouTube series](https://www.youtube.com/watch?v=r_p7AHsSOdw&list=PL9Ox3wpnB0kqekAyz6blg4YdvoEMoJNJY).

The author of the series also has a [companion website](https://ecefiles.org/rf-design/) where you can find class notes, lab assignments, etc. 

<figure>
    <img src="./doc/RadioBlockDiagram.png" width="600" alt="missing" />
    <figcaption>FM broadcast receiver block diagram from the PDF-slides of the Radio Design 101 series</figcaption>
</figure>

# Power supply
5V will be used to power the receiver so that we can keep the design relatively low power.  This unfortunately means limitations on the OIP3 of the amplifiers.  

## Project 1: Tuned RF Amplifier and Image Filter 
* [Preselector filter](./preselector_filter/Filters.ipynb)
* [RF Amplifier](./CB-CC_amplifier/CB-CC_amplifier.ipynb)
* [Altium design : LNA 1.0.2A](https://365.altium.com/files/E94FC5CA-4852-404E-B517-56AADBFE7270)

## Project 3 : Mixer and IF Amplifier
* [Mixer](./mixer/mixer.ipynb)
* [Termination Insensitive Amplifier](./post_mixer_amplifier/TIA.ipynb)
* [Altium design : mixer 1.0.0](https://365.altium.com/files/F208B1A5-9C89-4744-8A48-3EA8E93C1159)

## Project 4 : Detector and Audio Amplifier
* [FM Detector](./detector/detector.ipynb)
* [Audio Amplifier](./audio_amplifier/audio-amp.ipynb)
* [Altium design : FMDET 1.0.0A](https://365.altium.com/files/EC3D910A-1821-4A3E-BA8B-47F879EACFAB)

# Other resources
* [MikroE Superheterodyne FM Receivers](https://www.mikroe.com/ebooks/radio-receivers-from-crystal-set-to-stereo/superheterodyne-fm-receivers)

# Similar projects
* [Koen van Dijken : FM receiver](https://github.com/kvdijken/FM-Receiver/)
* [Phil's Valve Radio Site : Double Conversion Pulse Counting FM Superhet Receiver With 10.7 MHz First IF Stage](https://www.philsvalveradiosite.co.uk/doubleconversionpulsecountingfmtuner_1.htm)