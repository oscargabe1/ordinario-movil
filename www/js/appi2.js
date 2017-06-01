$(function() {

	function CargarTODOmenu(){
		return $.ajax({
			url: 'http://ipm.esy.es/public/menu',
			type: 'GET',
			dataType: 'json'
		});
	};


	function menu_categoria(categoria){
		return $.ajax({
			url: 'http://ipm.esy.es/public/menu/'+categoria,
			type: 'GET',
			dataType: 'json'
		});
	};

	function EnviarPEDIDO(pedido){
		return $.ajax({
			url: 'http://ipm.esy.es/public/pedir',
			type:'POST',
			dataType:'json',
			data: pedido

		})
	}







	ViewModel = function(){
		var _self = this;
		var temp=[];
		var id_usuario=3;
		var id_comida=0;
		var id_bebida=0;
		var id_postre=0;

		_self.producto_pedido = ko.observableArray([]);


		
				// CargarTODOmenu().done(function(res){
				// 	if(res.error){
				// 		console.log(res.msg);
				// 		return false;
				// 	}
				// 	//localStorage.setItem("id_comida", res.datos.ID);
				// 	//localStorage.setItem("Categoria", res.datos.Categoria);
				// 	//localStorage.setItem("Categoria", res.datos.ID);
				// 	//NO SE QUE ONDA CON LA DISPONIBILIDAD DEBERIA SER VALIDADO EN EL API
				// 	console.log(res.datos);
				// 	_self.producto_pedido(res.datos);
				// });
		
		_self.enviarPEDIDO= function(){
			var datospedido={
				idu: id_usuario,
				idc: id_comida,
				idb: id_bebida,
				idp: id_postre,
				tt:total
			};

		}

		_self.guardarPEDIDO = function(datos){
			
			if(datos.Categoria=="comida")
				temp[0]=datos;
			if(datos.Categoria=="bebida")
				temp[1]=datos;
			if(datos.Categoria=="postre")
				temp[2]=datos;
			console.log(temp);
		}

		_self.comidita= function(datos){

				menu_categoria("comida").done(function(res){
					_self.producto_pedido(res.datos);


				});
		}

		_self.bebida= function(datos){

				menu_categoria("bebida").done(function(res){
					_self.producto_pedido(res.datos);


				});
		}
		_self.postres= function(datos){

				menu_categoria("postre").done(function(res){
					_self.producto_pedido(res.datos);


				});
		}



	};


	var VM = new ViewModel()
	ko.applyBindings(VM);
});