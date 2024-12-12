/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.get('/weather-now', 'WeatherNowController.index');
  Route.get('/quotations-today', 'QuotationsTodayController.index');
  Route.get('/fuel-price', 'FuelPriceController.index');
  Route.get('/government-indicators', 'GovernmentIndicatorsController.index');
  Route.get('/top-songs', 'TopSongsController.index');
  Route.get('/my-soccer-team', 'MySoccerTeamController.index');
  Route.get('/last-news', 'LastNewsController.index');
  Route.get('/science-tech', 'ScienceTechController.index');
  Route.get('/holidays', 'HolidaysController.index');
  Route.post('/mail/send', 'MailController.send');
  Route.get('/top-series', 'TopSeriesController.index');
}).prefix('/api');
