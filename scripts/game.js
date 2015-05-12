 var canvas = document.getElementById("game");
 //var View2D= canvas.getContext("2d");
        var engine = new BABYLON.Engine(canvas, true);

        // You have to create a function called createScene. This function must return a BABYLON.Scene object
        // You can reference the following variables: scene, canvas
        // You must at least define a camera
        
        //Al momento de cargar el escenario
        //crear el escenario
            Room.output = new BABYLON.Scene(engine);
        //cargar componentes
        window.onload= function (evt)
                {
                //iniciando al mouse
                Mouse=evt;
        	    // Escenario 
                Escenario = Room.output;

                WINDOW.init();
                Room.init();
                Texto.init();
                //Background 
                var Back= BABYLON.Mesh.CreatePlane("Fondo",1,Escenario);
                Back.material= new BABYLON.StandardMaterial("MaterialBack",Escenario);
                Back.material.emissiveTexture= new BABYLON.Texture("textures/textura2.png",Escenario);  
                Back.material.backFaceCulling=false;
                Back.scaling.y=canvas.width/10;
                Back.scaling.x=canvas.height/10;
                Back.position.z=0;
                Back.rotation.x=Math.PI/2;                
                //Init de los modelos del juego
                Games.init();
                //Init del interfaz del menu del juego
                Intf.init();
                // Agregamos un render del escenario
                engine.runRenderLoop(function () 
                                    {

                                        switch(Room.index)
                                        {
                                        case 0:      
                                        //2d interface    
                                        Intf.Controls.Conf.style.display="initial";
                                        break;
                                        case 1:
                                        //3d interface
                                        Intf.Controls.Conf.style.display="none";
                                        Room.output.render();
                                        break;
                                        }  
                                    });
        	
        };
        //INPUT

        function INPUT(evt)
                {
                    Mouse=evt;
                    switch(Room.index)
                    {
                    case 0:      
                    //2d interface    
                    break;
                    case 1:
                    //3d interface
                    Games.input();
                    break;
                    }  
                };
        document.addEventListener("touchstart",INPUT);
        document.onclick=INPUT;
        //OUPUT
        setInterval(function()
                    { 
                        switch(Room.index)
                        {
                            case 0:
                            Intf.output();
                            break;
                            case 1:
                            Games.output();
                            break;   
                        }

                     
                    } 
                    ,50   
                    );

        // responsive
        window.addEventListener("resize", function () {
            engine.resize();
        });