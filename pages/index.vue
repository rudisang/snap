<template>
    <div class="bg-img vh-100 d-flex justify-content-end">
        <VitePwaManifest />
        <img class="d-block mx-auto" width="320" src="/img/oldman.png" alt="">
        <div class="card border-0 bg-dark">
            <div class="card-body">
                <h5 class="fw-bold text-center text-light mb-4">Game Setup</h5>
                <input autofocus required v-model="setup.team_a" type="text" class="form-control border-0 mb-3 fw-bold" style="color:rgb(0, 0, 0);background:rgba(198, 198, 198, 0.733) !important" placeholder="Team 1 Name">
                <input required v-model="setup.team_b" type="text" class="form-control border-0 mb-3 fw-bold" style="color:rgb(0, 0, 0);background:rgba(198, 198, 198, 0.733) !important" placeholder="Team 2 Name">
                <input required v-model="setup.session_time" type="number" min=20 max=50 class="form-control border-0 mb-3 fw-bold" style="color:rgb(0, 0, 0);background:rgba(198, 198, 198, 0.733) !important" placeholder="Seconds Per Round">
                <input required v-model="setup.winning_points" type="number" min=60 max=300 class="form-control border-0 mb-3 fw-bold" style="color:rgb(0, 0, 0);background:rgba(198, 198, 198, 0.733) !important" placeholder="Winning Points">
                <div class="text-center">
                    <button :disabled="start" @click="initialize_game()" class="btn btn-primary fw-bold mb-2 border-0" style="background:rgba(6, 202, 202, 0.616) !important">
                        <q-spinner v-if="start" color="light" size="3em" />
                        <span v-else>START</span>
                    </button> <br>
                    <NuxtLink to="/guide" class="btn btn-outline-light fw-bold border-0" >How To Play</NuxtLink>
                </div>
            </div>
        </div>
    </div>
  </template>

<script setup>
    import { useGameStore } from "@/stores/game";
    import {reactive} from "vue";

    const start = ref(false);

    const router = useRouter();

    const game = useGameStore();

    const setup = reactive({
        team_a: "",
        team_b: "",
        session_time: "",
        winning_points: ""
    });

    const initialize_game = async () => {
        start.value = true;
        await game.setTeamA(setup.team_a);
        await game.setTeamB(setup.team_b);
        await game.setSessionTime(setup.session_time);
        await game.setWinningPoints(setup.winning_points);

        router.push("/play");
    }

</script>

<style scoped>

.bg-img{
    background-image: url('/img/bg.jpg');
    background-size: cover;
    background-position: center;
    flex-direction: column;
}

</style>