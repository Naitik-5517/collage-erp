import { app } from './app';

const PORT = process.env.PORT || 4010;

app.listen(PORT, () => {
  console.log('report-service running on port ' + PORT);
});
