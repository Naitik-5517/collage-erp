import { app } from './app';

const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {
  console.log('academic-service running on port ' + PORT);
});
