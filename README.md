### Thread worker

    Node.js uses two kinds of threads: a main thread handled by event loop and several auxiliary threads 
    in the worker pool.

    Event loop is the mechanism that takes callbacks (functions) and registers them to be executed at 
    some point in the future. It operates in the same thread as the proper JavaScript code. When a 
    JavaScript operation blocks the thread, the event loop is blocked as well.

    Worker pool is an execution model that spawns and handles separate threads, which then synchronously 
    perform the task and return the result to the event loop. The event loop then executes the provided 
    callback with said result.

### Problem

    I have 2 APIs:   

        1. Fibonachhi API: Calculates the 45th term of the fibonachhi series. It takes about 20 seconds 
        on my machine.   
            GET /fibonachhi 

        2. Hello World API: Returns the 'Hello World'.
            GET /
    
           
    If I fire the Fibonachhi API and immediately after that fire the Hello World API, then:   
        Fired Hello World API is blocked until the Fibonachhi API is done calculating the result as it 
        was fired first.   

    Even though it takes about few milliseconds to get result for Hello World API, we have to wait about 
    20 seconds to get the result.

### What this program does

    I have created 3rd API:   
         GET /fibonachhiasync 

    It also calculates the 45th term of the fibonachhi series. But unlike the previous Fibonachhi API, 
    it does not use the main thread to calculate it. It assigns this tasks to one of the thread workers. 
    By doing so, the main thread is not occupied.   

    So, if I fire this new Fibonacchi API and immediately after that fire the Hello World API, then: 
        We get the response for Hello World API immediately even though it was fired later. This is 
        because the main thread is not blocked. We get the Fibonachhi result after 20 seconds just like 
        the first API.