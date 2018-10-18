$(document).ready(()=>{
    
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
        
    }
    
    
});