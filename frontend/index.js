document.addEventListener("DOMContentLoaded", () => {
    const inputName = document.getElementById("name-input")
    const inputLoves = document.getElementById("loves-input")
    const inputWeight = document.getElementById("weight-input")
    const weightFilter = document.getElementById("weight-filter")
    const choseGender = document.getElementById("choose-gender")
    const inputVampires = document.getElementById("vampires-input")
    const vampiresFilter = document.getElementById("vampires-filter")
    const isVaccinated = document.getElementById("is-vaccinated")
    const inputDob = document.getElementById("dob-input")
    const dobFilter = document.getElementById("dob-filter")
    const sortBy = document.getElementById("sort-input")
    const btn = document.getElementById("get-unicorns")
    const table = document.getElementById("unicorns-table")
    const nameTable = document.getElementById("name-table")
    const lovesTable = document.getElementById("loves-table")
    const weightTable = document.getElementById("weight-table")
    const vampiresTable = document.getElementById("vampires-table")
    const vaccinatedTable = document.getElementById("vaccine-table")
    const genderTable = document.getElementById("gender-table")
    const dobTable = document.getElementById("dob-table")
    const checkbox = document.getElementById("checkbox-container")
    const checkName = document.getElementById("check-name")
    const checkLoves = document.getElementById("check-loves")
    const checkWeight = document.getElementById("check-weight")
    const checkGender = document.getElementById("check-gender")
    const checkVampires = document.getElementById("check-vampires")
    const checkVaccinated = document.getElementById("check-vaccinated")
    const checkDbd = document.getElementById("check-dbd")

    function createQuery() {
        let query = []
        if(inputName.value) {  
            let formattedName = inputName.value.charAt(0).toUpperCase() + inputName.value.slice(1).toLowerCase()
            query.push(`name=${formattedName}`)
        }
        if(inputLoves.value) {
            query.push(`loves=${inputLoves.value}`.trim().toLowerCase())
        }
        if(inputWeight.value) {
            query.push(`weight=${inputWeight.value}`.trim())
        }
        if(weightFilter.value) {
            query.push(`weightFilter=${weightFilter.value}`)
        }
        if(choseGender.value !== "any") {
            query.push(`gender=${choseGender.value}`)
        }
        if(inputVampires.value) {
            query.push(`vampires=${inputVampires.value}`.trim())
        }
        if(vampiresFilter.value) {
            query.push(`vampiresFilter=${vampiresFilter.value}`)
        }
        if(isVaccinated.value !== "any") {
            query.push(`vaccinated=${isVaccinated.value}`)
        }
        if(inputDob.value) {
            query.push(`dob=${inputDob.value}`.trim())
        }
        if(dobFilter.value) {
            query.push(`dobFilter=${dobFilter.value}`)
        }
        if(sortBy.value) {
            query.push(`sort=${sortBy.value}`.trim())
        }
        return query.join("&")
    }

    btn.addEventListener("click", function(event) {
        event.preventDefault();
        getUnicorns();
    });

    async function getUnicorns() {
        try {
            const unicornsQuery = createQuery();
            const response = await fetch(`http://localhost:3000/unicorns?${unicornsQuery}`)
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json()
            addUnicornsToTable(data)
            displayTable()
        } catch (error) {
            console.log(error)
        }
    }

    function addUnicornsToTable(data) {
        table.innerHTML = "";
        data.forEach(unicorn => {
            const row = document.createElement('tr');

            if (checkName.checked) {
                const nameCell = document.createElement('td');
                nameCell.textContent = unicorn.name;
                row.appendChild(nameCell);
            }
            
            if (checkLoves.checked) {
                const lovesCell = document.createElement('td');
                lovesCell.textContent = unicorn.loves.join(", ");
                row.appendChild(lovesCell);
            }

            if (checkWeight.checked) {
                const weightCell = document.createElement('td');
                weightCell.textContent = unicorn.weight;
                row.appendChild(weightCell);
            }
            
            if (checkGender.checked) {
                const genderCell = document.createElement('td');
                genderCell.textContent = unicorn.gender;
                row.appendChild(genderCell);
            }

            if (checkVampires.checked) {
                const vampiresCell = document.createElement('td');
                vampiresCell.textContent = unicorn.vampires;
                row.appendChild(vampiresCell);
            }

            if (checkVaccinated.checked) {
                const vaccinatedCell = document.createElement('td');
                vaccinatedCell.textContent = unicorn.vaccinated ? 'Yes' : 'No';
                row.appendChild(vaccinatedCell);
            }

            if (checkDbd.checked) {
                const dobCell = document.createElement('td');
                dobCell.textContent = unicorn.dob;
                row.appendChild(dobCell);
            }

            table.appendChild(row);
        });
    }

    const checkboxes = document.querySelectorAll('.form-check-input');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            getUnicorns();
        });
    });

    function displayTable() {
        if (checkName.checked) {
            nameTable.style.display = "table-cell";
        } else {
            nameTable.style.display = "none";
        }

        if (checkLoves.checked) {
            lovesTable.style.display = "table-cell";
        } else {
            lovesTable.style.display = "none";
        }

        if (checkWeight.checked) {
            weightTable.style.display = "table-cell";
        } else {
            weightTable.style.display = "none";
        }

        if (checkGender.checked) {
            genderTable.style.display = "table-cell";
        } else {
            genderTable.style.display = "none";
        }

        if (checkVampires.checked) {
            vampiresTable.style.display = "table-cell";
        } else {
            vampiresTable.style.display = "none";
        }

        if (checkVaccinated.checked) {
            vaccinatedTable.style.display = "table-cell";
        } else {
            vaccinatedTable.style.display = "none";
        }

        if (checkDbd.checked) {
            dobTable.style.display = "table-cell";
        } else {
            dobTable.style.display = "none";
        }
    }    
})
