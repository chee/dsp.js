# @chee/dsp

@chee/dsp is a digital signal processing library for javascript. It functions for
signal analysis and generation, including Window functions (Hann, Hamming, etc)
and FFT and DFT transforms.

## Modules

- `DFT(bufferSize, sampleRate)`: Discrete Fourier Transform

  - Usage:
    ```js
    import DFT from "@chee/dsp/dft.js"
    let dft = new DFT(1024, 44100)
    dft.forward(signal)
    let spectrum = dft.spectrum
    ```

- `FFT(bufferSize, sampleRate)`: Fast Fourier Transform

  - Usage:
    ```js
    import FFT from "@chee/dsp/fft.js"
    let fft = new FFT(2048, 44100)
    fft.forward(signal)
    let spectrum = fft.spectrum
    ```

Copyright (c) 2010 Corban Brook

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
