$(document).ready(()=>{
   $("#btnSubmit").click((e)=>{
      e.preventDefault();
      $("#output").append("<p>" + $("#txt_inputQ").val()+ "</p>");
   });
});