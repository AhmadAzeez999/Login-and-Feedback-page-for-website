document.addEventListener("DOMContentLoaded", function () {
    const componentSelect = document.getElementById("component");
    const addButton = document.getElementById("addButton");
    const comparisonTable = document.getElementById("comparisonTable");

    addButton.addEventListener("click", function () {
        const selectedComponent = componentSelect.value;
        if (selectedComponent) {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${selectedComponent}</td>
                <td>Specifications</td>
                <td>Performance</td>
                <td><button class="removeButton">Remove</button></td>
            `;
            comparisonTable.appendChild(newRow);

            // Clear the component selection
            componentSelect.value = "";
        }
    });

    comparisonTable.addEventListener("click", function (e) {
        if (e.target.classList.contains("removeButton")) {
            const row = e.target.parentElement.parentElement;
            row.remove();
        }
    });
});
