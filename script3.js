async function populateGlossary() {
    const csvUrl = 'https://raw.githubusercontent.com/MatthewBHShort/MatthewBHShort.github.io/main/glossary.csv'; // Replace with your actual CSV file URL

    // Fetch the CSV file
    const response = await fetch(csvUrl);
    const data = await response.text();

    // Parse the CSV file
    const rows = data.split('\n').slice(1); // Remove header
    const glossaryContainer = document.getElementById('glossary-container'); // Make sure to have this in your HTML

    rows.forEach((row, index) => {
        const columns = row.split(',');

        if (columns.length < 3) return; // Skip any improperly formatted rows

        const term = columns[0].trim();
        const definition = columns[1].trim().replace(/"/g, ''); // Remove double quotes if present
        const image = columns[2].trim();

        // Create the section div
        const section = document.createElement('div');
        section.className = 'section';

        // Set the id to the glossary term, converting spaces to hyphens
        section.id = term.toLowerCase().replace(/\s+/g, '-');

        // Reverse the order for even rows
        if (index % 2 === 1) {
            section.style.flexDirection = 'row-reverse';
        }

        // Create and append the image
        const img = document.createElement('img');
        img.src = image;
        img.alt = term;
        section.appendChild(img);

        // Create the text container
        const textDiv = document.createElement('div');
        textDiv.className = 'text';

        // Create and append the heading
        const h2 = document.createElement('h2');
        h2.innerText = `${term}?`;
        textDiv.appendChild(h2);

        // Create and append the paragraph
        const p = document.createElement('p');
        p.innerText = definition;
        textDiv.appendChild(p);

        // Append the text container to the section
        section.appendChild(textDiv);

        // Append the section to the glossary container
        glossaryContainer.appendChild(section);
    });
}

// Call the function to populate the glossary
populateGlossary();
