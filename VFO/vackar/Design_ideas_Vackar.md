# Notes
* Varactor behaves as a non-linear resistor and variable capacitor. All parameters change with temperature, frequency, DC voltage, and RF voltage. Direct varactor tuning for low noise oscillator is not a good idea.
* In simulation, very high tank voltages (50Vpp), so quality factor (and likely stability) will be quite high.

# Tuning capacitors
* Single varactor is not an option (needs series cap to reduce voltage, which then limits tuning range)
* Air variable capacitor is not an option (expensive and needs mechanical reduction for precise tuning)
* Murata has the LXRW19V330-050, but it's very small (0.9 x 1.3 mm) and not recommended for new designs.

# Simulation
* Design for a single frequency is pretty straightforward using either JFET or BJT.
* Unlike a Colpitts oscillator, the output amplitude doesn't vary with tuning.
* The real challenge is tuning the Vackar with a varicap while maintaining high tank Q.  The high tank Q causes high voltage over the smallest capacitor in the chain, which is the varicap in most cases.  Other caps can be made smaller to remedy this, but then the varicap needs a much larger capacitance change to cover the same frequency.  Many varicaps in parallel might do the job.
* Lowering the tank Q by loading it more also reduces oscillation amplitude to within the varicap's range.  But low tank Q means less stable.
* Instead of a varicap, a polyvaricon (i.e. air variable) capacitor could be used.  However, polyvaricons are obsolete technology and they need some mechanical ways to allow for fine adjustment (big wheel or reduction with gears or cords).

## Colpitts as alternative
If the vackar (known for high Q) only works with a varicap when the tank Q is lowered drastically, what's the point of using a vackar oscillator then?  Then we might use the colpitts just as well.  We have a colpitts VFO working already.  Better to improve on that one than starting a completely new journey with a vackar VFO.

# References
* [VCO: Vackar 30Mhz-240Mhz](https://sites.google.com/site/linuxdigitallab/low-noise-crystal-experiment/oscillators/vco-vackar-30mhz-240mhz)
* [The Vackar VFO Oscillator (v.2 VA3DIW)](https://www.qsl.net/va3diw/vackar.html)
* [Vackar Oscillator Circuit](https://sites.google.com/view/analogelectronics/home/vackar-oscillator-circuit)
* [High Frequency VCO Design and Schematics : VA3IUL](./doc/High_Frequency_VCO_design_and_schematics.pdf)