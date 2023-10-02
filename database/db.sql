CREATE TABLE materias (
  id INT NOT NULL AUTO_INCREMENT,
  materia VARCHAR(50) NOT NULL,
  profesor VARCHAR(50) NOT NULL,
  unidad_credito INT NOT NULL,
  semestre INT NOT NULL,
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

