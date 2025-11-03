-- ========================================
-- Base de datos: Sistema de Enseñanza del Idioma Maya
-- ========================================

-- ------------------------
-- Tabla: administradores
-- ------------------------
CREATE TABLE IF NOT EXISTS administradores (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(100) NOT NULL, -- En entorno real se encriptaría
    created_at TIMESTAMP DEFAULT NOW()
);

-- Datos iniciales del administrador
INSERT INTO administradores (nombre, correo, contrasena)
VALUES ('Rodolfo Navarrete', '123@gmail.com', '12345');

-- ------------------------
-- Tabla: grupos
-- ------------------------
CREATE TABLE IF NOT EXISTS grupos (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,         -- Ej: Grupo A, Grupo B
    nivel VARCHAR(20) NOT NULL,          -- Básico, Intermedio, Avanzado
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ------------------------
-- Tabla: usuarios (antes alumnos)
-- ------------------------
CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    matricula VARCHAR(20) UNIQUE NOT NULL,
    correo VARCHAR(100),
    grupo_id BIGINT REFERENCES grupos(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ------------------------
-- Tabla: temas
-- ------------------------
CREATE TABLE IF NOT EXISTS temas (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,      -- Ej: Pronunciación, Gramática, Lectura
    nivel VARCHAR(20) NOT NULL,        -- Básico, Intermedio, Avanzado
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ------------------------
-- Tabla: calificaciones
-- ------------------------
CREATE TABLE IF NOT EXISTS calificaciones (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usuario_id BIGINT REFERENCES usuarios(id) ON DELETE CASCADE,
    tema_id BIGINT REFERENCES temas(id) ON DELETE CASCADE,
    calificacion DECIMAL(4,2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(usuario_id, tema_id) -- Un alumno solo puede tener una calificación por tema
);

-- ------------------------
-- Tabla: reportes
-- ------------------------
CREATE TABLE IF NOT EXISTS reportes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,          -- 'individual' o 'general'
    usuario_id BIGINT REFERENCES usuarios(id) ON DELETE SET NULL,
    grupo_id BIGINT REFERENCES grupos(id) ON DELETE SET NULL,
    archivo TEXT NOT NULL,              -- Ruta o nombre del PDF
    created_at TIMESTAMP DEFAULT NOW()
);

-- ------------------------
-- Datos iniciales para idioma maya
-- ------------------------
INSERT INTO grupos(nombre, nivel) VALUES
('Grupo A', 'Básico'),
('Grupo B', 'Intermedio'),
('Grupo C', 'Avanzado');

INSERT INTO temas(nombre, nivel) VALUES
('Pronunciación', 'Básico'),
('Gramática', 'Básico'),
('Lectura y Comprensión', 'Intermedio'),
('Vocabulario', 'Intermedio'),
('Redacción de Textos', 'Avanzado'),
('Traducción y Cultura', 'Avanzado');
