var selectedRow = null;

function onFormSubmit(e) {
    e.preventDefault(); // Prevent page refresh
    var formData = readFormData();
    if (selectedRow === null) {
        insertNewRecord(formData);
    } else {
        updateRecord(formData);
    }
    console.log('Hello');
   
    resetForm();
}

// Retrieve the data
function readFormData() {
    var formData = {};
    formData["TaskName"] = document.getElementById("TaskName").value;
    formData["TaskDescription"] = document.getElementById("TaskDescription").value;
    formData["Deadline"] = document.getElementById("Deadline").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("storelist").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length); // Fix row insertion
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3); // Fixed index

    cell1.innerHTML = data.TaskName;
    cell2.innerHTML = data.TaskDescription;
    cell3.innerHTML = data.Deadline;
    cell4.innerHTML = `<button onClick="onEdit(this)">Edit</button>
                       <button onClick="onDelete(this)">Delete</button>`;
}

// Edit the data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("TaskName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("TaskDescription").value = selectedRow.cells[1].innerHTML;
    document.getElementById("Deadline").value = selectedRow.cells[2].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.TaskName;
    selectedRow.cells[1].innerHTML = formData.TaskDescription;
    selectedRow.cells[2].innerHTML = formData.Deadline;
    selectedRow = null;
}

// Delete the data
function onDelete(td) {
    if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('storelist').deleteRow(row.rowIndex);
        resetForm();
    }
}

// Reset the form
function resetForm() {
    document.getElementById("TaskName").value = '';
    document.getElementById("TaskDescription").value = '';
    document.getElementById("Deadline").value = '';
    selectedRow = null;
}