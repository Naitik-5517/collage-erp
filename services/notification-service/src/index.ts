import { app } from './app';

const PORT = process.env.PORT || 4008;

app.listen(PORT, () => {
  console.log('notification-service running on port ' + PORT);
});
