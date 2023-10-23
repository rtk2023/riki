/**
 * JavaScript file for the tool page and the tool
 */


const toolForm = $("#tool-form");
const toolFormTitle = $("#tool-form-title");
const toolContinueButton = $("#tool-continue");

let toolStep;
let currentSolution;

let toolData = {};

$(document).ready()
{
    initializeTool();
}

function initializeTool()
{
    toolStep = 0;

    loadNextToolStep();
}

function initializeForm(formTitle, formObject)
{
    toolFormTitle.text(formTitle);


    toolForm.empty();

    toolForm.jsonForm(formObject);


    toolContinueButton.unbind();

    toolContinueButton.on("click", function(e)
    {
        loadNextToolStep();
    });
}

function showToolResults()
{
    toolFormTitle.hide();

    toolForm.empty();

    toolContinueButton.hide();


    let toolResultsHTML =
    `
    <div class="toolResults">
        <h3 class="text-center">`+ toolData["problem"]["name"] +`</h4>
        <p>Description: `+ toolData["problem"]["description"] +`</p>
    `;


    for(var x in toolData["solutions"])
    {
        toolResultsHTML += '<div id="SolutionRow"> <p id="solutionName"> ' + toolData["solutions"][x]["name"] + "</p>";

          toolResultsHTML += '<div class="AdvantegesList">';

            for(var y in toolData["solutions"][x]["advantages"])
            {
                toolResultsHTML += '<p> <i class="bi bi-plus-circle-fill"></i>   ' + toolData["solutions"][x]["advantages"][y] + "</p>";
            }

          toolResultsHTML += "</div>";
          toolResultsHTML += '<div class="DisadvantegesList">';

            for(var y in toolData["solutions"][x]["disadvantages"])
            {
                toolResultsHTML += '<p> <i class="bi bi-dash-circle-fill"></i>   ' + toolData["solutions"][x]["disadvantages"][y] + '</p>';
            }

          toolResultsHTML += "</div>";

        toolResultsHTML += "</div>";
    }


    toolResultsHTML += "</div>";
    toolForm.append(toolResultsHTML);
}

function loadNextToolStep()
{
    toolForm.submit();

    let currentStepForm;

    if(toolStep == 0)
    {
        currentStepForm = getFirstToolStepFormObject();

        toolStep++;
    }
    else if(toolStep == 1)
    {
        currentStepForm = getSecondToolStepFormObject();

        toolStep++;
    }
    else if(toolStep == 2)
    {
        toolStep++;

        currentSolution = 0;


        for(var x in toolData["solutions"])
        {
            toolData["solutions"][x]["advantages"] = [];
            toolData["solutions"][x]["disadvantages"] = [];
        }

        currentStepForm = getThirdToolStepFormObject();
    }
    else if(toolStep == 3)
    {
        if(currentSolution >= (toolData["solutions"].length - 1))
        {
            toolStep++;

            currentSolution = 0;

            currentStepForm = getFourthToolStepFormObject();
        }
        else
        {
            currentSolution++;

            currentStepForm = getThirdToolStepFormObject();
        }
    }
    else if(toolStep == 4)
    {
        if(currentSolution >= toolData["solutions"].length - 1)
        {
            showToolResults();

            return;
        }
        else
        {
            currentSolution++;

            currentStepForm = getFourthToolStepFormObject();
        }
    }

    initializeForm("Decision Simplifier", currentStepForm);

    setJsonFormArrayIcons();
}


function createNewProblem(problemName, problemDescription)
{
    toolData["problem"] =
    {
        name: problemName,
        description: problemDescription
    };

    toolData["solutions"] = [];
}

function addSolutionsToProblem(solutions)
{
    for(var x in solutions)
    {
        toolData["solutions"][x] =
        {
            name: solutions[x]
        };
    }
}

function addAdvantagesToSolution(advantages)
{
    for(var x in advantages)
    {
        toolData["solutions"][currentSolution]["advantages"].push(advantages[x]);
    }
}

function addDisadvantagesToSolution(disadvantages)
{
    for(var x in disadvantages)
    {
        toolData["solutions"][currentSolution]["disadvantages"].push(disadvantages[x]);
    }
}

function getFirstToolStepFormObject()
{
    var firstStepFormObject =
    {
        schema:
        {
            name:
            {
                type: 'string',
                title: 'Ievadiet jūsu problēmu',
            },
            description:
            {
                type: 'string',
                title: 'Par ko ir problēma?',
            }
        },
        form: [
        {
            key: "name",
            type: "text",
            htmlClass: 'custom-class-1' // Добавление класса 'custom-class-1' к полю "name"
        },
        {
            key: "description",
            type: "textarea",
            htmlClass: 'custom-class-2' // Добавление класса 'custom-class-2' к полю "description"
        }
        ],
        onSubmit: function (errors, values)
        {
            createNewProblem(values["name"], values["description"]);
        }
    };

    return firstStepFormObject;
}

function getSecondToolStepFormObject()
{
    var secondStepFormObject =
    {
        schema:
        {
            solutions:
            {
                type: 'array',
                items:
                {
                    title: 'Problēmas risinājumi',
                    type: "string"
                }
            }
        },
        form:
        [
            {
                type: "array",
                items:
                [{
                    key: "solutions[]",
                    title: "Problēma risinajums - {{idx}}",
                    htmlClass: 'solution-input'
                }]
            }
        ],
        onSubmit: function (errors, values)
        {
            addSolutionsToProblem(values["solutions"]);
        }
    };

    return secondStepFormObject;
}

function getThirdToolStepFormObject()
{
    var thirdStepFormObject =
    {
        schema:
        {
            solution:
            {
                type: "string",
                title: "Risinajums",
                readonly: true
            },
            advantages:
            {
                type: 'array',
                items:
                {
                    title: 'Risinājuma priekšrocības',
                    type: "string"
                }
            }
        },
        form:
        [
            "solution",
            {
                type: "array",
                items:
                [{
                    key: "advantages[]",
                    title: "Priekšrocība - {{idx}}",
                    htmlClass: 'advantage-input'
                }]
            }
        ],
        value:
        {
            "solution": toolData["solutions"][currentSolution]["name"]
        },
        onSubmit: function (errors, values)
        {
            addAdvantagesToSolution(values["advantages"]);
        }
    };

    return thirdStepFormObject;
}

function getFourthToolStepFormObject()
{
    var fourthStepFormObject =
    {
        schema:
        {
            solution:
            {
                type: "string",
                title: "Risinajums",
                readonly: true
            },
            disadvantages:
            {
                type: 'array',
                items:
                {
                    title: 'Risinājuma trūkumi',
                    type: "string"
                }
            }
        },
        form:
        [
            "solution",
            {
                type: "array",
                items:
                [{
                    key: "disadvantages[]",
                    title: "Trūkums - {{idx}}"
                }]
            }
        ],
        value:
        {
            "solution": toolData["solutions"][currentSolution]["name"]
        },
        onSubmit: function (errors, values)
        {
            addDisadvantagesToSolution(values["disadvantages"]);
        }
    };

    return fourthStepFormObject;
}

function setJsonFormArrayIcons()
{
    console.log('work');
    $('.glyphicon').removeClass('glyphicon');
    $('.glyphicon-plus-sign').addClass('ri-add-circle-fill remixIcon');
    $('.glyphicon-plus-sign').removeClass('glyphicon-plus-sign');
    
    $('.glyphicon-minus-sign').addClass('ri-indeterminate-circle-fill remixIcon');
    $('.glyphicon-minus-sign').removeClass('glyphicon-minus-sign');
}
