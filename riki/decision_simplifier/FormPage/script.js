$(document).ready(function() 
{
    const step1 = $("#step1");
    const step2 = $("#step2");
    const step3 = $("#step3");

    step1.show();
    step2.hide();
    step3.hide();

    $("#nextStep").click(function() 
    {
        step1.hide();
        step2.show();
    });

    // Обработка отправки формы на первом этапе
    $('#step1Form').submit(function(e) 
    {
        e.preventDefault();
        step1.hide();
        step2.show();
    });

    // Обработка отправки формы на втором этапе
    $('#step2Form').submit(function(e) 
    {
        e.preventDefault();
        step2.hide();
        step3.show();
    });

    const variants = $("#variants");
    let variantCount = 1;

    $("#addVariant").click(function() 
    {
        variants.append(`
            <div class="variant">
                <label for="variant${variantCount}">Variants:</label>
                <input type="text" name="variant${variantCount}" required>
                <button class="removeVariant">Noņemt</button>
            </div>
        `);
        variantCount++;
    });

    variants.on("click", ".removeVariant", function() 
    {
        $(this).parent().remove();
    });
});