// script.js

// Global variable to store the selected row ID for editing
let selectedRowID;

document.addEventListener('DOMContentLoaded', fetchData);

function fetchData() {
    fetch('http://localhost:2992/api/getAll')
        .then(response => response.json())
        .then(data => displayData(data))
        .catch(error => console.error('Error fetching data:', error));
}

function displayData(dataList) {
    const tbody = document.querySelector('tbody');

    dataList.forEach(data => {
        const row = document.createElement('tr');

        const deleteButton = document.createElement('button');
        const editButton = document.createElement('button');
        const td = document.createElement('td');

        deleteButton.classList.add("deleteButton_")
        editButton.classList.add("editButton_")

        // editButton.id = `editButton_`;
        // deleteButton.id = `deleteButton_`;

        editButton.textContent = 'Edit';

        editButton.addEventListener('click', function() {
            editSelectedRow(data);
        });
        deleteButton.textContent = 'Delete';

        deleteButton.addEventListener('click', function() {
            deleteSelectedRow(data.id);
        });



        row.innerHTML = `
            <td>${data.id}</td>
            <td>${data.name}</td>
            <td>${data.age}</td>
            <td>${formatDate(data.dogumTarihi)}</td>
            <td>${data.meslek}</td>
        `;


        td.appendChild(deleteButton);
        td.appendChild(editButton);
        row.appendChild(td);

        tbody.appendChild(row);
    });
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

let editModal = document.getElementById('editModal');

function editSelectedRow(data) {
    // Open the modal
    editModal.style.display = 'block';

    // Fetch data for the selected row and fill in the modal inputs
    document.getElementById('editName').value = data.name;
    document.getElementById('editAge').value = data.age;
    document.getElementById('editBirthDate').value = formatDate(data.dogumTarihi);
    document.getElementById('editOccupation').value = data.meslek;

    // Set the current edited row ID
    selectedRowID = data.id;
}


function deleteSelectedRow(id) {
    const rows = document.querySelectorAll('#dataTable tbody tr');

    for (const row of rows) {
        const rowId = row.querySelector('td:first-child').textContent;

        if (rowId === id?.toString()) {
            fetch(`http://localhost:2992/api/deleteData?id=${id}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        row.remove();
                    } else {
                        alert('Error deleting data from the server.');
                    }
                })
                .catch(error => console.error('Error deleting data:', error));

            break;
        }
    }
}

function closeEditModal() {
    // Close the modal
    editModal.style.display = 'none';
}

function saveChanges() {
    // Implement logic to save changes to the server and update client data
    const editedData = {
        name: document.getElementById('editName').value,
        age: document.getElementById('editAge').value,
        dogumTarihi: document.getElementById('editBirthDate').value,
        meslek: document.getElementById('editOccupation').value
    };

    // Send a PUT request to update the data on the server
    fetch(`http://localhost:2992/api/editData?id=${selectedRowID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
    })
        .then(response => {
            if (response.ok) {
                // Update the client data and close the modal
                updateClientData(selectedRowID, editedData);
                closeEditModal();
            } else {
                alert('Error updating data on the server.');
            }
        })
        .catch(error => console.error('Error updating data:', error));
}

function updateClientData(id, editedData) {
    // Implement logic to update the client-side data
    const rows = document.querySelectorAll('#dataTable tbody tr');
    let editedRow;

    for (const row of rows) {
        const firstCellContent = row.querySelector('td:first-child').textContent;
        if (firstCellContent == id) {
            editedRow = row;
            break;
        }

    }

    if (editedRow) {
        // Update the edited row in the HTML table
        editedRow.querySelector('td:nth-child(2)').textContent = editedData.name;
        editedRow.querySelector('td:nth-child(3)').textContent = editedData.age;
        editedRow.querySelector('td:nth-child(4)').textContent = formatDate(editedData.dogumTarihi);
        editedRow.querySelector('td:nth-child(5)').textContent = editedData.meslek;
    } else {
        console.error('Row not found for ID:', id);
    }
}

function openAddModal() {
    // Open the modal for adding new data
    let addModal = document.getElementById('addModal');
    addModal.style.display = 'block';

    // Clear the input fields when opening the modal
    document.getElementById('addName').value = '';
    document.getElementById('addAge').value = '';
    document.getElementById('addAge').type="number";
    document.getElementById('addBirthDate').value = '';
    document.getElementById('addOccupation').value = '';
}

function closeAddModal() {
    // Close the modal for adding new data
    let addModal = document.getElementById('addModal');
    addModal.style.display = 'none';
}

function addData() {
    // Implement logic to add new data to the server and update client data
    const newData = {
        name: document.getElementById('addName').value,
        age: document.getElementById('addAge').value,
        dogumTarihi: document.getElementById('addBirthDate').value,
        meslek: document.getElementById('addOccupation').value
    };

    // Send a POST request to add the data on the server
    fetch('http://localhost:2992/api/saveData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
    })
        .then(response => response.json())
        .then(data => {
            // Update the client data, close the modal, and display the new row
            closeAddModal();
            displayNewData(data);
        })
        .catch(error => console.error('Error adding data:', error));
}

function displayNewData(newData) {
    // Implement logic to display the new data in the table
    const tbody = document.querySelector('tbody');
    const row = document.createElement('tr');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const td = document.createElement('td');
    editButton.classList.add("editButton_");
    deleteButton.classList.add("deleteButton_");

    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        deleteSelectedRow(newData.id);
    });

    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
        editSelectedRow(newData);
    });

    row.innerHTML = `
        <td>${newData.id}</td>
        <td>${newData.name}</td>
        <td>${newData.age}</td>
        <td>${formatDate(newData.dogumTarihi)}</td>
        <td>${newData.meslek}</td>
    `;

    td.appendChild(deleteButton);
    td.appendChild(editButton);
    row.appendChild(td);
    tbody.appendChild(row);
}
