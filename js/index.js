$(document).ready(function(){
    var personArray = [];
    var count = 0;
    var obj = {
        applicant:{},
        family:[]
    };
    $.get("data/applicants.json", function(result){
        var body = $(".buildertable").find('tbody');
        var row = $('<tr>');
        var count = 0;
        $.each(result, function(i, field){
            var row = $('<tr>');
            var applicant = result[i].applicant;
            var family = result[i].family;
           
            Object.keys(applicant).forEach( (function(key) {

                var column = $('<td>');
                column.append(applicant[key]);
                row.append(column);
               
            }));
            row.append('<td><span class="view_' + count + '">View Family Members</span></td>');
            body.append(row); 

            var body1 = $(".members").find('tbody');
           
            $('.view_' + count).click(
            (function (a) {
              
                return function () {
                    var div = $("tr").removeClass('color');
                    var div = $(this).parent("td").parent("tr").addClass('color');
                  
                    $(".members").show();
                    $(".members tbody tr").remove();  
                    for(var i=0;i<family.length;i++) {
                        var row1 = $('<tr>');
                        for(var j=0;j<family[i].length;j++) {
                            var column1 = $('<td>');
                            column1.append(family[i][j]);
                            row1.append(column1);
                        }
                        body1.append(row1); 

                    }
                };
            }(count)));
            count +=1;
           
        });
    });

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
            var row = $('<tr>');
            for(var i=0;i< addNewFamily.length;i++){
                var column = $('<td>'); 
                column.append(addNewFamily[i]);
                row.append(column);
            }
            row.append('<td><span class="close_' + count + '">X</span></td>');
            body.append(row);
        }else {
            $('#msg').html(addNewFamily);
            $('.alert').show();
        }
        $('#fullname1, #age1, #rel').val('');
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
});





      



