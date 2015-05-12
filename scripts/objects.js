/*
MODEL OBJECTS FOR RANDOMIZING 2015
todos los modelos de estructuras para randomizing
*/

Room={
	  "index":0, 	
      "width":0,
      "height":0,
      "init": function()
      	      {
      	      	//dimension del navegador
      	      	this.width=canvas.width;
      	      	this.height=canvas.height;

      	      	//camara del room
	      	      	// Cargar Cámara
	      	      	this.camera=new BABYLON.ArcRotateCamera("Camara", 0, 0, 10, new BABYLON.Vector3(0, 25, 0), this.output);
	      	      	// Agregar de la cámara al escenario
	                //this.camera.attachControl(canvas, false);

	            //luz del room
	            this.light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 10, 2), Escenario);
	            this.light.range=20;	 
	            this.light.intensity=4;
      	      },
      "output":undefined
	 };	

WINDOW={
	   "Width":0,
       "Height":0,
       "DHeight":0,
       "DWidth":0,
       "WPercent":0.0,
       "HPercent":0.0,
       "init": function()
               {
					 with(this)
					 {    
					  canvas.width  = window.innerWidth;
					  canvas.height = window.innerHeight;
					  Width= canvas.width;
					  Height= canvas.height;
					  DWidth=Math.abs(Width-480);
					  DHeight=Math.abs(Height-320);
					  WPercent=1+DWidth/Width; 
					  HPercent=1+DHeight/Height;   
					 } 
			   
		       }
       };

Mouse=null;

Texto={
       "idioma":1,
       "label":Array(),
       "font":{
	       "Family":"sans-serif",
	       "Size":20,
	       "Color":"white"
               },
       "init": function()
             {	     
	      //español 
	      this.label.push(Array());	 
	      this.label[0].push("Jugar");
	      this.label[0].push("Información");
	      this.label[0].push("Atrás");
	      //Ingles
	      this.label.push(Array());	 
	      this.label[1].push("Play");
	      this.label[1].push("Information");
	      this.label[1].push("Back");
      
		 
	     },
	     "getLabel": function(ind)
				     {
				     	return this.label[this.idioma][ind];
				     }

      };
Intf={
	  "Controls":{
	  			  "Conf":null,	
	  			  "Panels": Array(),//paneles de los diferentes menus
	  			  "Labels": Array(),//los controles que tienen labels para cambiar	
	  			  "CurrentPanelOrientation":false,
	  			  "CurrentPanel":0
	  			},
	  "init":function()
	  	    {

		  	    	function CreateBtnBack(panel)
		  	    	{

					
		  	        		Btnback= document.createElement("button");
		  	        		BbLabel= document.createElement("p");
		  	        		W=90*WINDOW.WPercent;
  	        				W2=50*WINDOW.WPercent;
		  	        		with(Btnback)
		  	        		{
		  	        			with(style)
		  	        			{
		  	        				
		  	        				position="absolute";
		  	        				top=(canvas.height-W)+"px";
		  	        				left=(canvas.width-W)+"px";

		  	        				border="none";
		  	        				width= "0px"; 
		  	        				height= "0px"; 
		  	        				borderLeft= W2+"px solid transparent";
		  	        				borderRight= W2+"px solid transparent"; 
		  	        				borderBottom= W+"px solid red";
		  	        				background="transparent";
		  	        				transform="rotate(-45deg)";

		  	        			}
		  	        			

		  	        		}
		  	        		with(BbLabel)
		  	        		{
		  	        			with(style)
		  	        			{
									position="absolute";
		  	        				top=(canvas.height-(W/1.1))+"px";
		  	        				left=(canvas.width-(W/1.5))+"px";
		  	        				color="white";
		  	        				fontSize=(W2/2)+"px";
		  	        				transform="rotate(-45deg)";
		  	        			
		  	        			}
		  	        			innerHTML="Back";
		  	        		}
		  	        		Btnback.onclick=function ()
				 						{
				 								Intf.Change=true;
					  	        				Intf.Controls.CurrentPanel=0;	
				 						};

		  	        		panel.appendChild(Btnback);
		  	        		panel.appendChild(BbLabel);
		  	        		Intf.Controls.Labels.push(BbLabel);
	
		  	    	}
	  	    	dad=document.getElementsByTagName('body');
	  	    	dad=dad[0];
	  	    	son=document.createElement("div");	  	    	

	  	        //menu
	  	        //2 paneles
	  	        for(var i=0;i<4;i++)
	  	        { 	
	  	        panel=document.createElement("div");
	  	        FONTSIZE=30*WINDOW.WPercent+"px";
		  	        with((i?panel:son))
		  	        {
		  	        	with(style)
		  	        	{
		  	        		width=canvas.width+"px";
		  	        		height=canvas.height+"px";
							
		  	        		position="absolute";
		  	        		
		  	        		if(!i)
		  	        		{
		  	        			background="url(textures/spr1.png)";
		  	        			backgroundSize="100%";
		  	        			top="0px";
		  	        			left="0px";
		  	        			fontSize=FONTSIZE;
		  	        		}
		  	        		else
		  	        		{
		  	        			panel.X=canvas.width*(i-1);
		  	        			panel.Y=canvas.height*(i-1);
		  	        			panel.Orientation=panel.X>0;
		  	        			panel.PreviousOrientation=panel.Orientation;
		  	        			top=panel.X+"px";
		  	        			left=panel.Y+"px";
		  	        		}
		  	        			
		  					
		  	        	}
		  	        	
		  	        }
		  	        switch(i)
		  	        {
		  	        	case 1://Menu principal
		  	        		//titulo principal del juego
							title=document.createElement("img");
				  	        with(title)
				  	        {
				  	        	with(style)
				  	        	{
				  	        		width="100%";
				  	        		height="100%";
				  	        	}
				  	        	src="textures/spr2.png";

				  	        }
				  	        panel.appendChild(title);	

				  	        //botones play y information
				  	        for(var ii=0;ii<2;ii++)
				  	        {	
					  	        btn=document.createElement("span");
					  	        btnlabel=document.createElement("p");

					  	        W1=(90-ii*25)*WINDOW.WPercent;
					  	        X=canvas.height-((ii? -1*(90-ii*15) : 0)+160)*WINDOW.HPercent;
					  	        Y=canvas.width-((ii? -1*(90-ii*15) : 0)+250)*WINDOW.WPercent;
					  	        W2=30*WINDOW.WPercent;
					  	        W=W1+2*W2;
					  	        Angle=32;
					  	        
					  	        with(btn)
					  	        {
					  	        	with(style)
					  	       		{
					  	        				  	        		
					  	        	position="absolute";
					  	        	top=X+"px";
					  	        	left=Y+"px";
					  	        	borderTop= W1+"px solid"+ (ii?"#8DE040":"#8D8EDC") ; 
					  	        	borderLeft= W2+"px solid transparent";
					  	        	borderRight= W2+"px solid transparent";
					  	        	height= "0px"; 
					  	        	width= W1+"px";
					  	        	transform="rotate(-"+Angle+"deg)";
					  	        	background="transparent";

					  	        
					  	        	}
					  	        				  	        	
					  	        
					  	        }
								btn.onclick=(ii?
												function()
									  	        {
									  	        //going to the Play Menu	
										  	        Intf.Change=true;
										  	        Intf.Controls.CurrentPanel=2;
									  	    	}:
									  	    	function()
									  	    	{
									  	    	//going to the Information Menu	
	  											    Intf.Change=true;
										  	        Intf.Controls.CurrentPanel=1;	
									  	    	}
					  	        			);
					  	        
					  	        with(btnlabel)
					  	        {
					  	        	with(style)
					  	        	{
					  	        				  	        		
					  	        	position="absolute";
					  	        	top=X+"px";
					  	        	left=Y+"px";
					  	        	width=W+"px";
					  	        	transform="rotate(-"+Angle+"deg)";
					  	        	fontWeight="bold";
					  	        	fontSize=(ii? 15:30)*WINDOW.WPercent+"px";

					  	        	textAlign="center";
					  	        	color="white"; 
					  	        
					  	        	}
					  	        	innerHTML="";
					  	        	}
					  	        	this.Controls.Labels.push(btnlabel);
					  	        
					  	        	panel.appendChild(btn);
					  	        	panel.appendChild(btnlabel);
				  	        }
							//botones en español e ingles
							W=50*WINDOW.WPercent;
							H=50*WINDOW.HPercent;
				  	        for(var ii=0;ii<2;ii++)
				  	        {	
							  	        
							  	        Btn=document.createElement("input");

							  	        with(Btn)
							  	        {
							  	        	with(style)
							  	        	{
							  	        		position="absolute";
							  	        		width=W+"px";
							  	        		height=H+"px";
							  	        		top="10px";
							  	        		left=(W*ii+10)+"px";
							  	        	}
							  	        	type="image";
							  	        	src="textures/spr"+(3+ii)+".png";
							  	        }
							  	        Btn.Language=ii;
							  	        Btn.onclick=function()
							 	        			   {

							 	        			   	Texto.idioma=this.Language;
							 	        			   	
										  	           };

					           panel.appendChild(Btn);
							}
							

				  	        son.appendChild(panel);	  	        

				  	        this.Controls.Panels.push(panel);
		  	        	break;
		  	        	case 2://Menu juego
							
							//Nombre del Juego
							panel.style.color="white";
				 			gameLabel=document.createElement("span");
				 			with(gameLabel)
				 			{
				 				innerHTML="Cara o Sello";
				 			}
				 			gameLabel.TextChanging= function()
				 								{
				 									this.innerHTML=Games.index[0].Name[Texto.idioma]+"<br/>"+Games.index[0].Instructions[Texto.idioma];
				 								};
							this.Controls.Labels.push(gameLabel);				 								
				 			panel.appendChild(gameLabel);
					 			//Boton para entrar al mismo
					 			Btn=document.createElement("button");
						 		with(Btn)	
						 		{
						 			with(style)
						 			{
						 				
						 				W=150*WINDOW.WPercent;
						 				H=70*WINDOW.WPercent;
						 				width=W+"px";
						 				height=H+"px";
						 				position="absolute";
						 				left=((canvas.width-W)/2)+"px";
						 				top=(canvas.height-H-10*WINDOW.WPercent)+"px";

						 				border="none";
						 				borderRadius="0%";
						 				background="#A566E5";
						 				fontSize=FONTSIZE;
						 				color="white";
						 			}
						 			innerHTML="Play";
						 		}

						 		Btn.onclick=function()
						 					{
												//Intf.Change=true;
					  	        				//Intf.Controls.CurrentPanel=2;
					  	        			    moneda.model.material.diffuseTexture=new BABYLON.Texture("textures/"+document.getElementById("Mapa").innerHTML+".png",Escenario);  
					  	        				//moneda.model.material.diffuseTexture.name=moneda.model.material.diffuseTexture.url="textures/textura.png";
					  	        				Room.index=1;

						 					};
						 		this.Controls.Labels.push(Btn);
						 		//panel.style.background="red";
						 		panel.appendChild(Btn);
				 			CreateBtnBack(panel);
				 			//Slide de palabras
				 			//monedas
				 			
				 			SelectLabel= document.createElement("div");
				 			with(SelectLabel)
				 			{
				 				with(style)
				 				{
				 					
				 					position="absolute";
				 					top="70%";
				 					left="0%";
				 					color="white";

				 				}
				 			}

				 			//elementos del select
				 				labels=Array(" ","cent"," ");
				 				SLabel=document.createElement("p");
				 				SLabel.id="Mapa";
				 				SLabel.iterator=0;
					 			for(var ii=0;ii<3;ii++)
					 			{	


					 				SO=  (ii==1? SLabel:document.createElement("div"));
					 				with(SO)
					 					{
					 							W=40*WINDOW.WPercent;
					 						with(style)	
					 						{
					 							display="inline-block";
					 							if(ii!=1)
					 							{
					 							 border="none";
					 							 background="transparent";
					 							 borderBottom= borderTop= "15px solid transparent";
					 							 if(ii)
						  	        			 	borderLeft = W+"px solid red";
						  	        			 else
						  	        			 	borderRight = W+"px solid red";
					 							}
					 						}
					 						innerHTML=labels[ii];	
					 					}
					 				

					 				switch(ii)
					 				{
					 					case 0://atrás
											SO.onclick=function ()
					 									{
					 										SLabelx=document.getElementById("Mapa");
					 										SLabelx.iterator--;
															SLabelx.iterator=(SLabelx.iterator<0? Games.index[Games.currentGame].Maps.length-1: SLabelx.iterator);
															SLabelx.innerHTML=Games.index[Games.currentGame].Maps[SLabelx.iterator];
					 									};
					 					break;
					 					case 2://adelante
					 						SO.onclick=function ()
					 									{
					 										SLabelx=document.getElementById("Mapa");
					 										SLabelx.iterator++;
					 										SLabelx.iterator=(SLabelx.iterator>Games.index[Games.currentGame].Maps.length-1? 0: SLabelx.iterator);
															SLabelx.innerHTML=Games.index[Games.currentGame].Maps[SLabelx.iterator];
					 									};
					 					break;

					 				}

									SelectLabel.appendChild(SO);
					 			}		

				 			panel.appendChild(SelectLabel);
							
							son.appendChild(panel);	
				 			this.Controls.Panels.push(panel);
		  	        	break;
		  	        	case 3://Menu information
		  	        		panel.style.color="white";
		  	        		infoLabel=document.createElement("span");
				 			with(infoLabel)
				 			{
				 				innerHTML="Information";
				 			}
				 			this.Controls.Labels.push(infoLabel);
				 			panel.appendChild(infoLabel);
							
				 			infoText=document.createElement("p");
				 			infoText.TextChanging=function()
				 								{
				 									switch(Texto.idioma)
				 									{
				 										case 0:
				 										//this.innerHTML="Desarrollador: Carlos Chavez Laguna. <br/>Randomizing son un conjunto de aplicaciones que te ayudarán a crear decisiones aleatorias.Úsalas para diferentes actividades.";
				 										this.innerHTML="Desarrollador: Carlos Chavez Laguna. <br/>Randomizing es una aplicación que te ayudará a crear decisiones aleatorias.Úsalas para diferentes actividades.";
				 										break;
				 										case 1:
				 										//this.innerHTML="Developer: Carlos Chavez Laguna. <br/>Randomizing are a group of applications that allows you to randomize all your decisions.Use it in the activities you want.";
				 										this.innerHTML="Developer: Carlos Chavez Laguna. <br/>Randomizing is an application that allows you to randomize all your decisions.Use it in the activities you want.";
				 										break;
				 									}
				 								};			
				 			this.Controls.Labels.push(infoText);
				 			panel.appendChild(infoText);
				 			//Botón Back
				 			CreateBtnBack(panel);
		  	        		son.appendChild(panel);
		  	        		

		  	        		this.Controls.Panels.push(panel);
		  	        	break;
		  	        }
	  	    	}
	  	        
	  	        this.Controls.Conf=son;
	  	        dad.appendChild(son);
	  	        
	  	        

	  	    },
	  	    "Change":false,
	  	    "ChangeMenu": function()
				  	    {

							To=arguments[0];
							//alert(this.Controls.Panels[To].X);
							//alert(this.Controls.Panels[To].Orientation==this.Controls.Panels[To].PreviousOrientation);
				  	    	for(var i=0;i<this.Controls.Panels.length;i++)
				  	    	{
				  	    			LEFT=canvas.width/10;
				  	    			UP=canvas.height/10;

				  	    		if(this.Controls.Panels[To].Orientation==this.Controls.Panels[To].PreviousOrientation && this.Controls.Panels[To].X)	
				  	    			{	
					  	    			X=this.Controls.Panels[i].X=(this.Controls.Panels[To].X>0? this.Controls.Panels[i].X-LEFT:this.Controls.Panels[i].X+LEFT);
						  	    		Y=this.Controls.Panels[i].Y=(this.Controls.Panels[To].Y>0? this.Controls.Panels[i].Y-UP:this.Controls.Panels[i].Y+UP);
						  	    		this.Controls.Panels[i].style.left=X+"px";
						  	    		this.Controls.Panels[i].style.top=Y+"px";
										if(i==To)  	    		
										this.Controls.Panels[i].Orientation=X>0;//true: abajo, false:arriba
					  	    		}
					  	    	else
					  	    		{
					  	    			this.Change=false;
										X=this.Controls.Panels[To].X=0;
						  	    		Y=this.Controls.Panels[To].Y=0;
						  	    		this.Controls.Panels[To].style.left=X+"px";
						  	    		this.Controls.Panels[To].style.top=Y+"px";
						  	    		for(var ii=0;ii<this.Controls.Panels.length;ii++)		  	    			
					  	    				{
					  	    					this.Controls.Panels[ii].PreviousOrientation=this.Controls.Panels[ii].Orientation=this.Controls.Panels[ii].X>0;
					  	    					if(ii!=To)
					  	    					{
					  	    						Pos=ii-To;
					  	    						X=this.Controls.Panels[ii].X=Pos*canvas.width;
						  	    					Y=this.Controls.Panels[ii].Y=Pos*canvas.height;	
						  	    					this.Controls.Panels[ii].style.left=X+"px";
						  	    					this.Controls.Panels[ii].style.top=Y+"px";

					  	    					}
					  	    					
					  	    				}
					  	    		
					  	    		}
				  	    		

				  	    	}
				  	    },
			"output": function()
						{
							if(this.Change)
								this.ChangeMenu(this.Controls.CurrentPanel);
							//cambio de labels
							var k=0;
							for(var i=0;i<this.Controls.Labels.length;i++)
								try
								{
									this.Controls.Labels[i].TextChanging();
								}
								catch(err)
								{
									
									this.Controls.Labels[i].innerHTML=Texto.getLabel((k>1? (i==3? 0:(i==5?1:2)) :k));
									k++;
								}

						}

	  };
Games={
	   "index": Array(),
	   "currentGame": 0, 
	   "init": function()
	   	        {
	   	        	
	   	          //añadir la moneda		
	   	          this.index.push(moneda); 
	   	          //Init de la moneda		
	   	          this.index[0].init();

	   	        },
	   "input": function()
	   	        {
	   	          this.index[0].input(); 	
	   	        },
	   "output":function()
	   		    {
	   		      this.index[0].output();
	   		    }	        	

	  };