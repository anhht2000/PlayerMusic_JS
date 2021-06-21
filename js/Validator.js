// function Validator(options){
//     var rulesSelections = {}
//     var formElement = document.querySelector(options.form);
//     if(formElement){
//         //su kien nut submit
//         formElement.onsubmit = function(e){
//             e.preventDefault();

//             var isFormValid = true;

//             options.rules.forEach(function (item) {
//                 var inputElement = formElement.querySelector(item.selector);
//                 var spanE = inputElement.offsetParent.querySelector(options.message)
//                 var erorMessage;
//                 var rules = rulesSelections[item.selector]

//                 for(var i=0 ; i< rules.length;++i){
//                     erorMessage = rules[i](inputElement.value)
//                     if(erorMessage) break
//                 }

//                 if(erorMessage){
//                     spanE.innerText = erorMessage
//                     inputElement.offsetParent.classList.add('invalid')
//                 }
//                 else{
//                     spanE.innerText = ''
//                     inputElement.offsetParent.classList.remove('invalid')
//                 }
//                 var isValid = !erorMessage
//                 if(!isValid){
//                     isFormValid=false;
//                 }
//             });
            
//             // var enableInput = formElement.querySelectorAll('[name]:not([disable])')
//             // console.log(enableInput)
//             if(isFormValid){
//                 if(typeof (options.onSubmit) === 'function'){
//                     var enableInput = formElement.querySelectorAll('[name]:not([disable])')
//                     var formValues = Array.from(enableInput).reduce(function(value,item){
//                         return (value[item.name] = item.value) && value
//                     },{})
                    
//                     options.onSubmit(formValues)
//                 }
//                 else{
//                     formValues.submit();
//                 }
//             }
//             else{
//                 console.log('co loi')
//             }
//         }
// //chinh
//         //lap va luu        
//         options.rules.forEach(function (item) {
//             //luu rules
//             if(Array.isArray(rulesSelections[item.selector])){
//                 rulesSelections[item.selector].push(item.test)
//             }
//             else{
//                 rulesSelections[item.selector]=[item.test]
//             }
 

//             var inputElement = formElement.querySelector(item.selector);
//             var spanE = inputElement.offsetParent.querySelector(options.message)
//             //event blur
//             inputElement.onblur = function(e){
//                 var erorMessage;
//                 var rules = rulesSelections[item.selector]
//                 //cho vao vong lap neu ham return về lỗi thì break ngay in ra lỗi
//                 //nếu không lỗi thì chạy tiếp vòng lặp foreach
//                 for(var i=0 ; i< rules.length;++i){
//                     erorMessage = rules[i](e.target.value)
//                     if(erorMessage) break
//                 }

//                 if(erorMessage){
//                     spanE.innerText = erorMessage
//                     inputElement.offsetParent.classList.add('invalid')
//                 }
//                 else{
//                     spanE.innerText = ''
//                     inputElement.offsetParent.classList.remove('invalid')
//                 }
//             } 
//             //event input
//             inputElement.oninput = function(){
//                 spanE.innerText = ''
//                 inputElement.offsetParent.classList.remove('invalid')
//             }
//         });
//     }
// }
// Validator.isRequired = function(selector,mess){
//     return {
//         selector: selector,
//         test: function(value){
//             return value.trim()?undefined:mess
//         }
//     }
// }
// Validator.isEmail = function(selector,mess){
//     return {
//         selector: selector,
//         test: function(value){
//             var regex = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
//             return regex.test(value)?undefined:mess
//         }
//     }
// }
// Validator.isMin = function(selector,min,mess){
//     return {
//         selector: selector,
//         test: function(value){
//             return value.trim().length>min?undefined:mess
//         }
//     }
// }
// Validator.isConfirmed = function(selector,cb,mess){
//     return {
//         selector: selector,
//         test: function(value){
//             return value === cb()?undefined:mess
//         }
//     }
// }

// var promise1 = new Promise(function(resolve){
//     setTimeout(function(){
//         resolve([1,2])
//     },1000)
// })
// var promise2 = new Promise(function(resolve){
//     setTimeout(function(){
//         resolve([3,4])
//     },2000)
// })
// var promise3 = 1
// var selectResult = [promise1,promise2,promise3]
// console.log(selectResult)
// promise2
//     .then(function(data){
//         console.log(data)
//     })

// Promise.all([promise1,promise2,promise3])
//     .then(function(data){
//         console.log(data)
//         // var data1 = data[0]
//         // var data2 = data[1]
//         // console.log(data1.concat(data2))
//     })

var tao = [
    {
        name : 'tao',
        age: 19
    },
    {
        name : 'ok',
        age: 90
    },
]
console.log(tao.filter(function(e){
    return e.age === 90
}))