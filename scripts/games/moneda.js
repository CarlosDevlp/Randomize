/*
Programa de moneda para la interaccion con la misma

*/
moneda={
        "Name": Array("Cara o Sello","Coin Toss"),
        "Instructions": Array("Con solo tocar la pantalla para que la moneda salte, descubrirás el lado de la moneda seleccionado","Just touch the screen to let the coin jump, once it is back in the floor you will discover the side of the coin selected."),
        "Maps": Array("cent","sol","yen"),
        "Rules": {
                    "Label":null,//texto que estará en la parte inferior
                    "Jumping":false,
                    "Gravity":2,
                    "Y2":0,
                    "Y1":0,
                    "Speed":10,
                    "Time":0,
                    "Result":0,    
                    "Jump":function() //salto de la moneda
                     {
                        if(!this.Jumping)
                        {    
                            this.Time=0;
                            this.Y1=moneda.model.position.y;
                            //arreglar rotación cuando ya haya caído

                            if(this.Angle<180)
                                {
                                    this.Angle=0;                                
                                    
                                }    
                            else
                                {
                                    this.Angle=180;
                                    
                                }

                                
                        }   
                        else
                        {

                            //posicion Y (movimiento vertical)
                            if(!this.Time)
                                this.Angle=0;
                            this.Time++;
                            this.Y2=this.Y1+this.Time*(this.Speed-(this.Gravity*this.Time/2)); 
                            //rotacion sobre su mismo eje
                            //this.Angle=(this.Angle>360? 0:this.Angle+35);
                            this.Angle=(this.Angle>360? 0:this.Angle+(this.Result?20:15));
                            if(this.Y2<=this.Y1)
                                {
                                    this.Jumping=false;
                                    moneda.model.position.y=this.Y1;
                                    //cara o sello
                                    this.Result=ccl.Random.Next(0,2);
                                }
                            else
                                moneda.model.position.y=this.Y2;
                            
                                
                        }  
                        //Luz
                        //posición de mi moneda = posición de la luz
                        Room.light.position.y=moneda.model.position.y+15;
                     },
                     "Angle":0,
                     "Rotation":function()//rotacion de la moneda al saltar   
                     {
                     
                        
                        moneda.model.rotation.x=Math.PI*this.Angle/180;

                     }
                 },   
	    "init":function()
	    	   {

    	    	   	this.model=undefined;
    	    	   	//(name, height, diameter, tessellation, scene, updatable)
                    //BABYLON.Mesh.CreateCylinder("Moneda", 2, 10, 10, 10,10, Room.output);
    	    	   	BABYLON.SceneLoader.ImportMesh("", "./", "moneda.babylon", Room.output, function (newMeshes, particleSystems) 
                        {
                                     moneda.model = newMeshes[0];
                                     moneda.model.position = new BABYLON.Vector3(0,0,0);
                                     with(moneda.model)
                                    {
                                        name="Moneda";                     
                                        position.y=3;
                                    }
                        });
                                 
                    dad=document.getElementsByTagName("body");
                    
                    dad=dad[0];

                    son=document.createElement("span");
                    with(son)
                    {

                        with(style)
                        {

                            background="black";
                            opacity="0.7";

                            position="absolute";
                            
                            fontFamily="helvetica,arial,verdana";
                            fontSize="50px";
                            color="white";

                            width="100%";
                            textAlign="center";
                            top=(canvas.height-51)+"px";
                        }
                        
                        innerHTML="Cara";

                    }
                    this.Rules.Label=son;
                    dad.appendChild(son);
	    	   },
        "input": function()
                 {
                    // check if we are under a mesh
                    /*
                    var pickInfo = Room.output.pick(Room.output.pointerX, Room.output.pointerY, function (mesh) { return mesh; });

                            if (pickInfo.hit) 
                            {
                                currentMesh = pickInfo.pickedMesh;
                                if(currentMesh.name=="Moneda")
                                    this.Rules.Jumping=true;
                            }*/

                                       this.Rules.Jumping=true;
                   
                 },
        "output": function()          
                {   
                    //ejecución de acciones
                    this.Rules.Jump();
                    this.Rules.Rotation();
                        
                        COS=(Texto.idioma? Array("Tails","Heads") : Array("Sello","Cara"));//cara o sello string
                        this.Rules.Label.innerHTML=(this.Rules.Angle<180? COS[0]:COS[1]);
                    //label del contenido
                    //Texto.output(0,50,50,"SALIDA");
                }  

	   };