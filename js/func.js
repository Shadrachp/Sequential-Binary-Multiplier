$(document).ready(()=>{
    var currA = [],
        currQ = [],
        A, Q, M, C = '0';
   $("#btnSubmit").click((e)=>{
      e.preventDefault();      
       //TODO: should also clear output field
       if(isBinary($("#txt_inputQ").val()) != null && isBinary($("#txt_inputM").val()) != null && isCountValid()){
           clearOutput();
            Q = $("#txt_inputQ").val();
            M = $("#txt_inputM").val();
            currQ = splitString(Q);
            initA();
            $("#output").append(createElement(A, M, Q));
       }else{
           clearOutput();
           $("#output").append(createErrElement());
           //add some message that input is invalid
       }
   });
    
    //TODO: Create Next Button for .html file
     //executes 1 cycle.
    $("#btnNext").click((e)=>{
        if(getLSB(currQ) == '0' && C == '1'){
//            AddBin(A, M); //not yet working
            shiftRight(A, Q, currA, currQ); //This will work after creating Shifting algorithm
        }else if(getLSB(currQ) == '1' && C == '0'){
//            SubtractBin(A, M); //after creating AddBin algo, this will work
            shiftRight(A, Q, currA, currQ); //This will work after creating Shifting algorithm
        }else shiftRight(A, Q, currA, currQ);
        $("#output").append(createElement(A, M, Q));
    });
    
    //TODO: Create Clear button for .html file use the id below
    $("#btnClear").click((e)=>{
       //should clear the output field 
        clearOutput();
    });
    
    function isCountValid(){
        return $("#txt_inputM").val().length <= 16 &&
            $("#txt_inputQ").val().length <= 16;
    }

    function clearOutput(){
        $("#output").empty();
    }
    
    function AddBin(A, M){
        //TODO
        //AplusM algo
        //Return result
    }
        
    function SubtractBin(A, M){
        var twos = arrToString(toTwosComplement(M));
        return APlusM(A, twos);
    }
        
    /*
    * @param input {String} - binary input either Q and Q-1 the extra or carry [bit]
    * Returns the least significant bit of the binary input
    */
    function getLSB(input){
        return input[input.length - 1];
    }
    
    /**
    *Initializes A variable
    */ 
    function initA(){
        A = '';
        for(var i = 0; i < Q.length; i++) A += '0';
        currA = splitString(A);
    }
    
     
    
    /**
    * Creates the element for displaying data
    * Used by the Next button
    */
    function createElement(A, M, Q){
        return "<p>M:" +M+" A:"  + A  +"&nbspQ:"+Q+
        "</p>";
    }
    
    /*
    * Creates error input element
    */
    function createErrElement(){
        return "<p>Invalid input detected!</p><br/>";
    }
        
    /**
    * Checks if the input is binary
    * @param input {String} - input of user either Q or M
    * returns null if input is not binary.
    */
    function isBinary(input){
        return input.match(/^[0-1]+$/);
    }
       
    /**
    * Two's complement of binary input
    * @param input {String} - A binary input
    * returns the two's complement of the parameter
    */
    function toTwosComplement(input){
        var twos = splitString(input),
            flag = false;
        for(var i = twos.length - 1; i >= 0; i--){
            if(flag)
                twos[i] == '1' ? twos[i] = '0'
                : twos[i] = '1';
            if(twos[i] == '1' && !flag)
                flag = !flag;
        }
        return twos;
    }
       
    /**
    * Converts an array of String/characters to string
    * @param arr {String[]} - array to be converted
    * Used variable/s:
    * str {String} - string to be returned
    * returns a string
    */
    function arrToString(arr){
        var str = "";
        for(var i = 0; i < arr.length; i++)
            str += arr[i];
        return str;
    }
       
     /**
    * shifts each character to the right
    * @param currA {String} - 
    * @param currQ {String} - 
    */
    function shiftRight(curra, currq){
        initCurrentVar(A, Q, curra, currq);
        shiftingAlgorithm(currA, currQ);
        A = arrToString(currA);
        Q = arrToString(currQ);
    }
    
    /**
    * Algorithm for shifting contents of two char[] var to the right
    * @param currA {char[]} (Passed by reference)- Array of characters whose contents will be shifted to index + 1
    * Global var currQ {char[]}  (Passed by reference)- Array of characters whose contents will be shifted to index + 1
    * tempQ {char[]] - a copy of currQ
    * tempA {charp[]} - a copy of currA
    * carry {char} - the carry bit or whatever you call it
    */
    function shiftingAlgorithm(curra, currq){
        // TODO: recreate to a more efficient code if possible
        var lsb = getLSB(curra);
        curra = shift(curra);
        currq[0] = lsb;
        C = getLSB(currq);
        currq = shift(currq);
        currA = curra;
        currQ = currq;
        A = arrToString(currA);
        Q = arrToString(currQ);
    }
    
    /*
    * Part of the shiftingAlgorithm() function
    * @param curr {String[]} - input to be shifted
    * returns the shifted input
    */
    function shift(curr){
        for(var i = 1; i < curr.length; i++){
            curr[i] = curr[i-1];
            console.log(curr);
        }
        console.log(curr);
        return curr;
    }
    
    /**
    * Initializes the curr variables
    * @param A {String} - data to be stored to currA var
    * @param Q {String} - data to be stored to currQ var
    */
    function initCurrentVar(A, Q, currA, currQ){
        currA = splitString(A);
        currQ = splitString(Q);
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