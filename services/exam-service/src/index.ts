import { app } from './app';

const PORT = process.env.PORT || 4007;

app.listen(PORT, () => {
  console.log('exam-service running on port ' + PORT);
});
