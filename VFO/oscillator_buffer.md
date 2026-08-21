# Where to connect your buffer amplifier?
Do not directly tap off from a high-impedance point, such as the top of a parallel LC-network.  You'll need an even much higher Zin of your buffer, which is very difficult to do at VHF-frequencies.  An input capacitance of 5 pF is only 320 ohm.

For a common-base Colpitts design, the middle of the capacitive divider offers a much lower output impedance.  The output voltage will be lower, but you probably don't need volts of input swing anyway.

See [CB_Colpitts3](./simulation/CB_Colpitts/CB_Colpitts3.asc) : delivers 7dBm with a pair of DC-coupled CC-buffers.

Options to checkout : 
* buffer used on LO : doesn't provide voltage amplification.
* buffer used on Seiler VFO : lot's of harmonics
* [Buffer from Vackar](https://www.qsl.net/va3diw/vackar1.gif)
* [buffer from Vackar](https://lh3.googleusercontent.com/sitesv/AG8ngQWFMuCa9ZdmsUtQVY7DW7eWAQ-OCeyN54YrXL1_uM01zbbkHAJeXSAAcEV7q6i2KIyeC3dvJLwgZvyJ2k7KJZu0vlMZGKHpjI-XxzCBZL2L0_6IXYnOEE1fd8H6Fo6Znh90JynjlQGVuXphLEoiYezwjXnOhJkDKBEfVG75CzOX9Rut349j99njImwD8q62244R6Nvx81hC=w1280)

# Buffer amplifier
At these high frequencies, each buffer amplifier stage has a current gain of only 6.  So the resistance seen looking into the base is only 6 times the resistance seen looking into the emitter.  Therefore, we need at least two buffer stages to isolate the oscillator from the mixer stage.

1. Design it from back to front.
2. Replace biasing resistors by thevenin equivalent and replace emitter resistor by a current source.
3. Set signal source at the input to 700 mV amplitude.  With a 1x voltage gain, it will result in 700 mV at the output.  That is 7 dBm into 50 ohms, which is 15 mArms.
4. Tune the current source to get lowest distortion at about 7dBm output power.  It will be in the order of 15mA collector current.
5. Either replace the current source by an actual current source circuit, or replace it by an emitter resistor.
6. Tune the thevenin equivalent resistance and voltage to get the lowest distortion at that output power.  Ideally, the thevenin equivalent resistance should be as high as possible to avoid loading the preceding stage.
7. Then replace the thevenin equivalent by the preceding CC-amplifier stage.
8. Again have the emitter resistor replaced by a current source, and tune the current source to get lowest distortion at that output power.
9. Again replace the biasing resistors by thevenin equivalent.
10. Finally, replace the thevenin equivalent by the resistors.

# Optimizations
## Tapping point
The voltage was originally tapped of at the collector of the CB-Colpitts.  That's a very high impedance point with a high peak-peak voltage.  This makes it hard to connect it to a buffer amplifier, because of the required even higher input impedance to avoid to load the tank circuit too much.

It's easier to tap off at a lower impedance point that still has enough voltage swing.  That's typically the emitter of a CB-colpitts oscillator, which is also the middle of the capacitive voltage divider.  That's also done on the two designs shown above.

# Tapping connection
The connection between the oscillator and the buffer was originally a low value capacitance.  That doesn't load the tank circuit too much.  Because of the large tuning range (+/-10% of the center frequency) the coupling impedance varied by 20%.  This also caused a 20% change in output power of the buffer.

The low value coupling capacitor has been replaced by a series connection of 10 nF (to provide DC-isolation) and 200 ohm (adds to the buffer's input impedance).

## Buffer amplifier
The original two stage common collector buffers provided only 200 mVpp (-10 dBm), which is barely enough to make the DBM work.  Even tapping of at the middle of the capacitive divider didn't work.  Clearly an additional buffer stage was needed.  Instead of that, the buffer amplifier has been replaced by a cascode (high Zin, high Zout) followed by a common collector buffer (high Zin, low Zout).  The cascode provides some amplfication and it allows for more "tuning" of the output power than if three common collector stages would have been used.