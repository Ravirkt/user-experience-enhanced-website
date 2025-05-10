
# DDA 

## Inhoudsopgave

- [DDA](#dda)
  - [Inhoudsopgave](#inhoudsopgave)
  - [Beschrijving](#beschrijving)
  - [Gebruik](#gebruik)
  - [Mobile first](#mobile-first)
  - [Functionaliteiten per pagina in het kort](#functionaliteiten-per-pagina-in-het-kort)
    - [Eventspagina](#eventspagina)
    - [Detailspagina](#detailspagina)
    - [Inschrijfformulier](#inschrijfformulier)
  - [Performance enhancement](#performance-enhancement)
    - [Responsive images](#responsive-images)
  - [Kenmerken](#kenmerken)
    - [Gebruikte technologieën](#gebruikte-technologieën)
  - [Installatie](#installatie)
  - [Bronnen](#bronnen)
  - [Licentie](#licentie)

## Beschrijving
Dit project is een opdracht die ik heb ontvangen van het softwarebedrijf De Voorhoede om de website van DDA te maken en te reviseren. Het doel van deze opdracht was om de bestaande website te verbeteren aan de hand van nieuwe designs. Ook is het van belang dat er dynamische data wordt opgehaald vanuit een API of database.

In de huidige sprint 10 wordt de nadruk gelegd op de performance van de website. Dat deze snel laadt en snel oogt voor de gebruiker. Ook wordt er gekeken naar client side scripting voor een betere user experience voor de gebruiker. 

## Gebruik
De pagina is deel van een dynamische en interactieve website waar gebruikers aankomende evenementen kunnen vinden en filteren op basis van locatie en thema. De gebruiker kan vervolgens een inschrijving indienen om zich te melden voor het event.

## Mobile first
Bij de ontwikkeling van de pagina is gewerkt volgens het mobile first-principe. Hierbij is ook rekening gehouden met de responsiveness van de typografie voor grotere schermen. Dit is gedaan door middel van CSS clamp(). Deze aanpak is verwerkt in de styleguide van de basic-styling.

## Functionaliteiten per pagina in het kort

### Eventspagina
Op eventpagina kan de gebruiker een overzicht zien van alle eventen die er zijn. Alle data van de evenementen zijn doormiddel van een GET request opgehaald uit de Directus API. De pagina heeft een hero-section met headline van drie images weergegeven met image. Verder op de pagina bevindt zich de lijst met alle events die de gebruiker vervolgens kan filteren op thema en/of locatie.

### Detailspagina
Wanneer je een events hebt gevonden dat je interesseert, kun je meer informatie bekijken door op de "Details"-button of button te klikken. De gebruiker wordt doorgestuurt naar de detailspagina van betreffende event. De gebruiker kan allerlei informatie vinden over het event. Als de gebruiker zich wilt inschrijven voor het event dient de form worden ingevuld.

### Inschrijfformulier
Als de gebruiker een event heeft gevonden, kan hij zich inschrijven. Hiervoor moet de gebruiker een aantal gegevens invoeren. Alle velden behalve de "tussenvoegsel" moet worden ingevuldt om het formulier te kunnen verzenden. 

Wanneer het formulier wordt verzonden, krijgt de gebruiker visuele feedback. Dit gebeurt door middel van een geanimeerde loader en een verlaagde opacity van het formulier, waardoor het lijkt alsof het niet te gebruiken is. Zodra het formulier succesvol is verzonden, verdwijnt de loader en herstelt de opacity naar de normale waarde. De gebruiker ontvangt vervolgens een tekstueel bericht waarin wordt bevestigd dat de inschrijving succesvol is voltooid.

De POST gebeurt cleint side zodat de page niet refreshed. Ook komt het ingevulde bedrijf gelijk in de tabel door client side.


| hero-section                                             | Filter                                             |
| -------------------------------------------------------- | -------------------------------------------------- |
| <img src="./public/assets/hero-section.gif" width="200"> | <img src="./public/assets/filter.png" width="200"> |

| Footer                                             | detailspagina                                         |
| -------------------------------------------------- | ----------------------------------------------------- |
| <img src="./public/assets/footer.gif" width="200"> | <img src="./public/assets/addedcomp.gif" width="200"> |


## Performance enhancement
Om de performance van de pagina's te verbeteren heb ik een aantal technieken toegepast, waaronder:
- Gebruik maken van responsive images
- Gebruik maken van webp en avif format
- Lazy loading toepassen op bepaalde images
- Een width en height toepassen op images
- View transition toepassen voor perceveid performance
- Client side scripting voor perceveid performance

### Responsive images
Elke image zit nu in een `<picture>` tag. In de picture tag heb ik een aantal source's met verschillende width's aangemaakt. Nu gaat de browser zelf uitzoeken welke source het beste past bij de omstandigheden. Het kijkt of de browser avif of webp ondersteunt en het kijkt naar de media query(schermgrootte). Vervolgens kiest het dan een uit dat geschikt is. Zijn er geen van de source's geschikt dat pakt het de fallback en dat is de `<img>`.

De images die uit de Directus API worden opgehaald zijn alle veel te groot. Als je ze zo groot inlaadt zonder dat je dat nodig hebt gaat je performance achteruit. Door bovenstaande kiest het zelf welke source gunstig is.

<sub>Voorbeeld source in eventspagina</sub>
https://github.com/Ravirkt/user-experience-enhanced-website/blob/16d79237d87cf04af28369aa1ee4466a94c9da38/views/events.liquid#L30C1-L31C1


## Kenmerken
Voor dit project heb ik gebruik gemaakt van veel moderne webtechnieken, waaronder:

### Gebruikte technologieën
- **HTML & CSS**  
  De basisstructuur en styling van de website zijn opgebouwd met HTML en CSS. De huisstijl van de website is in een aparte styleguide verwerkt.

- **Server-side JavaScript**  
  Voor de back-end is gebruik gemaakt van Node.js en Express om een dynamische en efficiënte webserver te creëren. Nodejs zorgt ervoor dat ik Javascript serverside kan gebruiken en Express maakt mogelijk om routes te maken en responses en requests te verwerken.

- **Liquid Templates**  
  De weergave van de pagina’s gebeurt met behulp van Liquid Templates, waardoor dynamische data eenvoudig kan worden ingeladen en eventueel gemanipuleerd met liquid functies.  

- **Directus APi**
  De data die wordt opgehaald kom uit de Directus Api. Doormiddel van API endpoint url's kunnen vervolgens specifieke data worden opgevraagt.

- **Nodemon**  
  Voor efficienty is er gebruik gemaakt van Nodemon tijdens de development. Dit zorgt ervoor dat de server automatisch herstart bij wijzigingen in de code.

## Installatie
Project lokaal installeren

1. **Fork de repository**  
   Ga naar de [repository pagina](https://github.com/Ravirkt/user-experience-enhanced-website) en klik op de **Fork** knop in de rechterbovenhoek om een kopie van de repository naar je eigen GitHub account te maken.

2. **Clone de repository**  
   Clone je geforkte repository naar je lokale computer door het volgende commando uit te voeren in de terminal: git clone https://github.com/Ravirkt/user-experience-enhanced-website

3. **Installeer de packages**  
   Voer in de terminal de command **npm install** uit om de packages uit de package.JSON te installeren.

4. **Start de server**  
   Voer in de terminal de command **npm start** uit om de server te starten.





## Bronnen

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).



| hero-section                                             | Filter                                             |
| -------------------------------------------------------- | -------------------------------------------------- |
| <img src="./public/assets/hero-section.gif" width="200"> | <img src="./public/assets/filter.png" width="200"> |