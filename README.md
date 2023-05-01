I followed the youtuber Sonny Sanghas version of this project and wanted to try build it myself.

The main things I learnt during this project:
  Using styled components instead of Tailwind CSS that I nomally use.
  Using materiaal UI components for things like user Avatar components.
  More complex use of firestore than Ive cam across pervious. Using different collections to store 1) the users information 2) the messagaging between user and   recipient.
  Using Google sign-in
  How to query information from firestore database using the firebase docs aswell as React-Firebase-Hooks
  Attempted to implement SSR and although didnt quite show on the build I now have better understanding as to when implenetinv it would be beneficial to the     user.
  
 What went well:
  Really liked using styled components instead of tailwind CSS, feel like it keeps my code alot cleaner to read bsck over and keeps CSS syntax fresh in my       head.
  The 1-2-1 messaging works, Starting new chats and sending messaging bwteen users does work (see 'Improvements for further note)
  Google Sign in also works and the UI for the login and loading looks very clean (although simple)
  
  
 Improvements:
  When ran locally the SSR is very smooth and renders messages before having clicked on the chat, however in deployment it is quite slow and sugglish and can     also require a refresh for the message just entered to appear on the screen.
  I also struggle to style the icons to how I want them. The 'search' and chat 'Icon' are filled in despite using the outline version from HeroIcons.
  
