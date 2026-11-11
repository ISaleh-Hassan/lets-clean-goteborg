# Let's Clean Göteborg

En svenskspråkig webbplats för städning och flytthjälp, byggd med Next.js.
Priserna för flyttstädning och tillval finns samlade i `lib/flytt.ts`; specifikationen finns i `spec/spec.md`.

## Kom igång

Kör `npm install` och sedan `npm run dev`. Webbplatsen finns på http://localhost:3000.
För en produktionsbyggnad, kör `npm run build` och därefter `npm start`.

## Offertförfrågningar

Formulären skickar via serverns `/api/offert` och [Resend](https://resend.com/). För att aktivera utskicken:

1. Skapa ett Resend-konto och verifiera avsändardomänen enligt Resends instruktioner.
2. Sätt följande servermiljövariabler i `.env.local` lokalt och i driftmiljön vid publicering:

   ```text
   RESEND_API_KEY=<Resend API-nyckel>
   QUOTE_EMAIL_FROM=Let's Clean Göteborg <offert@din-verifierade-domän.se>
   QUOTE_EMAIL_TO=info@letscleangoteborg.se
   ```

3. Starta om servern och gör ett riktigt testutskick. Kontrollera även att svaret går till besökarens e-postadress.

Avsändaradressen måste tillhöra en verifierad domän; mottagaradressen måste kunna ta emot post. Nyckeln ska aldrig delas i chatt, checkas in i Git eller exponeras i webbläsaren. Utan konfiguration visar formuläret ett fel och kontaktuppgifter i stället för att påstå att förfrågan har skickats.

Innan publicering behöver företaget granska Resends personuppgiftshantering, eventuella överföringar utanför EU/EES, personuppgiftsbiträdesavtal och integritetspolicyn. Servern validerar indata och begränsar förfrågans storlek, men har ännu inget distribuerat hastighets- eller botskydd; konfigurera sådant i driftmiljön innan formuläret öppnas offentligt. Skicka inte personnummer via formuläret.

Om personnummer behövs för RUT kontaktar företaget kunden separat efter offerten. Företaget behöver själv välja och granska ett säkert sätt att ta emot uppgiften; någon sådan insamling är inte implementerad på webbplatsen.

Kontroll av RUT-rätt eller kreditupplysning är inte implementerad. En eventuell framtida integration behöver utredas och integritetsgranskas; en kreditupplysning visar inte i sig om någon har rätt till RUT-avdrag. Villkor och integritetspolicy behöver granskas av företaget före publicering.
