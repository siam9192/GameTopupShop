import cron from 'node-cron';
import offerService from '../modules/offer/offer.service';
async function runJobTask() {
  cron.schedule('* * * * *', async () => {
    await offerService.updateExpiredDeadlineOffers();
  });
}

export default runJobTask;
