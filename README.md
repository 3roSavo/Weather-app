## What's the weather like ⛅︎⛈

## Due modi di visitare il sito

1 METODO (dal web)
- Essendo il sito presente nel web potete tranquillamente raggiungerlo al segeunte Link  https://weather-app-three-wine-80.vercel.app/

2 METODO (in locale con npm)
- scaricando il progetto github
- installando le dipendenze richieste in automatico da terminale col comando "npm install"
- cambiare il nome del file envExample.env in .env
- creando un account sul sito https://openweathermap.org/ e reperire il proprio APP ID da inserire nel file .env
- creando un account su https://www.pexels.com/ e reperire la propria API KEY da inserire nel file .env
- avviare l'applicazione col comando "npm start"


L'applicazione è un sito web per le previsioni meteo.
Diverse sono le opzioni a disposizione dell'utente:
- un'anteprima nella rotta Home, con diverse previsioni globali a scorrimento
- possibilità nella homepage (nel caso l'utente dia l'accesso alla localizzazione) di ottenere immediatamente previsioni attuali del meteo locale con la geolocalizzazione
- ricerca mediante campo di input nella navbar di qualsiasi zona del mondo e ottenere di conseguenza le previsoni di tale zona
- previsioni complete attuali e aggiornamenti ogni 3 ore
- previsoni per i successivi 5 giorni
- ora locale della zona cercata, aggiornata al secondo, comprensiva di giorno della settimana, numero del giorno e mese
- foto di copertina (quando disponibile) per i risultati delle ricerche
- galleria di foto (quando disponibile) per il meteo locale nella homepage