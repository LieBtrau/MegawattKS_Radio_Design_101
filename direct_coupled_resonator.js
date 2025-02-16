<!-- https://www.changpuak.ch/electronics/Direct-Coupled-Resonator-Bandpass.php -->
<!-- This is the Javascript implementation of the Bandpass Filter tool. And we did write it by ourselves. 100% -->
		<script language="JavaScript">
		
		function morebandwidth() { bw = document.filterform.bandwidth.value * 1; document.filterform.bandwidth.value = bw*1.05 ; rechnen();}
		function lessbandwidth() { bw = document.filterform.bandwidth.value * 1; document.filterform.bandwidth.value = bw*0.95 ; rechnen();}

		function moreresonators() { a = document.filterform.number.value * 1; a++; if (a>7)a=7; document.filterform.number.value = a ; rechnen();}
		function lessresonators() { a = document.filterform.number.value * 1; a--; if (a<2)a=2; document.filterform.number.value = a ; rechnen();}
		
		function rechnen()
		{
		center = document.filterform.center.value *1e6;		// MHz
		bw = document.filterform.bandwidth.value *0.5e6;	// MHz
		rip = document.filterform.ripple.value * 1;			// dB
		n = document.filterform.number.value * 1;			//  
		R = document.filterform.impedance.value * 1;		// Ohm
		Luser = document.filterform.Spule.value * document.filterform.SpuleEinheit.value ;    // 
		welcheSpule = document.filterform.WasSpule.value ;
		
		var pi = 3.141592653;	
		var result = new Array();

		var bw_adjusted ="";
		if (bw>(center*0.4)) { bw=center*0.4; bw_adjusted = "(slightly adjusted)";}
		document.filterform.bandwidth.value=Math.round(2*bw/1E4)/100;
		if (n<2) { n = 2 ;}
		if (n>7) { n = 7 ;}
		document.filterform.number.value = n ;
		if (rip<0.001) { rip = 0 ;}
		if (rip>6) { rip = 6 ;}
		document.filterform.ripple.value = rip ;

		var K = new Array();
		var A = new Array();
		var B = new Array();
		var Cs = new Array();
		var Cp = new Array();
		var Csu = new Array();
		var Cpu = new Array();
		var pi = 3.141592653;
		var XL = 1;
		var L = XL*R/(2*pi*center);
		if (welcheSpule == "myvalue")  L = Luser ;
		if (welcheSpule == "E12") { L = suchenE12(L*1E9); L = L * 1E-9; }
		if (welcheSpule == "E24") { L = suchenE24(L*1E9); L = L * 1E-9; }
		// KORREKTUR XL
		XL = L * 2 * pi * center / R;
		
		var w1 = 1.0-(bw/center);
		var w2 = 1.0+(bw/center);
		var f1 = w1/(2*pi);
		var f2 = w2/(2*pi);
		var f1d = 1/(2*pi);
		var f0 = f1+f2-Math.sqrt((f2-f1)*(f2-f1)+(f1*f2));
		var wd = ((f0/f1)-(f0/f2))*(f0/f1d);
		var XC = 1/XL;
		
		result="";
		
		result = ("Direct Coupled Resonator Bandpass Filter Designer" + '\n');
		result = result + ("https://www.changpuak.ch/electronics/Direct-Coupled-Resonator-Bandpass.php" + '\n');
		result = result + ("Javascript Version : 11. February 2015" + '\n');
		result = result + ("-----------------------------------------------------------------------------" + '\n');
		result = result + ("Design Data for a " + n + "-Resonator Bandpass Filter." + '\n');
		result = result + ("Center Frequency          :    " + (center/1E6).toFixed(3) + " MHz" + '\n');
		result = result + ("Bandwidth                 :    " + (bw/0.5E6).toFixed(3) + " MHz  " + bw_adjusted + '\n');
		result = result + ("Passband Ripple           :    " + rip + " dB");
		if (rip==0) result = result + " (Butterworth Characteristic)";
		if (rip>0) result = result + " (Chebyshev Characteristic)";
		result = result + ('\n');
		result = result + ("System Impedance          :    " + R + " Ohm " + '\n');
		result = result + ("-----------------------------------------------------------------------------" + '\n');
		
		
		// BUTTERWORTH ###########################################################################################
		
		if ( rip == 0 )
		{
			for (i=1;i<=n;i++)
			{
			 K[i]=2*Math.sin(((2*i-1)/(2*n))*pi); 
			 if (i==1) Cs[1] = (1/1.0)*Math.sqrt((wd*XC/K[1])/(1-(wd*XC/K[1])));
			 else Cs[i] = wd*Math.sqrt((XC*XC)/(K[i-1]*K[i]));
			}
			Cs1d = Cs[1]/(1+Math.pow(Cs[1],2));
			for (i=1;i<n;i++)
			{
			 if (i==1)  Cp[1] = XC-Cs1d-Cs[2];
			 else  Cp[i] = XC-Cs[i]-Cs[i+1];
			}
			for (i=1;i<=n+1;i++)
			{
			 Cp[i] = Cp[i]/(2*pi*center*R);
			 Cs[i] = Cs[i]/(2*pi*center*R);
			}
			for (i=n+1;i>=n/2;i--)
			{
			 Cp[i] = Cp[n-i+1];
			 Cs[i] = Cs[n-i+2];
			}
		}

		// CHEBYSHEV ###########################################################################################
		
		if ( rip > 0 )
		{
			e = Math.pow(1/(Math.pow(10,(-1*rip)/20)),2)-1;
			b = Math.log((Math.exp(2*(rip/17.37))+1)/(Math.exp(2*(rip/17.37))-1));
			Y = (Math.exp(b/(2*n))-Math.exp((-1*b)/(2*n)))/2;
		    for (i=1;i<=n;i++)
		    {
		      A[i]=Math.sin(((2*i-1)/(2*n))*pi);
		      B[i]=Math.pow(Y,2)+Math.pow(Math.sin((i*pi)/n),2);
		      if (i==1) K[i] = (2*A[i])/Y;
		      else K[i] = (4*A[i-1]*A[i])/(B[i-1]*K[i-1]);
		    }

		    for (i=1;i<=n;i++)
		    {
		      if (i==1) Cs[i] = Math.sqrt((wd*XC/K[i])/(1-(wd*XC/K[i])));
		      else  Cs[i] = wd*Math.sqrt((XC*XC)/(K[i-1]*K[i]));
		    }
			Cs1d = Cs[1]/(1+Math.pow(Cs[1],2));
			for (i=1;i<n;i++)
			{
			 if (i==1)  Cp[i] = XC-Cs1d-Cs[2];
			 else  Cp[i] = XC-Cs[i]-Cs[i+1];
			}
			for (i=1;i<=n+1;i++)
			{
			 Cp[i] = Cp[i]/(2*pi*center*R);
			 Cs[i] = Cs[i]/(2*pi*center*R);
			}
			for (i=n+1;i>=n/2;i--)
			{
			 Cp[i] = Cp[n-i+1];
			 Cs[i] = Cs[n-i+2];
			}
		}

		
		// FORMATTED OUTPUT ###########################################################################################
		
		for (j=1;j<=n+1;j++)
		{ 
		 if      (Cs[j]<1e-9) {Csu[j]=" pF";  Cs[j]*=1e12;} 
		 else if (Cs[j]<1e-6) {Csu[j]=" nF";  Cs[j]*=1e9;}  
		 else if (Cs[j]<1e-3) {Csu[j]=" uF";  Cs[j]*=1e6;}  
		 else if (Cs[j]<1) {Csu[j]=" mF";  Cs[j]*=1e3;}
		 Cs[j] = Cs[j].toFixed(2);
		}
		
		if (L<1e-9) {Lu=" pH";  L*=1e12;} 
		else if (L<1e-6) {Lu=" nH";  L*=1e9;}  
		else if (L<1e-3) {Lu=" uH";  L*=1e6;}  
		else if (L<1) {Lu=" mH";  L*=1e3;}
		
		for (j=1;j<=n;j++)
		{ 
		 if      (Cp[j]<1e-9) {Cpu[j]=" pF";  Cp[j]*=1e12;} 
		 else if (Cp[j]<1e-6) {Cpu[j]=" nF";  Cp[j]*=1e9;}  
		 else if (Cp[j]<1e-3) {Cpu[j]=" uF";  Cp[j]*=1e6;}  
		 else if (Cp[j]<1) {Cpu[j]=" mF";  Cp[j]*=1e3;}
		 Cp[j] = Cp[j].toFixed(2);
		}

		for (j=1;j<=n;j++)
		{ 
		 result = result + "Coupling Capacitor : " + Cs[j] + Csu[j] + "\r";
		 result = result + "Resonator #" + j + " C : " + Cp[j] + Cpu[j] + " // L : " + L.toFixed(2)  + Lu + '\r';
		}
		result = result + "Coupling Capacitor : " + Cs[n+1] + Csu[n+1] + "\r";
		result = result + ("-----------------------------------------------------------------------------" + '\n');
		result = result + ("Please verify by simulation that attenuation above passband is sufficient." + '\n');
		result = result + ("Negative capacitances indicate an unhappy inductance." + '\n');

		document.filterform.result.value = result;

		}

		</script>
