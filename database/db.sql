CREATE TABLE materias (
  id INT NOT NULL AUTO_INCREMENT,
  materia VARCHAR(50) NOT NULL,
  profesor VARCHAR(50) NOT NULL,
  unidad_credito INT NOT NULL,
  semestre INT NOT NULL,
  requisito_nota_minima DECIMAL(4,2)
  PRIMARY KEY (id)
);

CREATE TABLE estudiantes (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  Email VARCHAR(50) NOT NULL,
  telefono VARCHAR(50) NOT NULL,
  cedula_de_identidad VARCHAR(50) NOT NULL,
  Fecha_de_admision DATE NOT NULL,
  PRIMARY KEY (id)
);


-- Tabla de secciones
CREATE TABLE secciones (
  id INT PRIMARY KEY AUTO_INCREMENT,
  numero_seccion INT,
  id_profesor INT,
  FOREIGN KEY (id_profesor) REFERENCES usuarios(id)
);

-- Tabla de periodos
CREATE TABLE periodos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  anio INT,
  semestre ENUM('primavera', 'verano', 'otoño', 'invierno')
);

-- Tabla de notas
CREATE TABLE notas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_estudiante INT,
  id_materia INT,
  id_seccion INT,
  id_periodo INT,
  corte1 DECIMAL(4,2),
  corte2 DECIMAL(4,2),
  corte3 DECIMAL(4,2),
  permitir_edicion BOOLEAN,
  FOREIGN KEY (id_estudiante) REFERENCES usuarios(id),
  FOREIGN KEY (id_materia) REFERENCES materias(id),
  FOREIGN KEY (id_seccion) REFERENCES secciones(id),
  FOREIGN KEY (id_periodo) REFERENCES periodos(id)
);

