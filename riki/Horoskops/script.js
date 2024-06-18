document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');
    const monthOutput = document.getElementById('monthOutput');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const gender = document.getElementById('gender').value;
        const year = document.getElementById('year').value;
        const month = document.getElementById('month').value;
        const day = document.getElementById('day').value;
        const time = document.getElementById('time').value;

        if (isNaN(month) || month < 1 || month > 12) {
            alert('Ievadiet normālu mēnesi (1-12).');
            return;
        }

        let monthMessage;
        switch (parseInt(month)) {
            case 1:
                monthMessage = " Pūķa gadā būs laimīgi savā personīgajā dzīvē. Pēc astrologu domām, vientuļie zīmes pārstāvji varēs satikt savu otro pusīti, bet tie, kas to jau izdarījuši, savas attiecības tikai uzlabos. Bet, ja nu tomēr jūs ar mīļoto cilvēku izšķirsieties, tas nāks tikai par labu un pavērs jaunas iespējas dzīvē. Arī finanšu jautājumos visam vajadzētu būt labi. Taču tajā pašā laikā ir jāuzmanās no veselības problēmām – tās nekādā gadījumā nedrīkst ignorēt!";
                break;
            case 2:
                monthMessage = "Pēc astrologu domām, nākamajā gadā  nav gaidāmas nopietnas kataklizmas un satricinājumi. Viss būs paša Vēža rokās: ir svarīgi neatkāpties, kad jūsu priekšā pavērsies jaunas iespējas, nenobīties no tām! Gada pirmajā pusē astrologi iesaka būt uzmanīgiem ar naudu: centies to taupīt un neveikt nepārdomātus, dārgus tēriņus. Savukārt tuvāk gada otrajai pusei jūsu ienākumi ievērojami pieaugs. Brīvajiem Vēžiem vasaras izskaņā iespēja satikt savu liktenīgo cilvēku. Tiem, kuru sirdis jau ir aizņemtas, atcerēties, kā iemīlējāties savā partnerī.";
                break;
            case 3:
                monthMessage = " , iesoļojot Pūķa gadā, var būt pavisam mierīgas – sola astrologi. Nākamajos 12 mēnešos zvaigznes nesola nekādus trakus satricinājumus.Tomēr pārsteigumi būs, un tie būs patīkami. Tuvāk vasaras izskaņai, Lauvas piedzīvos vēl savā dzīvē nebijušu romantiku. Visa gada garumā enerģijas netrūks nekam un varēs piedzīvot daudz sasniegumu, tajā skaitā – iespaidīgus panākumus karjerā vai biznesā. ";
                break;
            case 4:
                monthMessage = " Pūķa gadā jābūt piesardzīgām. No vienas puses, būs pietiekoši daudz iedvesmas, lai virzītos uz priekšu un sasniegtu savus mērķus. Taču jācenšas saglabāt optimismu arī grūtākos brīžos. Ja jūs koncentrēsieties tikai uz negatīvo, ieslīgsiet šajā situācijā aizvien dziļāk. Iespējams, tuvāk rudenim var rasties kāda situācija, kas prasīs nopietnus finansiālus ieguldījumus. Tāpēc labāk netērējiet naudu vieglprātīgi, lai jums būtu “drošības spilvens”.";
                break;
            case 5:
                monthMessage = " Pūķis paredz sarežģītu gadu. Var rasties sarežģījumi attiecībās: astrologi saka, ka dažos gadījumos var nākties arī izšķirties. Iespējamas arī veselības problēmas, īpaši, ja pievērsiet acis uz saviem sliktajiem ieradumiem. Tomēr astrologi sola arī labas lietas – pastāv arī iespēja, ka izdosies ievērojami uzlabot savu finansiālo";
                break;
            case 6:
                monthMessage = "Arī  Pūķa gadā neklāsies īpaši viegli. Šīs zīmes pārstāvjiem radīsies ievērojamas finansiālas grūtības. Lai tās nepasliktinātu, jums būs jābūt pēc iespējas uzmanīgākiem ar naudas darījumiem. Ja jau sen esat vēlējies uzsākt uzņēmējdarbību, gada pirmajā pusē par to labāk nedomāt un darīt to gada otrajā pusē. Tad uzsmaidīs veiksme un zvaigznes dos jums zaļo signālu. Gada nogalē var pienākt nopietnas pārmaiņas privātajā dzīvē – labas vai sliktas, to rādīs gads kopumā.";
                break;
            case 7:
                monthMessage = " arī neklāsies viegli, taču viņi spēs izpildīt visus 2024. gada uzdevumus. Pilnīgi iespējams, ka viņu personīgajā dzīvē būs grūtības un pat dažādi skandāli. Jums vienkārši jāsavācas, jābūt pacietīgiem un jāizdzīvo šis periods ar cieņu. Naudas lietās gada sākumā Strēlniekus pavadīs veiksme. Svarīgi, lai biznesā jūs paļautos ne tikai uz sevi, bet arī uz saviem partneriem. Vissarežģītākais periods gaidāms pavasara sākumā.";
                break;
            case 8:
                monthMessage = "Taču  Pūķa gadā vispār nav par ko uztraukties. Astrologi uzskata, ka šajā gadā viņi necietīs nekādus zaudējumus. Jau gada sākumā šīs zīmes pārstāvjiem būs ievērojami papildinājies maciņš. Tajā pašā laikā ir svarīgi nebūt slinkajiem un turpināt savu attīstību. Astrologi arī iesaka nekādā gadījumā neaizmirst par atpūtu, lai gada vidū nesabojātu savu veselību.";
                break;
            case 9:
                monthMessage = " gaida mierīgs un stabils gads. Astrologi sola, ka viss būs kārtībā gan darbā, gan naudas jautājumos. Mazliet vairāk jāpadomā par savu veselību – jācenšas sevi palutināt. Pavasarī vēlams doties kādā sen kārotā ceļojumā. Vientuļajiem Ūdensvīriem tiks dotas visas iespējas sastapt savu mīlestību tieši šajā gadā.";
                break;
            case 10:
                monthMessage = " Zaļā pūķa gadā gaida daudz jaunu atklājumu. Šīs zīmes pārstāvjiem ir visas iespējas krasi mainīt savu dzīvi. Iespējams, ka gads jums dāvās ne tikai otro pusīti, bet arī ilgi gaidīto laulību vai pat mazuli. Arī ar finansēm viss būs kārtībā, ja vien laikus saskatīsiet jaunas iespējas un netupēsiet vietās, no kurām jau sen gribējāt doties prom. Nebaidieties riskēt!";
                break;
            case 11:
                monthMessage = " Pūķa gads būs ļoti intensīvs. Astrologi uzskata, ka notikumiem visbagātākais un emocijām spilgtākais būs tieši pavasaris. Šīs zīmes pārstāvjus gaida veiksme ne tikai biznesā, bet arī personīgajā dzīvē. Tie Auni, kas vēl aizvien ir vientuļi, beidzot varēs satikt savu otro pusīti. Bet tie, kuri jau ir attiecībās, varēs tās nostiprināt – iespējams, ka gaidāmas kāzas vai ģimenes pieaugums.";
                break;
            case 12:
                monthMessage = "Astrologi sola, ka 2024. gadā  beidzot varēs aizmirst par visām problēmām, kas jau sen bija viņu dzīvē. Eksperti uzskata, ka Pūķa gads sagādās daudz pozitīvas pārmaiņas. Vērsim būs pa spēkam mainīt savu dzīvi: varēs pakāpties pa karjeras kāpnēm un papildināt savu bankas kontu. Pastāv ļoti liela iespēja nopelnīt arī tiešām lielas naudas summas. Pavasara beigās vientuļie Vērši varēs satikt savu otro pusīti. Tie Vērši, kuru sirds jau ir aizņemta, iespējams, piedzīvos grūtus brīžus attiecībās ar mīļoto cilvēku, tomēr ir vērts par savām attiecībām pacīnīties un tik viegli nepadoties.";
                break;
            default:
                monthMessage = "Invalid month.";
        }

        monthOutput.innerHTML = `<strong>Jūsu horoskops:</strong> ${monthMessage}`;
    });
});