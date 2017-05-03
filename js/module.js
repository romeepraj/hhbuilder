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