# words – Learn Words

A React Native app for practicing vocabulary in a simple game-like way.

You can download word lists to study, or import your Google Translate favorites by saving them and converting to CSV. Translations can be from your own list, or you can use the optional ChatGPT feature to generate them.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```


3. Optional: You need an OpenAI API key to use the GPT version of the game.


This app is built using: 
* SQLite database
* OpenAI API
* Expo Router
* Expo DocumentPicker
* Expo FileSystem
* SF Symbols

This app is designed for iOS, so it might not work as expected on Android.

The app includes a "joke" in its styling: the normal game looks dull, but when ChatGPT is enabled, it appears more modern—even though the gaming experience is actually worse with the GPT version.

![alt text](assets/images/normal-game-view.png)
![alt text](assets/images/gpt-game-view.png)
