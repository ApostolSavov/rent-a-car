# <strong>rent-a-car</strong>

Car renting and offering app made for a SoftUni Angular course.

## Fully deployed and built using the MEAN stack

## [open the app](https://rent-a-car-770jm5bv7-apostolsavov.vercel.app/)

# <strong>functionality</strong>

!important - only 1 car can be rented at a time by a user, as practicality that user must be the intended driver, as well as to avoid possible abuse of the app.

## Common parts (guest and user):

- lands on home page with short intro and geolocation info to engage the visitor, with calls to action.

- general cars section, where only currently available cars are listed.

- car details vary, based on role - guests can only see the general info, while users can rent or manage the car offer if they own it.

- register and login pages for authentication

## User parts:

- car offer adding page, where the user can select from a large list of brands and models, and fill in the rest of the info

- car offer editing page, accessible through the car details page, where the user can change an offer they have created.

- profile page, where the user can see their personal details: name, email, rented (if any) car, offered (if any) car/s.

# other project info

- I have created both the front-end and the back-end, respectively using Angular and Node.js with Express

- The FE is deployed with Vercel, while the BE is deployed with Heroku

- For a database I have used Mongo, and particularly the cloud platform Mongo Atlas, to have everything remotely deployed
