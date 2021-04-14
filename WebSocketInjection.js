window.injectWebSocket = function(fn, loop = false){
    function fnDefault(...args){
      return args;
    }
    const fnSetup = (fn && fn.constructor === Function) ? fn : fnDefault;
  
    if(fnSetup == fnDefault) console.warn("Invalide injection function (remplaced by default injection function - do not change anything) !");
  
    return new Promise((resolve,reject) => {
      const protoWebSocket = WebSocket.prototype.send;

      WebSocket.prototype.send = function(msg){
        const response = {error: false, sucess: false, websocket: this, url: this.url, defaultMessage: msg, finalMessage: null, errorMessage: null};
  
        function verifyWebSocketObj(obj){
          if(!obj && obj.constructor !== WebSocket) throw "Invalide WebScoket object returned in send method !";
        }
       
        try{
          verifyWebSocketObj(this);
          let obj = this;
          [msg, obj] = fnSetup(msg, obj);
          verifyWebSocketObj(obj);

          response['finalMessage'] = msg;
         
          protoWebSocket.apply(obj, [msg]);
          if(!loop) WebSocket.prototype.send = protoWebSocket;
         
          console.info("WebScoket injection sucess !");
          response['sucess'] = true;
          resolve(response);
        } catch(e) {
          WebSocket.prototype.send = protoWebSocket;
          console.warn("WebSocket injection failed !");
  
          console.warn("Error message : " + e);
          response['errorMessage'] = e;
          response['error'] = true;
          reject(response);
        }
      }
    });
  }
