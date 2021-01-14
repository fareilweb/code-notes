import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PWAService {

  deferredPrompt;
  appInstalled;

  constructor(
    private window: Window,
    private alertController: AlertController
  ) { }

  init() {
    this.handleDomEvents();
  }

  handleDomEvents() {

    this.window.addEventListener('beforeinstallprompt', async (e) => {
      e.preventDefault(); // Prevent the mini-infobar from appearing on mobile
      console.log('beforeinstallprompt triggered', e);
      this.deferredPrompt = e;
      await this.aksInstall();
    });

    this.window.addEventListener('appinstalled', (e) => {
      console.log('appinstalled triggered', e);
      this.appInstalled = true;
    });

  }

  async aksInstall() {
    const promptAlert = await this.alertController.create({
      header: 'Installami!',
      message: 'Sapevi che puoi installare questa app in in modo semplice e veloce!',
      buttons: [{
        text: 'No grazie',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (e) => { }
      },
      {
        text: 'Fantastico!',
        handler: async () => {
          await this.promptInstall();
        }
      }]
    });
    await promptAlert.present();
  }

  async promptInstall() {
      this.deferredPrompt.prompt(); // Show the install prompt

      // Wait for the user to respond to the prompt
      this.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
      });

      return this.deferredPrompt.userChoice;
  }

}
