$(document).ready(function () {




      $('.btn-main').click(function(){
        $("#container-m").addClass("d-none");
        $("#container-problem").removeClass("d-none");
      });


//--------------------------FORM PAGE--------------------------------------------------------
const step1Form = $("#step1Form");
    const variantsSection = $("<div>").addClass("variants-section");

    $("#continueButton").click(function(e) {
        e.preventDefault();
        step1Form.hide();
        showStep2Form();
    });

    function showStep2Form() {
        const step2Form = $("<form>").attr("id", "step2Form");

        variantsSection.append(`
            <label for="variant1">1. Variants:</label>
            <input type="text" name="variant1" id="variant1" required>

            <label for="variant2">2. Variants:</label>
            <input type="text" name="variant2" id="variant2" required>

            <button id="addVariant">Pievienot vēl</button>
            <button id="continueButton2">Turpināt</button>
        `);

        step2Form.append(variantsSection);
        $("main").append(step2Form);

        let variantCount = 2;

        $("#addVariant").click(function(e) {
            e.preventDefault();
            variantCount++;
            const variantNumber = variantCount;

            const variantLabel = $(`<label for="variant${variantNumber}">${variantNumber}. Variants:</label>`);
            const variantInput = $(`<input type="text" name="variant${variantNumber}" id="variant${variantNumber}" required>`);
            const removeButton = $(`<button class="remove-variant">Izņemt</button>`);

            variantsSection.append(variantLabel, variantInput, removeButton);
            updateRemoveButtons();
        });

        // Удаление варианта при клике на кнопку "Izņemt"
        variantsSection.on('click', '.remove-variant', function(e) {
            e.preventDefault();
            const variantNumber = $(this).siblings('label').attr('for').replace('variant', '');
            $(`#variant${variantNumber}`).remove();
            $(this).siblings('label').remove();
            $(this).remove();
            variantCount--;
            updateRemoveButtons();
        });

        function updateRemoveButtons() {
            if (variantCount <= 2) {
                $(".remove-variant").hide();
            } else {
                $(".remove-variant").show();
            }
        }

        $("#continueButton2").click(function(e) {
          $("#container-problem").addClass("d-none");
          $("#container1").removeClass("d-none");
            // Ваш код для перехода к следующему шагу или выполнения дополнительных действий
        });

        updateRemoveButtons();
    }




//-------------------------------ПЛЮСЫ-------------------------------------------------------------------------------------ПЛЮСЫ




            var maxForms = 5; // Максимальное количество форм
            var formCount1 = 0; // Счетчик форм в контейнере 1
            var formCount2 = 0; // Счетчик форм в контейнере 2

            // Функция для обновления видимости кнопки "Сохранить и переключиться"
            function updateSaveButtonVisibility() {
                if ((formCount1 > 0 || formCount2 > 0) && (formCount1 < maxForms || formCount2 < maxForms)) {
                    $(".save-forms").show();
                } else {
                    $(".save-forms").hide();
                }
            }

            // Функция для добавления новой формы с указанным заголовком в указанный контейнер
            function addNewFormWithHeader(headerText, container) {
                if (container === "#container1" && formCount1 < maxForms) {
                    formCount1++;
                } else if (container === "#container2" && formCount2 < maxForms) {
                    formCount2++;
                } else {
                    alert('Вы достигли максимального лимита форм (5).');
                    return;
                }

                var formHtml = `<div class="form-group"><h3>${headerText}</h3><input type="text" class="form-control" placeholder="Введите текст"><button class="btn btn-danger delete-form">Удалить</button></div>`;
                $(container).find(".forms-container").append(formHtml);
                updateSaveButtonVisibility();
            }

            // Добавление первой формы (в контейнер 1)
            $(".add-form[data-container='container1']").click(function () {
                addNewFormWithHeader("Форма " + (formCount1 + 1) + " (Контейнер 1)", "#container1");
            });

            // Добавление первой формы (в контейнер 2)
            $(".add-form[data-container='container2']").click(function () {
                addNewFormWithHeader("Форма " + (formCount2 + 1) + " (Контейнер 2)", "#container2");
            });

            // Удаление формы
            $(".forms-container").on("click", ".delete-form", function () {
                var container = $(this).closest(".container");
                if (container.attr("id") === "container1") {
                    formCount1--;
                } else if (container.attr("id") === "container2") {
                    formCount2--;
                }
                $(this).parent().remove();
                updateSaveButtonVisibility();
            });

            // Сохранение данных из форм и переключение между контейнерами
            $(".save-forms").click(function () {
                //var activeContainer = $(".container.active");
                //var inactiveContainer = $(".container:not(.active)");

                $("#container1").addClass("d-none");
                 $("#container2").removeClass("d-none");

                // var formData = [];
                // activeContainer.find(".form-control").each(function () {
                //     formData.push($(this).val());
                // });

                // Здесь вы можете выполнить дополнительные действия с сохраненными данными, например, отправить их на сервер.
                //console.log(formData);

                // Скрываем активный контейнер и показываем неактивный
                //activeContainer.removeClass("active").hide();
                //inactiveContainer.addClass("active").show();
            });
        });
