// Navegación entre secciones principales
document.querySelectorAll('.menu-principal > li > a').forEach(enlace => {
    enlace.addEventListener('click', function(e) {
        // Si es dropdown (Marco Teórico o Análisis), no cambiamos sección principal
        if (this.parentElement.classList.contains('dropdown')) {
            return;
        }
        e.preventDefault();
        const seccionId = this.getAttribute('data-seccion');
        if (seccionId) {
            mostrarSeccion(seccionId);
        }
    });
});

// Mostrar sección por defecto al cargar: Inicio
document.addEventListener('DOMContentLoaded', () => {
    mostrarSeccion('inicio');

    // Hacer que los enlaces internos funcionen suavemente
    document.querySelectorAll('.dropdown-content a, .indice-lateral a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Determinar a qué sección pertenece el target
            const seccionesMarco = ['introduccion', 'antecedentes', 'planteamiento', 'arbol', 
                                    'formulacion', 'proposito', 'metodologia', 'planificacion'];
            const seccionesAnalisis = ['modelo-ambiental', 'modelo-comportamiento'];
            
            if (seccionesMarco.includes(targetId)) {
                mostrarSeccion('marco-teorico');
                setTimeout(() => {
                    const elemento = document.getElementById(targetId);
                    if (elemento) {
                        elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        // Resaltar temporalmente
                        elemento.style.transition = '0.3s';
                        elemento.style.backgroundColor = '#ffeb9e';
                        setTimeout(() => {
                            elemento.style.backgroundColor = '';
                        }, 2000);
                    }
                }, 150);
            }
            else if (seccionesAnalisis.includes(targetId)) {
                mostrarSeccion('analisis-estructurado');
                setTimeout(() => {
                    const elemento = document.getElementById(targetId);
                    if (elemento) {
                        elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        elemento.style.transition = '0.3s';
                        elemento.style.backgroundColor = '#ffeb9e';
                        setTimeout(() => {
                            elemento.style.backgroundColor = '';
                        }, 2000);
                    }
                }, 150);
            }
        });
    });
});

function mostrarSeccion(id) {
    // Ocultar todas las secciones
    document.querySelectorAll('.seccion').forEach(sec => {
        sec.classList.remove('activa');
    });
    
    // Mostrar la seleccionada
    const activar = document.getElementById(id);
    if (activar) {
        activar.classList.add('activa');
    } else if (id === 'marco-teorico') {
        document.getElementById('marco-teorico').classList.add('activa');
    } else if (id === 'analisis-estructurado') {
        document.getElementById('analisis-estructurado').classList.add('activa');
    }
}

// FUNCIONALIDAD MEJORADA DEL BUSCADOR
document.getElementById('btnBuscar').addEventListener('click', buscarEnPagina);
document.getElementById('buscador').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') buscarEnPagina();
});

function buscarEnPagina() {
    const termino = document.getElementById('buscador').value.trim().toLowerCase();
    if (termino === '') {
        alert('🔍 Por favor, escribe algo para buscar');
        return;
    }

    // Mapeo de términos comunes a secciones y elementos específicos
    const mapeoBusqueda = {
        'introduccion': { seccion: 'marco-teorico', elemento: 'introduccion', texto: 'Introducción' },
        'introducción': { seccion: 'marco-teorico', elemento: 'introduccion', texto: 'Introducción' },
        'antecedentes': { seccion: 'marco-teorico', elemento: 'antecedentes', texto: 'Antecedentes' },
        'planteamiento': { seccion: 'marco-teorico', elemento: 'planteamiento', texto: 'Planteamiento del Problema' },
        'arbol': { seccion: 'marco-teorico', elemento: 'arbol', texto: 'Árbol del Problema' },
        'árbol': { seccion: 'marco-teorico', elemento: 'arbol', texto: 'Árbol del Problema' },
        'formulacion': { seccion: 'marco-teorico', elemento: 'formulacion', texto: 'Formulación del Problema' },
        'formulación': { seccion: 'marco-teorico', elemento: 'formulacion', texto: 'Formulación del Problema' },
        'proposito': { seccion: 'marco-teorico', elemento: 'proposito', texto: 'Propósito del Estudio' },
        'propósito': { seccion: 'marco-teorico', elemento: 'proposito', texto: 'Propósito del Estudio' },
        'metodologia': { seccion: 'marco-teorico', elemento: 'metodologia', texto: 'Metodología' },
        'metodología': { seccion: 'marco-teorico', elemento: 'metodologia', texto: 'Metodología' },
        'planificacion': { seccion: 'marco-teorico', elemento: 'planificacion', texto: 'Planificación de Actividades' },
        'planificación': { seccion: 'marco-teorico', elemento: 'planificacion', texto: 'Planificación de Actividades' },
        'modelo ambiental': { seccion: 'analisis-estructurado', elemento: 'modelo-ambiental', texto: 'Modelo Ambiental' },
        'modelo de comportamiento': { seccion: 'analisis-estructurado', elemento: 'modelo-comportamiento', texto: 'Modelo de Comportamiento' },
        'comportamiento': { seccion: 'analisis-estructurado', elemento: 'modelo-comportamiento', texto: 'Modelo de Comportamiento' },
        'ambiental': { seccion: 'analisis-estructurado', elemento: 'modelo-ambiental', texto: 'Modelo Ambiental' },
        'marco teorico': { seccion: 'marco-teorico', elemento: null, texto: 'Marco Teórico' },
        'marco teórico': { seccion: 'marco-teorico', elemento: null, texto: 'Marco Teórico' },
        'analisis estructurado': { seccion: 'analisis-estructurado', elemento: null, texto: 'Análisis Estructurado' },
        'análisis estructurado': { seccion: 'analisis-estructurado', elemento: null, texto: 'Análisis Estructurado' },
        'inicio': { seccion: 'inicio', elemento: null, texto: 'Inicio' },
        'farmacia': { seccion: 'inicio', elemento: null, texto: 'Farmacia Chávez' },
        'chavez': { seccion: 'inicio', elemento: null, texto: 'Farmacia Chávez' },
        'salud': { seccion: 'inicio', elemento: null, texto: 'Salud' }
    };

    // Buscar coincidencia exacta en el mapeo
    let coincidencia = null;
    for (let clave in mapeoBusqueda) {
        if (termino === clave || termino.includes(clave) || clave.includes(termino)) {
            coincidencia = mapeoBusqueda[clave];
            break;
        }
    }

    if (coincidencia) {
        // Ir a la sección correspondiente
        mostrarSeccion(coincidencia.seccion);
        
        if (coincidencia.elemento) {
            // Esperar a que la sección se muestre y luego ir al elemento específico
            setTimeout(() => {
                const elemento = document.getElementById(coincidencia.elemento);
                if (elemento) {
                    elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Resaltar el elemento
                    elemento.style.transition = '0.3s';
                    elemento.style.backgroundColor = '#ffeb9e';
                    elemento.style.borderRadius = '10px';
                    elemento.style.padding = '10px';
                    setTimeout(() => {
                        elemento.style.backgroundColor = '';
                        elemento.style.padding = '';
                    }, 2500);
                    mostrarMensajeExito(`✅ Encontrado: ${coincidencia.texto}`);
                } else {
                    mostrarMensajeExito(`✅ Sección: ${coincidencia.texto}`);
                }
            }, 200);
        } else {
            mostrarMensajeExito(`✅ Mostrando: ${coincidencia.texto}`);
        }
        return;
    }

    // Si no hay coincidencia en el mapeo, buscar en todo el texto de la página
    const elementosTexto = document.querySelectorAll('p, h1, h2, h3, h4, li, .card p, .card h3, .bloque-contenido p, .bloque-contenido h2, .analisis-bloque p, .analisis-bloque h3');
    let encontrado = false;
    
    for (let el of elementosTexto) {
        const textoElemento = el.innerText.toLowerCase();
        if (textoElemento.includes(termino)) {
            // Encontramos el elemento, ahora hay que mostrar la sección donde está
            let seccionPadre = el.closest('.seccion');
            if (seccionPadre) {
                mostrarSeccion(seccionPadre.id);
                setTimeout(() => {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    el.style.transition = '0.3s';
                    el.style.backgroundColor = '#ffeb9e';
                    el.style.borderRadius = '8px';
                    el.style.padding = '8px';
                    setTimeout(() => {
                        el.style.backgroundColor = '';
                        el.style.padding = '';
                    }, 2500);
                    encontrado = true;
                    mostrarMensajeExito(`✅ Encontrado: "${termino}" en ${seccionPadre.id.replace('-', ' ')}`);
                }, 200);
                break;
            }
        }
    }
    
    if (!encontrado) {
        mostrarMensajeError(`❌ No se encontró "${termino}" en ninguna parte de la página.`);
    }
}

function mostrarMensajeExito(mensaje) {
    mostrarMensajeTemporal(mensaje, '#d4edda', '#155724', '✅');
}

function mostrarMensajeError(mensaje) {
    mostrarMensajeTemporal(mensaje, '#f8d7da', '#721c24', '❌');
}

function mostrarMensajeTemporal(mensaje, colorFondo, colorTexto, icono) {
    // Crear un div flotante para el mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.innerHTML = `${icono} ${mensaje}`;
    mensajeDiv.style.position = 'fixed';
    mensajeDiv.style.top = '100px';
    mensajeDiv.style.right = '20px';
    mensajeDiv.style.backgroundColor = colorFondo;
    mensajeDiv.style.color = colorTexto;
    mensajeDiv.style.padding = '15px 20px';
    mensajeDiv.style.borderRadius = '10px';
    mensajeDiv.style.fontWeight = 'bold';
    mensajeDiv.style.zIndex = '9999';
    mensajeDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    mensajeDiv.style.borderLeft = `4px solid ${colorTexto}`;
    mensajeDiv.style.fontFamily = 'Poppins, sans-serif';
    mensajeDiv.style.animation = 'slideIn 0.3s ease';
    
    document.body.appendChild(mensajeDiv);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        mensajeDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (mensajeDiv.parentNode) {
                mensajeDiv.parentNode.removeChild(mensajeDiv);
            }
        }, 300);
    }, 3000);
}

// Agregar animaciones CSS dinámicamente
const estiloAnimaciones = document.createElement('style');
estiloAnimaciones.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(estiloAnimaciones);