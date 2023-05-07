import requests
import time
import json
import logging

logging.basicConfig(filename='envio-wa.log', level=logging.INFO, format='%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s',
                    datefmt='%Y-%m-%d %H:%M:%S')

archivoJson = "data.json"


with open(archivoJson, "r", encoding='utf-8') as read_file:
    registros = json.load(read_file)

totalregistros = len(registros['result'])
logging.info('Started-' + archivoJson)

conteo = 0

Texto = "*Estimado(a) {}* \n\nTe recordamos que tu servicio Claro: *{}* tiene un balance pendiente de: *{}*. \nPuedes realizar un pago o acuerdo de pago en Mi Claro descargando la App en http://clarord.net/miclaro/ \nMás información favor llamar 8092201111 opción 1.\n\n*Claro*"



def sendMessage(para, mensaje):
    url = 'http://localhost:3001/lead'

    data = {
        "message": mensaje,
        "phone": para
    }
    headers = {
        'Content-Type': 'application/json'
    }
    print(data["phone"])
    response = requests.post(url, json=data, headers=headers)
    time.sleep(3)

   
    return response


for registro in registros['result']:

    conteo += 1


    mensaje_compuesto = Texto.format(
        registro['Nombre'], registro['Contacto'], registro['Deuda'])
    

    sendMessage("1"+ registro['Contacto'], mensaje_compuesto)
    
    logging.info('Contacto:{} Mensaje Enviado'.format(registro['Contacto']))
    

logging.info('Finish-' + archivoJson)
