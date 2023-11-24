import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
    state: () => {
        return {
            started: false,
            team_a: null,
            team_b: null,
            session_time: 25,
            winning_points: 100,
            cards: [],
        }
    },
    getters: {
 
    },
    actions: {

        // They lose a random amount of points

        // They lose a random number of points every x seconds on next game

        // They lose a random number of seconds on next game

        // get a ransom amount of extra time

        async setTeamA(team) {
            this.team_a = { name: team, points: 0, extra_time: false, sabotage: false, switch_points: false  };
        },

        async setTeamB(team) {
            this.team_b = { name: team, points: 0, extra_time: false, sabotage: false, switch_points: false  };
        },

        async setSessionTime(time) {
            this.session_time = time;
        },

        async setWinningPoints(points) {
            this.winning_points = points;
        },

        getOtherTeam(team) {
            if(team.name === this.team_a.name){
                return this.team_b;
            }
            return this.team_a;
        },

        getRandomCards(){
            let cards = [];
            let card;
            for(let i = 0; i < 5; i++){
                card = this.cards[Math.floor(Math.random() * this.cards.length)];
                cards.push({ card: card, used: false });
            }
            return cards;
        },

        addPoints(team) {
            team.points += 5;
        },

        subPoints(team) {
            team.points -= 5;
        },

        setCards(){
            this.cards = [
                "Makgadikgadi Epic",
                "Gabz July",
                "Stanbic Piaza",
                "Okavango Delta",
                "Chobe National Park",
                "Kgalagadi",
                "Moremi Game Reserve",
                "Pula",
                "Basarwa",
                "Divine Morula",
                "Thapong Visual Arts Centre",
                "Kgale Hill",
                "Sir Seretse Khama International Airport",
                "Chapungu Sculpture Park",
                "Kgalagadi Transfrontier Park",
                "National Museum and Art Gallery",
                "Main Mall",
                "Mokolodi Nature Reserve",
                "Botswana Meat Commission",
                "Cresta Lodge",
                "Francistown",
                "Tswana culture",
                "Mokgweetsi Masisi",
                "Kwando River",
                "Nata Bird Sanctuary",
                "Boipuso Square",
                "Dikgatlhong Dam",
                "Tsodilo Hills",
                "Kopong",
                "Majestic Five Hotel",
                "Tsholofelo Park",
                "Masa Square Hotel",
                "Orapa Diamond Mine",
                "Selinda Reserve",
                "Botswana Railways",
                "Kgalagadi Breweries Limited",
                "Kasane",
                "Elephant Sands",
                "Khama Rhino Sanctuary",
                "Serowe",
                "Jwaneng Diamond Mine",
                "Linyanti Wildlife Reserve",
                "Maitisong Festival",
                "Khwai River",
                "Gumare",
                "Okavango Horse Safaris",
                "Kuminda Farm",
                "Phikwe National Monument",
                "Ghanzi",
                "Central Kalahari Game Reserve",
                "Khwai Community Trust",
                "Matsieng Footprints",
                "Tuli Block",
                "Letlhakane",
                "The Fields Mall",
                "Chobe River",
                "Khutse Game Reserve",
                "Savute Channel",
                "Kubu Island",
                "Lobatse",
                "Gweta",
                "Gantsi",
                "Nata",
                "Mmadinare",
                "Mowana Safari Lodge",

                //Stadia
                "Gaborone National Stadium",
                "Obed Itani Chilume Stadium",

                //Notable People
                "Sir Seretse Khama",
                "William Last KRM",
                "Ruth Williams Khama",
                "Festus Mogae",
                "Ian Khama",
                "Mokgweetsi Masisi",
                "Oscar Ntebe",
                "Samoxa",
                "Slumber Tsogwane",
                "Bogolo Kenewendo",
                "Tshekedi Khama",
                "Sir Ketumile Quett Joni Masire",
                "Unity Dow",
                "Amantle Montsho",
                "Letsile Tebogo",
                "Nijel Amos",
                "Isaac Makwala",
                "Julia Molefhe",
                "Mpho Sebina",
                "Tshepo Maphanyane",
                "Mma Ramotswe",
                "Kaone Kario",
                "Samantha Mogwe",
                "Motswana",
                "Hey Nyena",
                "Maatla Ephraim Basha",
                "Odirile Vee Sento",
                "Ozi F Teddy",
                "Kast",
                "Sasa Klaas",
                "Scar",
                "Vee Mampeezy",
                "Mompati Merafhe",

                //radio stations
                "Duma FM",
                "Gabz FM",
                "Yarona FM",
                "RB2",

                //setswana cuisine
                "Seswaa",
                "Serobe",
                "Phane",
                "Morogo",
                "Bogobe",
                "Mogodu",
                "Dikgobe",
                "Morama",
                "Mophane",
                "Stampa",
                "Mabele",
                "Mokoto",
                "Mokwetjepe",
                "Mogwapa",
                "Morojwa",
                "Mogorogorwane",
                "Moretlwa",
                "Topi",
                "Mosutlhane",
                "Mosukujane",
                "Mokgalo",

                // Botswana Languages
                "Setswana",
                "English",
                "Kalanga",
                "Shekgalagari",

                // Botswana Cities
                "Gaborone",
                "Francistown",
                "Molepolole",
                "Maun",
                "Serowe",
                "Selibe Phikwe",
                "Kanye",
                "Mahalapye",
                "Mogoditshane",
                "Mochudi",
                "Lobatse",
                "Palapye",
                "Ramotswa",
                "Thamaga",
                "Letlhakane",
                "Tonota",
                "Jwaneng",
                "Gabane",
                "Orapa",
                "Shakawe",
                "Ghanzi",
                "Mopipi",
                "Tsabong",
                "Kasane",
                "Mmathethe",
                "Mmadinare",
                "Kopong",
                "Tlokweng",
                "Tutume",
                "Moshupa",
                "Mmopane",
                "Mogobane",

                // Botswana Rivers
                "Okavango",
                "Chobe",
                "Limpopo",
                "Shashe",
                "Molopo",
                "Notwane",
                "Thamalakane",
                "Nata",

                // Botswana Hills and Caves
                "Lentswe la Baratani",
                "Kgale Hill",
                "Legaga la ga Kobokwe",
                "Gcwihaba Caves",

                

              ];
        },

  

    }
})