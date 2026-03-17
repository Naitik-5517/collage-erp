import { app } from './app';

const PORT = process.env.PORT || 4011;

app.listen(PORT, () => {
  console.log('library-service running on port ' + PORT);
});
