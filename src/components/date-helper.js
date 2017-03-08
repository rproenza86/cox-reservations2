var today = new Date();
var dd = today.getDate();
//The value returned by getMonth is an integer between 0 and 11, referring 0 to January, 1 to February, and so on.
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 

if(mm<10) 
{
    mm='0'+mm;
}

export function getDateStr(format = 'mm/dd/yyyy'){
    switch (format){
        case 'mm-dd-yyyy':
            return mm+'-'+dd+'-'+yyyy;
        case 'dd-mm-yyyy':
            return dd+'-'+mm+'-'+yyyy;
        case 'dd/mm/yyyy':
            return dd+'/'+mm+'/'+yyyy;
        default:
            return mm+'/'+dd+'/'+yyyy;
    }
}

