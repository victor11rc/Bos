document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.querySelector('#data-table tbody');
    const fileViewer = document.getElementById('file-viewer');

    // ID de la carpeta en Google Drive
    const folderId = 'YOUR_FOLDER_ID';
    const apiKey = 'YOUR_API_KEY';

    // URL de la API para listar archivos
    const apiUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name)`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        data.files.forEach(file => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${file.name}</td>
                <td><button class="view-file-btn" data-id="${file.id}">📂 Ver</button></td>
            `;

            // Agregar evento para mostrar archivo en el visor
            tr.querySelector('.view-file-btn').addEventListener('click', () => {
                fileViewer.src = `https://drive.google.com/uc?id=${file.id}`;
            });

            tableBody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al cargar los archivos:', error);
    }
});
