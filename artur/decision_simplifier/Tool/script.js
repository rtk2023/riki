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
        <h3 class="text-center">Name: `+ toolData["problem"]["name"] +`</h4>
        <p>Description: `+ toolData["problem"]["description"] +`</p>
    `;


    for(var x in toolData["solutions"])
    {
        toolResultsHTML += "<p>Solution: " + toolData["solutions"][x]["name"] + "</p>";

        for(var y in toolData["solutions"][x]["advantages"])
        {
            toolResultsHTML += "<p>Advantage - "+ y + ": " + toolData["solutions"][x]["advantages"][y] + "</p>";
        }

        for(var y in toolData["solutions"][x]["disadvantages"])
        {
            toolResultsHTML += "<p>Disadvantage - " + y + ": " + toolData["solutions"][x]["disadvantages"][y] + "</p>";
        }
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

    initializeForm("The problem", currentStepForm);
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
                title: 'Name for the problem',
            },
            description: 
            {
                type: 'string',
                title: 'What is the problem about?'
            }
        },
        form:
        [
            "name",
            {
                key: "description",
                type: "textarea"
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
                    title: 'Solutions for the problem',
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
                    title: "Solution - {{idx}}"
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
                title: "The solution",
                readonly: true
            },
            advantages: 
            {
                type: 'array',
                items:
                {
                    title: 'Advantages of the solution',
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
                    title: "Advantage - {{idx}}"
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
                title: "The solution",
                readonly: true
            },
            disadvantages: 
            {
                type: 'array',
                items:
                {
                    title: 'Disadvantages of the solution',
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
                    title: "Disadvantage - {{idx}}"
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