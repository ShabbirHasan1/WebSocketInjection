# WebSocketInjection

CODED FOR FUN ;) 

## Description
Inject a websocket. Modify is message when is sending something or modify the websocket object. You can also use it to get any websocket information like url. Use example: agario bot.

## How to use ?
Inject and get information
```js
window.injectWebSocket("Function to inject":Function, "Repeat the injection in loop":Boolean);
```
```js
(async () => {
    try{
        //By default loop the injection function is false
        const reponse = await window.injectWebSocket(function(msg,obj){
            //You can here modify the message (msg) and the webscoket object (obj)
            //you need to return as I put after the obj and the msg
            if(msg.score) msg.score = Number.MAX_SAFE_INTEGER;
            return [msg, obj];
        }, false);
        console.log(response);
    } catch(e) {
        console.error(e);
    }
})
```
Only get information
```js
(async () => {
    try{
        //Will make in the console but not a problem, it's to prevent that you didn't put any function to inject
        const reponse = await window.injectWebSocket(); 
        console.log(response);
    } catch(e) {
        console.error(e);
    }
})
```

## Reponse
```json
{
    "error": "Boolean",
    "sucess": "Boolean", 
    "websocket": "WebSocket", 
    "url": "String", 
    "defaultMessage": "String", 
    "finalMessage": "String", 
    "errorMessage": "String"
}
```