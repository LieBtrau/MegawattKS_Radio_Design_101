# Equipment

| Equipment | Description | Serial Number | Date of last calibration |
|-----------|-------------|---------------|--------------------------|
| Multimeter | Mastech M92 | 20011206033 | - |
| Multimeter | Fluke 8010A | 2047249 | - |
| Oscilloscope | Siglent SDS2354X HD |  SDS2HBAQ6R0257 | TBD |
| Power Supply | Siglent SPD3303C | SPD3EEEC6R0513 | TBD |
| Electronic Load | Siglent SDL1020X-E | SDL13GCC6R0182 | TBD |
| Spectrum Analyzer | ZeenKo ZS-406 | SU-406-25030820 | TBD |
| Function Generator | Siglent SDG2122X | SDG2XFBX901368 | TBD |

# Test Incident Reports

| Test | Incident | Proposed Solution | Status |
|------|----------|-------------------|--------|
| [TIR1](#tir1)<a id="ttir1"/> | LO doesn't oscillate | reduce R1 to 0 ohm |  |
| [TIR2](#tir2)<a id="ttir2"/> | LO oscillates at 10.65 MHz instead of 10.5 MHz | adjust C4 to 22 pF in series with 330 pF<br/>In the final application, 330 pF should be replaced by a capacitor in parallel to a trimmer. |  |
| [TIR3](#tir3)<a id="ttir3"/> | Output amplification is 0 | C7 must be connected to Q2.E instead of Q2.C |  |
| [TIR4](#tir4)<a id="ttir4"/> | Output amplitude is 0.8 Vpp instead of > 1 Vpp | set C8 to 68 pF |  |

# Test Results
| Action | Expected Result | Observed result | Status |
|--------|-----------------|-----------------|--------|
| Vdc Q1.1 | 1.99 V| 2.00 V| ✅  |
| OSC-OUT | 1.23 V| 1.22  V| ✅ |
| Vdc Q1.3 | 2.43 V| 2.45 V| ✅ |
| OSC-OUT | oscillating | no oscillation| [🛑 TIR1](#ttir1)<a id="tir1"/> |
| OSC-OUT | 10.5 MHz | 10.65 MHz| [🛑 TIR2](#tir2)<a id="tir2"/> |
| Q2.B | 1.20 V | 1.20 V | ✅ |
| Q2.E | 0.51 V | 0.49 V | ✅ |
| Q2.C | 4.43 V | 4.43 V | ✅ |
| Output amplification | 174 | no amplification | [🛑 TIR3](#tir3)<a id="tir3"/> |
| Output amplification after T3 fix| -174 | 760 / 12 = -63.3 |  |
| Output amplitude | > 1 Vpp | 0.8 Vpp | [🛑 TIR4](#tir4)<a id="tir4"/> |


# Test Result Details

## TIR2: LO oscillates at wrong frequency

* Oscillation frequency is 10.65 MHz with C4 = 18 pF.
* Oscillation frequency is 10.05 MHz with C4 = 20 pF.
* Oscillation frequency is 10.29 MHz with C4 = 18 pF and C3 = 20 pF.

C3 can remain at 18 pF to avoid loading the tank circuit.  C4 can be split into 22pF in series with another capacitor.
That capacitor can then be split into 100 pF in parallel with a capacitor to be tuned.

* C4 = 18 pF & 560 pF → 10.704 MHz
* C4 = 22 pF & 560 pF → 10.356 MHz 
* C4 = 22 pF & 470 pF → 10.387 MHz 
* C4 = 22 pF & 330 pF → 10.491 MHz → ✅
* C4 = 22 pF & 120 pF → 10.760 MHz 

### TIR4: Output amplitude is too low
* Output amplitude is 746 mVpp with C8 = 10 pF
* Output amplitude is 2.08 Vpp with C8 = 33 pF and 1k5 load
* Output amplitude is 2.05 Vpp with C8 = 68 pF and 10k potmeter load