# Quadrature Detector
The [NJM14570](https://www.nisshinbo-microdevices.co.jp/en/products/fm-if-demodulator-ic/spec/?product=njm14570) is a quadrature detector that can be used for FM demodulation. It has a built-in IF amplifier that yields 12dB SINAD at -87dBm input signal level, so it can be used as a complete IF stage and we don't need a separate IF amplifier. 
The NJM14570 is designed to work with an IF frequency of 10.7 MHz, making it suitable for FM broadcast applications.  

## Inductor
The NJM14570 can use an IFT or an 2.2µH inductor (e.g. NLV32T-2R2J-PF: 2.2µH, Q>30 @10.7MHz, 5% tolerance) for the tank circuit.

## Trimming Capacitor
* 10pF : SGC3S100, JZ100, STC3MB10-T1 (JLCPCB part number C22468121)

## Reference
* [yo5ofh : Quadrature FM Detectors](https://www.qsl.net/yo5ofh/doc/fm_detectors/quadrature_fm_detectors.htm)