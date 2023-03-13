$(document).on('keyup','.search-input', function(value) {
    $(".searchResults").empty();
    var fieldValue = value.currentTarget.value
    if (fieldValue){
        console.log('send req '+window.location.host );
        $.ajax({
            type:'GET',
            url:'/api/search?searchTerm='+fieldValue
        })
        .done(function(res) {
            var outputArray = []
            for (resIdx in res){
                $(".searchResults").append("<a href='"+res[resIdx].url+"'>"+res[resIdx].product_name+"</a>");
              //  $(".searchResults").append(new Option(res[resIdx].product_name, res[resIdx].url));
                outputArray.push(res[resIdx].product_name)
            }
            console.log(outputArray)

        })
        .fail(function(error) {alert('Oops... ' + JSON.stringify(error.responseJSON));})
       
    } else {
        console.log('Blank')
    }
})