import { app } from './app';

const PORT = process.env.PORT || 4006;

app.listen(PORT, () => {
  console.log('finance-service running on port ' + PORT);
});
