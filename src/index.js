document.addEventListener('DOMContentLoaded', () => {

    // Select the table element
    const table = document.querySelector('table');
  
    // Fetch the list of dogs and populate the table
    fetch('http://localhost:3000/dogs')
      .then(response => response.json())
      .then(dogs => {
        dogs.forEach(dog => {
          const row = document.createElement('tr');
          const nameCell = document.createElement('td');
          const breedCell = document.createElement('td');
          const sexCell = document.createElement('td');
          const editCell = document.createElement('td');
          const editButton = document.createElement('button');
  
          nameCell.textContent = dog.name;
          breedCell.textContent = dog.breed;
          sexCell.textContent = dog.sex;
          editButton.textContent = 'Edit';
          editButton.addEventListener('click', () => {
            // Populate the form with the dog's information
            const form = document.querySelector('form');
            form.elements.name.value = dog.name;
            form.elements.breed.value = dog.breed;
            form.elements.sex.value = dog.sex;
            form.dataset.id = dog.id;
          });
  
          editCell.appendChild(editButton);
  
          row.appendChild(nameCell);
          row.appendChild(breedCell);
          row.appendChild(sexCell);
          row.appendChild(editCell);
  
          table.appendChild(row);
        });
      });
  
    // Handle form submission
    const form = document.querySelector('form');
    form.addEventListener('submit', event => {
      event.preventDefault();
  
      const id = form.dataset.id;
      const name = form.elements.name.value;
      const breed = form.elements.breed.value;
      const sex = form.elements.sex.value;
  
      fetch(`http://localhost:3000/dogs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, breed, sex })
      })
      .then(() => {
        // Fetch the updated list of dogs and repopulate the table
        fetch('http://localhost:3000/dogs')
          .then(response => response.json())
          .then(dogs => {
            // Remove all existing rows from the table
            while (table.rows.length > 1) {
              table.deleteRow(1);
            }
  
            // Populate the table with the updated dog information
            dogs.forEach(dog => {
              const row = document.createElement('tr');
              const nameCell = document.createElement('td');
              const breedCell = document.createElement('td');
              const sexCell = document.createElement('td');
              const editCell = document.createElement('td');
              const editButton = document.createElement('button');
  
              nameCell.textContent = dog.name;
              breedCell.textContent = dog.breed;
              sexCell.textContent = dog.sex;
              editButton.textContent = 'Edit';
              editButton.addEventListener('click', () => {
                // Populate the form with the dog's information
                form.elements.name.value = dog.name;
                form.elements.breed.value = dog.breed;
                form.elements.sex.value = dog.sex;
                form.dataset.id = dog.id;
              });
  
              editCell.appendChild(editButton);
  
              row.appendChild(nameCell);
              row.appendChild(breedCell);
              row.appendChild(sexCell);
              row.appendChild(editCell);
  
              table.appendChild(row);
            });
          });
      });
    });
  
  });
  