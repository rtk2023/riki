$(document).ready(function() 
{
    $(document).ready(function() 
    {
        $('#myForm').submit(function(e) 
        {
            e.preventDefault();
            var textValue = $('#text').val();
            var textareaValue = $('#textarea').val();
            var selectValue = $('#select').val();

            var outputText = "Текстовое поле: " + textValue + "<br>" +
                            "Большое текстовое поле: " + textareaValue + "<br>" +
                            "Выпадающий список: " + selectValue;

            $('#output').html(outputText);
            $('#myModal').modal('show');
        });
    });
});