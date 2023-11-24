<template>
    <div class="bg-img vh-100 ">
        <VitePwaManifest />
        <div v-if="winner" class="vh-100 bg-dark w-100 d-flex align-items-center justify-content-center" style="position:fixed;z-index:999">
            <div class="text-center">
                <img class="d-block mx-auto" width="320" src="/img/trophy.png" alt="">
                    <h2 class="fw-bold text-white text-center fs-1 text-uppercase mb-0">Winners</h2>
                    <p class="badge bg-info fw-bold text-white text-center fs-5 text-uppercase mb-0">{{current_team.name}}</p>
                    <p class="fw-bold text-success fs-5 mt-0 text-uppercase mb-0">{{current_team.points}}</p>
                <div class="text-center mt-2">
                    <a style="background:rgba(6, 202, 202, 0.616) !important" href="/" class="btn fw-bold btn-primary w-75 border-0">Play Again</a>
                </div>
            </div>
        </div>

        <div v-if="!started" class="vh-100 bg-dark w-100 d-flex align-items-center justify-content-center" style="position:fixed;z-index:999">
            <div class="text-center">
                <div class="px-4 py-3 mb-4" style="background:rgba(0, 0, 0, 0.726);border-radius:10px">
                    <p class="fw-bold text-white text-center fs-5 text-uppercase mb-0">Next Team</p>
                    <p class="fw-bold text-white text-center fs-1 text-uppercase mb-0">{{current_team.name}}</p>
                    <p class="fw-bold text-success fs-5 mt-0 text-uppercase mb-0">{{current_team.points}}</p>
                </div>
                <p v-for="card in cards" :key="card.card" class="fw-bold py-2 px-3 option" :class="card.used ? 'correct' : 'wrong'">{{ card.card }}</p>
                <div class="text-center mt-2">
                    <button style="background:rgba(6, 202, 202, 0.616) !important" @click="begin()" class="btn fw-bold btn-primary w-75 border-0">Ready</button>
                </div>
            </div>
        </div>
        
        <br>

        <div v-if="started" class="card border-0 bg-dark">
            <div class="card-body d-flex justify-content-between">
                <div class="fw-bold text-light">
                    {{ game.team_a.name }} : {{ game.team_a.points }}
                </div>
                <div>
                    VS
                </div>
                <div class="fw-bold text-light">
                    {{ game.team_b.name }} : {{ game.team_b.points }}
                </div>
            </div>
        </div>

        <br>

        <div>
            <div class="timer animatable text-center">
                <svg>
                    <circle cx="50%" cy="50%" r="90"/>
                    <circle cx="50%" cy="50%" r="90" pathLength="1" />
                    <text x="100" y="105" text-anchor="middle"><tspan >{{ timeLeft }}</tspan></text>
                    <text style="color:white" x="100" y="135" text-anchor="middle">seconds</text>
                </svg>
            </div>
        </div>

        <br>

        <div class="card border-0 bg-dark">
            <div class="card-body">
                
                <p @click="click_card(card)" v-for="card in cards" :key="card.card" class="fw-bold py-2 px-3 option" :class="card.used ? 'pass' : ''">{{ card.card }}</p>

                <div class="text-center">
                    <q-btn class="mx-1" :disabled="current_team.extra_time" @click="add_random_seconds()" push color="secondary" >
                        <q-popup-proxy>
                            <q-banner>
                            <template v-slot:avatar>
                                <q-icon name="alarm_add" color="ember" />
                            </template>
                             <span class="fw-bold">{{ Math.floor(session_time / 4) + 1 }} Seconds Added</span>
                            </q-banner>
                        </q-popup-proxy>
                        <q-icon name="more_time"></q-icon>
                    </q-btn> 

                    <q-btn class="mx-1" :disabled="current_team.switch_points" @click="switch_points()" push color="accent" >
                        <q-popup-proxy>
                            <q-banner>
                            <template v-slot:avatar>
                                <q-icon name="change_circle" color="ember" />
                            </template>
                                <span class="fw-bold">You Switched Points With The Other Team</span>
                            </q-banner>
                        </q-popup-proxy>
                        <q-icon name="change_circle"></q-icon>
                    </q-btn>

                    <q-btn class="mx-1" push color="negative" >
                        <q-popup-proxy>
                            <q-banner>
                            <template v-slot:avatar>
                                <q-icon name="theater_comedy" color="ember" />
                            </template>
                                <span class="fw-bold">Sneaky. Sabotage Applied</span>
                            </q-banner>
                        </q-popup-proxy>
                        <q-icon name="theater_comedy"></q-icon>
                    </q-btn>

                </div>
            </div>
        </div>
    </div>
  </template>

<script setup>
    import { useGameStore } from "@/stores/game";
    import { ref, onBeforeMount } from 'vue';
    import {Howl} from 'howler';

    const game = ref();
    const current_team = ref(null);
    const started = ref(false);

    const answered = new Howl({
        src: ['/sound/correct.mp3']
    });

    const five_seconds_left = new Howl({
        src: ['/sound/fiveseconds.mp3']
    });

    const timeup = new Howl({
        src: ['/sound/timeup.mp3']
    });

    const winner_sound = new Howl({
        src: ['/sound/winner.mp3']
    });

    const winner = ref(null);

    const begin = () => {
        session_time.value = game.value.session_time;
        timeLeft.value = session_time.value;
        cards.value = game.value.getRandomCards();
        game.value.started = true;
        started.value = true;
        runTimer(document.querySelector('.timer'));
    }

    const next_team = () => {
        started.value = false;
        if(current_team.value == game.value.team_a){
            current_team.value = game.value.team_b;
        }else{
            current_team.value = game.value.team_a;
        }
    }

    const session_time = ref(0);
    const timeLeft = ref(0);
    const cards = ref([]);

    function isTimeLeft() {
        return timeLeft.value >= 1;
    }

    function runTimer(timerElement) {
        const timerCircle = timerElement.querySelector('svg > circle + circle');
        timerElement.classList.add('animatable');
        timerCircle.style.strokeDashoffset = 1;
        
        let countdownTimer = setInterval(function(){
            if(isTimeLeft()){

                const timeRemaining = timeLeft.value--;
                const normalizedTime = (session_time.value - timeRemaining+1) / session_time.value;
                timerCircle.style.strokeDashoffset = normalizedTime;

                if(timeRemaining == 5){
                    five_seconds_left.play();
                }

            } else {
                five_seconds_left.stop();
                clearInterval(countdownTimer);
                timerElement.classList.remove('animatable');
                if(winner.value){
                    winner_sound.play();
                    return
                    // show_winner();
                }else{
                    timeup.play();
                    next_team();
                }
            }  
        }, 1000);
    }

    onBeforeMount(async () => {
        game.value = useGameStore();
        game.value.setCards();
        current_team.value = game.value.team_a;
    });

    const add_random_seconds = () => {
        timeLeft.value += Math.floor(session_time.value / 10) + 1;
        current_team.value.extra_time = true;
    }

    const switch_points = () => {
        const temp = current_team.value.points;
        current_team.value.points = game.value.getOtherTeam(current_team.value).points;
        game.value.getOtherTeam(current_team.value).points = temp;
        current_team.value.switch_points = true;
    }

    const click_card = (card) => {
        card.used = !card.used;

        if(!cards.value.some(card => !card.used)){
            timeLeft.value = 0;
        }

        if(card.used){
            answered.play();
            game.value.addPoints(current_team.value);
            if(current_team.value.points >= game.value.winning_points){
                winner.value = current_team.value;
                timeLeft.value = 0;
            }
        }else{
            game.value.subPoints(current_team.value);
        }
    }


</script>

<style scoped>

.timer {
    margin-top: 0px;
}
  
.timer > svg {
    width: 200px;
    height: 200px;
}

.timer > svg > circle {
    fill: none;
    stroke-opacity: 0.3;
    stroke: #0dfde9;
    stroke-width: 10;
    transform-origin: center center;
    transform: rotate(-90deg);
}

.timer > svg > circle + circle {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    stroke-linecap: round;
    stroke-opacity: 1;
}

.timer.animatable > svg > circle + circle {
    transition: stroke-dashoffset 0.3s ease;
}

.timer > svg > text {
    font-size: 3rem;
    font-weight: bold;
    fill: #ffffff;
}

.timer > svg > text + text {
    font-size: 1rem;
}

.option{
    color:#e7e7e7;
    background:rgba(73, 73, 73, 0.733) !important;
    border-radius:10px
}

.pass{
    text-decoration: line-through;
    color:#0dfde9 !important;
    background:#0dfde94f !important;
}
.correct{
    color:#0dfde9 !important;
    background:#0dfde94f !important;
}
.wrong{
    color:#fd0d0d !important;
    background:#fd0d0d1e !important;
}

.bg-img{
    background-image: url('/img/bg.jpg');
    background-size: cover;
    background-position: center;
}
</style>