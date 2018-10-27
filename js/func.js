$(document).ready(()=>{
    var currA =[],
        currQ = [],
        currM = [],
        A, Q, M, C, n;
   $("#btnSubmit").click((e)=>{
      e.preventDefault();      
       //TODO: should also clear output field
       if(isBinary($("#txt_inputQ").val()) != null && isBinary($("#txt_inputM").val()) != null && isCountValid()){
           clearOutput();
            C = '0';
            Q = $("#txt_inputQ").val();
            M = $("#txt_inputM").val();     
            n = Q.length;
            currQ = splitString(Q); 
            currM = splitString(M);
            matchBits(currQ.length < currM.length ? currQ
                      : currM,
                        currQ.length < currM.length ? currM.length
                      : currQ.length > currM.length ? currQ.length
                      : 0);
            Q = arrToString(currQ);
            M = arrToString(currM);
            initA();
            $("#output").append(createElement(A, M, Q));
            $("#btnNext").attr("disabled", false);
       }else{
           clearOutput();
           $("#btnNext").attr("disabled", true);
           $("#output").append(createErrElement());
           //add some message that input is invalid
       }
   });
    
    
    //Maybe create a new button later to display all the steps involved per cycle
    //executes 1 cycle.
    $("#btnNext").click((e)=>{
        if(n > 0){
            if(getLSB(currQ) == '0' && C == '1'){
                AddBin(A, M);
                console.log("add");
                shiftRight();
            }else if(getLSB(currQ) == '1' && C == '0'){
                SubtractBin(A, M); 
                console.log("subtract");
                shiftRight();
            }else shiftRight(currA, currQ);
            $("#output").append(createElement(A, M, Q));
            n--;
        }
        if(n <= 0){ 
            $("#btnNext").attr("disabled", true);
        }
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
    
    /**
    * Adds two binary input
    * @param A {String} - addend 1
    * @param M {String} - addend 2
    */
    function AddBin(A1, M){
        //TODO: Recreate to a more efficient code?
        //AplusM algo
        var curra = splitString(A1),
            m = splitString(M),
            sum = '',
            carry = 0;
        
        for(i = m.length - 1; i >= 0; i--){
            if(m[i] == '1' && curra[i] == '1'){
                sum = (carry == '1' ? '1' : '0') + sum;
                carry = '1';
            }else if((m[i] == '0' && curra[i] == '1') || (m[i] == '1' && curra[i] == '0')){
                const a = carry == '1' ? '0' : '1';
                sum = a + sum;
                carry = a == '0' ? '1' : '0';
            }else{
                sum = carry + sum;
                carry = '0';
            }
        }
        
        A = sum;
        currA = splitString(A); 
    }
     
    
    /*
    * Matches the number of bits of the addend
    * by sign extension
    * @param arr {String[]} - the addend to be extended
    * @param count = count-arr.length will be the zeroes the be added
    **/
    function matchBits(arr, count){
        var str = "",
            ext = arr[0];
        
        count = count - arr.length;
        for(var i = 0; i < count; i++)
            str += ext;
        arr = splitString(str + arrToString(arr));
    }
    
    function SubtractBin(A, M){
        var twos = arrToString(toTwosComplement(M));
        AddBin(A, twos);
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
        for(var i = 0; i < M.length; i++) A += '0';
        currA = splitString(A);
    }
    
     
    
    /**
    * Creates the element for displaying data
    * Used by the Next button
    */
    function createElement(A, M, Q){
        return "<p>M:" +M+" A:"  + A  +"&nbspQ:"+Q+
        "&nbspC: "+ C +"</p>";
    }
    
    /*
    * Creates error input element
    */
    function createErrElement(){
        return "<p>Invalid input detected!</p><br/>";
    }
        
    /*
    *
    */
    
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
        console.log(input);
        for(var i = twos.length - 1; i >= 0; i--){
            if(flag)
                twos[i] == '1' ? twos[i] = '0'
                : twos[i] = '1';
            if(twos[i] == '1' && !flag)
                flag = !flag;
        }
        console.log(twos);
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
    function shiftRight(){
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
        const q = shift(curra);
        C = shift(currq);
        currq[0] = q;
    }
    
    /*
    * Part of the shiftingAlgorithm() function
    * @param curr {String[]} - input to be shifted
    * returns the extra bit shifted
    */
    function shift(curr){
        temp = curr.slice();
        lsb = getLSB(curr);
        for(var i = 1; i < temp.length; i++)
            curr[i] = temp[i - 1];
        return lsb;
    }
    
    /**
    * Initializes the curr variables
    * @param A {String} - data to be stored to currA var
    * @param Q {String} - data to be stored to currQ var
    */
    function initCurrentVar(currA, currQ){
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
