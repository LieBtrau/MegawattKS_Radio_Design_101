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
| [TIR1](#tir1)<a id="tir1"/> | Output amplitude is too low and no DC-offset | add 10K potmeter to give Q3.G a DC offset so that the DC-offset equals the AC-amplitude |  |

# Test Results
| Action | Expected Result | Observed result | Status |
|--------|-----------------|-----------------|--------|
| Switching operation | switching | amplitude is too low and no DC-offset | [🛑 TIR1](#tir1)<a id="tir1"/> |
| Mixing output at 200 kHz with -20dBm input| -23 dBm | -23.2 dBm | ✅ |
| 10.7 MHz Input leakage | ? | -69.4 dBm | ✅ |
| 10.5 MHz LO leakage | ? | -59.9 dBm (this is the strongest by product in the 5 MHz to 50 MHz range) | ✅ |

# Test Result Details