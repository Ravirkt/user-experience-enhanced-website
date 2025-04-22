import express from 'express'
import { Liquid } from 'liquidjs';



const app = express()
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express());


app.set('views', './views')











app.get('/events', async function (request, response) {

    const apiResponseHeaderEvents = await fetch('https://fdnd-agency.directus.app/items/dda_events?limit=3');
    const apiResponseHeaderEventsJSON = await apiResponseHeaderEvents.json()
  
    // console.log(apiResponseJSON.data)
  
    const { theme, location } = request.query;
    let apiResponse;
  
    console.log("test", request.query);
  
    let directusApi = 'https://fdnd-agency.directus.app/items/dda_events';
  
    // Kijkt of location of theme een waarde hebben. Is dat het geval wordt in de directusapi value de ? toegevoegd. Hiermee kunnen filters toepassen
    if (location || theme) {
      directusApi += '?';
  
      // Hier kijkt er of theme een waarde heeft en pakt hij de directus filter syntax en zet de waarde van de theme daarin.
      if (theme) {
        directusApi += 'filter[theme][_eq]=' + request.query.theme;
      }
  
      // Hier kijkt er of de location een waarde heeft en of ook is gefiltert op theme. zo ja, dan wordt de & toegevoegt zodat er nog een filter in de url kan worden toegevoegd
      if (location) {
        if (theme) directusApi += '&';
        directusApi += 'filter[location][_eq]=' + request.query.location;
      }
    }
  
    console.log(directusApi)
    apiResponse = await fetch(directusApi);
    const apiResponseJSON = await apiResponse.json();
  
    response.render('events.liquid', { events: apiResponseJSON.data, headerEvents: apiResponseHeaderEventsJSON.data })
  })


// details pagina
app.get('/events/detail-event/:id', async function (request, response) {

    // ophalen van data specifieke event door id
    const apiResponseDetails = await fetch('https://fdnd-agency.directus.app/items/dda_events/' + request.params.id);
    const apiResponseDetailsJSON = await apiResponseDetails.json();
  
    if (!apiResponseDetailsJSON.data) {
      return response.status(404).render('404.liquid'); 
    }
  
    // Voor ophalen alle companies die zijn ingeschreven
    const apiResponseCompany = await fetch('https://fdnd-agency.directus.app/items/dda_signups?fields=company&filter[event][_eq]=' + request.params.id);
    const apiResponseCompanyJSON = await apiResponseCompany.json();
  
    console.log("Evendid:", request.params.id);
    console.log("Companys:", apiResponseCompanyJSON);
  
    response.render('detail-event.liquid', {
      eventDetails: apiResponseDetailsJSON.data,
      companies: apiResponseCompanyJSON.data
    });
  
  });



app.post('/events/detail-event/:id', async function (request, response) {

    const apiResponseDetails = await fetch('https://fdnd-agency.directus.app/items/dda_events/' + request.params.id);
    const apiResponseDetailsJSON = await apiResponseDetails.json();
  
    const { title, name, email, phone, company, event,
      company_website, reason, fte } = request.body;
    console.log(request.body)
  
    const apiResponse = await fetch('https://fdnd-agency.directus.app/items/dda_signups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
  
      },
      body: JSON.stringify({
        title: title,
        name: name,
        email: email,
        phone: phone,
        company: company,
        event: event,
        company_website: company_website,
        reason: reason,
        fte: fte
      })
    });
  
    console.log(apiResponseDetailsJSON)
  
    response.redirect(303, '/events/detail-event/' + request.params.id + '?success=true');
  });




app.set('port', process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console
  console.log(`Daarna kun je via http://localhost:${app.get('port')}/ jouw interactieve website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`)
})
