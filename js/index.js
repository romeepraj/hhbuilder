var personArray = [];
var count = 0;
var obj = {
    applicant:{},
    family:[]
};
$('#mainApplicant').click(function(){
        var age = $('#mainage').val();
        var fullname = $('#fullname').val();
        var smoker = $('#smoker:checked').val()?'Yes':'No'; 
        var newApplicant = new Person(fullname, age, smoker); 
        var addNewApplicant = newApplicant.addPerson();
        if(Array.isArray(addNewApplicant)){
           obj.applicant = newApplicant;
            personArray.push(obj);
            $('.alert').hide();
            $('.builder').show();
            $('.yourdetail').show();
            $('.dname').append( addNewApplicant[0]);
            $('.dage').append( addNewApplicant[1]);
            $('.dsmoker').append( addNewApplicant[2]);
            $('.mainbuilder').hide();
            
        } else {
            $('#msg').html(addNewApplicant);
            $('.alert').show();
        }
        console.log(personArray);
});
$('.add').click(function(){
    var age = $('#age1').val();
    var fullname = $('#fullname1').val();
    var smoker = $('#smoker1:checked').val()?'Yes':'No'; 
    var relation = $('#rel').val();
    var familyMember = new Family(fullname, age, smoker ,relation); 
    var addNewFamily = familyMember.addPerson();
    if(Array.isArray(addNewFamily)){
       
        obj.family.push(addNewFamily);
       
        var body = $(".table").find('tbody');
        // Create a new row element
        var row = $('<tr>');

        
        
        for(var i=0;i< addNewFamily.length;i++){
            // Create a new column element
            var column = $('<td>'); 
            column.append(addNewFamily[i]);
            row.append(column);
         
        }
        row.append('<td><span class="close_' + count + '">X</span></td>');
        
        body.append(row);
       
    }
    $('#fullname1').val('');
    $('#age1').val('');
    $('#rel').val('');
    $('#smoker1').prop('checked', false); 
   
    
 
    $('.close_' + count).click(
        (function (a) {
            return function () {
                obj.family.pop(addNewFamily);
                 var div = $(this).parent("td").parent("tr");
                 div.hide();
               
               
            };
        }(count)));
    
    count +=1;

});
      

function Person(fullname, age, smoker, relation){
    this.age = age;
    this.fullname = fullname;
    this.smoker = smoker;
    this.relation = relation || " ";
    
}
Person.prototype = {
    msg:'',
    checkName:function(){
        if(this.fullname == ''){
            this.msg += "Please fill in your fullname";
            return false;
        }else{
            return true;
        }
        
    },
    checkAge: function(){
        if(this.age == ''){
          this.msg += 'Age is required';  
          return false;        
        }else if(isNaN(this.age)){
             this.msg +="Age should be in number";
            return false;     
        }else {
            
            if(this.age<=0){
                    this.msg +='Age should be greater than 0';
                    return false;
                } 
        }
        return true;
      
    },
    addPerson:function(){
       
        if(this.checkName() && this.checkAge()){
            var value = [this.fullname, this.age, this.smoker, this.relation];
            return value;
        }
        else{
            return this.msg;
        }
        
        
    }
    
}
function Family(fullname, age, smoker, relation){
   
    Person.call(this, fullname, age, smoker);
    this.relation = relation;
}
Family.prototype = new Person();

