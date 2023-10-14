console.log('asd');
$('#randomButton').on('click', function()
{
    var randNum = Math.floor(Math.random() * 100);;
    $('.randomNumber').text(randNum);
});
