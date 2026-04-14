import app from './app';

const parsed = parseInt(process.env.PORT ?? '', 10);
const port = Number.isFinite(parsed) ? parsed : 3000;

app.listen(port, () => {
  console.log(`url-pulse listening on port ${port}`);
});
