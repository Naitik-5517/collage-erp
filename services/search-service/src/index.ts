import { app } from './app';

const PORT = process.env.PORT || 4009;

app.listen(PORT, () => {
  console.log('search-service running on port ' + PORT);
});
