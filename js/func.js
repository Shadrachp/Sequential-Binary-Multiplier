$(document).ready(()=>{
    var currA = [],
        currQ = [];
   $("#btnSubmit").click((e)=>{
      e.preventDefault();
       
      var output = "<p>"+ " M:" + $("#txt_inputM").val() +" Q:"  + $("#txt_inputQ").val()  +"&nbspA:#### </p>";
       
       
       
       if(isBinary($("#txt_inputQ").val()) != null && isBinary($("#txt_inputM").val()) != null)
           $("#output").append(output);
   });
    
    
    /**
    * Checks if the input is binary
    * @param input {String} - input of user either Q or M
    * returns null if input is not binary.
    */
    function isBinary(input){
        return input.match(/^[0-1]+$/);
    }
    
     /**
    * shifts each character to the right
    * @param A {String} - 
    * @param Q {String} - 
    */
    function shiftRight(A, Q){
        initCurrentVar(A, Q);
        shiftingAlgorithm();
        A = currA.slice();
        Q = currQ.slice();
    }
    
    /**
    * Algorithm for shifting contents of two char[] var to the right
    * Used variables:
    * Global var currA {char[]}- Array of characters whose contents will be shifted to index + 1
    * Global var currQ {char[]}- Array of characters whose contents will be shifted to index + 1
    * tempQ {char[]] - a copy of currQ
    * tempA {charp[]} - a copy of currA
    * carry {char} - the carry bit or whatever you call it
    */
    function shiftingAlgorithm(){
        // TODO: Make this more efficient later
//        const tempQ = currQ.slice();
//        const tempA = currA.slice();\
        //incomplete loop
//        for(var i = 0; i < tempA.length - 1; i++){
//            currA[i + 1] = tempA[i];
//            
//        }
    }
    
    /**
    * Initializes the curr variables
    * @param A {String} - data to be stored to currA var
    * @param Q {String} - data to be stored to currQ var
    */
    function initCurrentVar(A, Q){
        currA = splitString(A);
        currQ = splitString(Q)
    }
    
    /**
    * splits the string into each char passed as parameter
    * @param input {String} - string to be splitted
    * returns an array of characters
    */
    function splitString(input){
        return input.split('');
    }
    
});