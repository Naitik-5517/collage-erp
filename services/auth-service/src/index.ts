import { app } from './app';

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log('auth-service running on port ' + PORT);
});
