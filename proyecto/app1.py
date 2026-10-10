#importar librerias
from flask import Flask
#importar lib de redireccionamiento
from flask import redirect, url_for

#crear instancia de flask
app = Flask(__name__)

##############################
##Definicion de rutas
#[Definicion de ruta principal]
@app.route("/")
def inicio():
    	return (
		"Hola mundo, soy Felipe Rafael Colin Miranda,<br>"
		"Esto es mi primer servidor en flask, <br>"
		"Me encanta la ciberseguridad, la programación, pero sobre todo estar con mis seres amados"
		)

#[ruta con parametros]
@app.route("/saludo/<nombre>")
def saludo(nombre):
	return f"Hola, {nombre}"


#[ruta con condiciones]
@app.route("/edad/<int:age>")
def edad(age):
	if age >= 18:
		return redirect(url_for("contenido"))
	else:
		return "Acceso autorizado"


#[rruta con redireccionamiento]
@app.route('/contenido')
def contenido():
	return "Este es el contenido de mi servidor"
#############################


#correr la aplicacion
if __name__ == "__main__":
    app.run(debug=True)
