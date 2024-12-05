// Carga de datos desde el archivo JSON
fetch('monex.json')
    .then(response => response.json())
    .then(data => {
        const financiadorSelect = document.getElementById('financiador');
        const proyectoSelect = document.getElementById('proyecto');
        const subrubroSelect = document.getElementById('subrubro');
        const tablaBody = document.querySelector('#tabla-dinamica tbody');

        // Obtener opciones únicas de cada select
        const financiadores = [...new Set(data.map(item => item.financiador))];
        financiadores.forEach(financiador => {
            const option = document.createElement('option');
            option.value = financiador;
            option.textContent = financiador;
            financiadorSelect.appendChild(option);
        });

        // Filtrar proyectos y subrubros según financiador seleccionado
        financiadorSelect.addEventListener('change', () => {
            const seleccionado = financiadorSelect.value;
            proyectoSelect.innerHTML = '<option value="">Selecciona un proyecto</option>';
            subrubroSelect.innerHTML = '<option value="">Selecciona un subrubro</option>';

            const proyectos = [...new Set(data.filter(item => item.financiador === seleccionado).map(item => item.proyecto))];
            proyectos.forEach(proyecto => {
                const option = document.createElement('option');
                option.value = proyecto;
                option.textContent = proyecto;
                proyectoSelect.appendChild(option);
            });

            const subrubros = [...new Set(data.filter(item => item.financiador === seleccionado).map(item => item['subrubro presupuestario']))];
            subrubros.forEach(subrubro => {
                const option = document.createElement('option');
                option.value = subrubro;
                option.textContent = subrubro;
                subrubroSelect.appendChild(option);
            });

            renderTabla(data, seleccionado);
        });

        // Renderizar tabla dinámica
        function renderTabla(data, financiadorSeleccionado) {
            tablaBody.innerHTML = '';
            const filtroData = data.filter(item => item.financiador === financiadorSeleccionado);
            const agrupados = filtroData.reduce((acc, curr) => {
                const key = `${curr.financiador}-${curr['subrubro presupuestario']}`;
                if (!acc[key]) {
                    acc[key] = { financiador: curr.financiador, subrubro: curr['subrubro presupuestario'], total: 0 };
                }
                acc[key].total += curr.Debe;
                return acc;
            }, {});

            Object.values(agrupados).forEach(grupo => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${grupo.financiador}</td>
                    <td>${grupo.subrubro}</td>
                    <td>${grupo.total.toFixed(2)}</td>
                `;
                tablaBody.appendChild(row);
            });
        }
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
