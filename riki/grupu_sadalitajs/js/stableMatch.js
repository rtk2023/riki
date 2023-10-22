// Sample JSON data with people and their preferences
const peopleData = [
    { name: "Person 1", preferences: [8, 7, 5, 4, 2] },
    { name: "Person 2", preferences: [9, 6, 3, 8, 1] },
    { name: "Person 3", preferences: [9, 9, 9, 8, 9] },
    { name: "Person 4", preferences: [9, 6, 3, 8, 1] },
    { name: "Person 5", preferences: [9, 6, 3, 8, 1] },
    { name: "Person 6", preferences: [9, 6, 3, 8, 1] }
];

// Number of groups you want to create
const numGroups = 3;

// Function to sort people into groups
function sortPeopleIntoGroups(peopleData, numGroups) {
    // Create an array to store the groups
    const groups = new Array(numGroups).fill().map(() => []);

    // Sort people by their average preference score
    const sortedPeople = peopleData.sort((a, b) => {
        const avgA = a.preferences.reduce((sum, pref) => sum + pref, 0) / a.preferences.length;
        const avgB = b.preferences.reduce((sum, pref) => sum + pref, 0) / b.preferences.length;
        return avgB - avgA;
    });

    // Distribute people into groups
    sortedPeople.forEach((person, index) => {
        const groupIndex = index % numGroups;
        groups[groupIndex].push(person.name);
    });

    return groups;
}

const resultGroups = sortPeopleIntoGroups(peopleData, numGroups);

// Output the result
console.log(resultGroups);
