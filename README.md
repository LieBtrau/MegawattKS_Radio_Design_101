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
* [Filter design](./Filters.ipynb)
* [Amplifier design](./amplifier.ipynb)


# Simple radio receiver
* [MikroE Superheterodyne FM Receivers](https://www.mikroe.com/ebooks/radio-receivers-from-crystal-set-to-stereo/superheterodyne-fm-receivers)
