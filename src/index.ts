import app from './app';
import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3111;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});