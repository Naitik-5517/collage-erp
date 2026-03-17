import { app } from './app';

const PORT = process.env.PORT || 4005;

app.listen(PORT, () => {
  console.log('messaging-service running on port ' + PORT);
});
